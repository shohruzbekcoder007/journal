"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Define Submission type to match your Prisma schema
export type Submission = {
  id: number;
  title: string;
  authors: string;
  abstract: string;
  category: string;
  keywords: string;
  fileId?: number | null;
  comments?: string | null;
  status: "active" | "inactive" | "pending";
  createdAt: Date;
  updatedAt: Date;
};

// Input type for creating submissions
type SubmissionData = {
  title: string;
  authors: string;
  abstract: string;
  category: string;
  keywords: string;
  fileId?: number;
  comments?: string;
};

/**
 * Create a new submission
 */
export async function createSubmission(data: SubmissionData) {
  try {
    const submission = await prisma.submission.create({
      data: {
        title: data.title,
        authors: data.authors,
        abstract: data.abstract,
        category: data.category,
        keywords: data.keywords,
        fileId: data.fileId,
        comments: data.comments,
        status: "pending"
      },
    });

    revalidatePath("/journals");
    revalidatePath("/admin/submissions");
    return { success: true, submission };
  } catch (error) {
    console.error("Error creating submission:", error);
    return { success: false, error: "Failed to create submission" };
  }
}

/**
 * Get a submission by ID
 */
export async function getSubmission(id: number) {
  try {
    const submission = await (prisma as any).submission.findUnique({
      where: { id },
      include: {
        file: true,
      },
    });

    if (!submission) {
      return { success: false, error: "Submission not found" };
    }

    return { success: true, submission };
  } catch (error) {
    console.error("Error getting submission:", error);
    return { success: false, error: "Failed to get submission" };
  }
}

/**
 * Update a submission
 */
export async function updateSubmission(id: number, data: Partial<SubmissionData>) {
  try {
    const submission = await (prisma as any).submission.update({
      where: { id },
      data,
    });

    revalidatePath("/journals");
    revalidatePath("/admin/submissions");
    return { success: true, submission };
  } catch (error) {
    console.error("Error updating submission:", error);
    return { success: false, error: "Failed to update submission" };
  }
}

/**
 * Delete a submission
 */
export async function deleteSubmission(id: number) {
  try {
    await (prisma as any).submission.delete({
      where: { id },
    });

    revalidatePath("/journals");
    revalidatePath("/admin/submissions");
    return { success: true };
  } catch (error) {
    console.error("Error deleting submission:", error);
    return { success: false, error: "Failed to delete submission" };
  }
}

/**
 * List all submissions
 */
export async function listSubmissions(options?: {
  userId?: number;
  journalId?: number;
  status?: "active" | "inactive" | "pending";
}) {
  try {
    const where: any = {};
    
    if (options?.userId) {
      where.userId = options.userId;
    }
    
    if (options?.journalId) {
      where.journalId = options.journalId;
    }
    
    if (options?.status) {
      where.status = options.status;
    }

    const submissions = await (prisma as any).submission.findMany({
      where,
      include: {
        file: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, submissions };
  } catch (error) {
    console.error("Error listing submissions:", error);
    return { success: false, error: "Failed to list submissions" };
  }
}

/**
 * Update submission status
 */
export async function updateSubmissionStatus(
  id: number,
  status: "active" | "inactive" | "pending"
) {
  try {
    const submission = await (prisma as any).submission.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/journals");
    revalidatePath("/admin/submissions");
    return { success: true, submission };
  } catch (error) {
    console.error("Error updating submission status:", error);
    return { success: false, error: "Failed to update submission status" };
  }
}