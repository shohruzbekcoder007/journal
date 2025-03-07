"use server";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import path from "path";

export type Article = {
    id: number;
    title: string;
    description: string;
    status: string;
    fileId?: number;
    author: string;
    journalId: number;
};

enum Status {
    active = "active",
    inactive = "inactive",
    pending = "pending"
}

export async function createArticle(formData: FormData) {
    
    const file = formData.get("file") as File;
    if (!file) {
        throw new Error("No file uploaded");
    }

    let randomUUId = randomUUID();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public/uploads", randomUUId + "-" + file.name);

    await writeFile(filePath, buffer);

    const savedFile = await prisma.file.create({
        data: {
            name: file.name,
            path: `/uploads/${randomUUId + "-" + file.name}`,
        },
    });
    if (!savedFile) {
        throw new Error("File not saved");
    }

    const status = formData.get("status") as Status;

    const article = await prisma.articles.create({
        data: {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            status: status || Status.pending,
            fileId: savedFile.id,
            author: formData.get("author") as string,
            journalId: Number(formData.get("journalId"))
        }
    });

    return article;
}

export async function getArticle(id: number) {
    const article = await prisma.articles.findUnique({
        where: { id },
        include: {
            file: true,
            journal: true,
        }
    });
    if (!article) {
        throw new Error("Article not found");
    }
    return article;
}

export async function getArticles() {
    return prisma.articles.findMany({
        include: {
            file: true,
            journal: true,
        }
    });
}

export async function updateArticle(id: number, formData: FormData, withFile = true) {
    if (withFile) {
        const file = formData.get("file") as File;

        if (!file) {
            throw new Error("No file uploaded");
        }

        let randomUUId = randomUUID();

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(process.cwd(), "public/uploads", randomUUId + "-" + file.name);

        await writeFile(filePath, buffer);

        // Adjust the schema to include a 'files' model if it doesn't exist
        const savedFile = await prisma.file.update({
            where: {
                id,
            },
            data: {
                name: file.name,
                path: `/uploads/${randomUUId + "-" + file.name}`,
            },
        });
        if (!savedFile) {
            throw new Error("File not saved");
        }

        const status = formData.get("status") as Status;

        const article = await prisma.articles.update({
            where: { id },
            data: {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                status: status || Status.pending,
                fileId: savedFile.id,
                author: formData.get("author") as string,
                journalId: Number(formData.get("journalId"))
            }
        });
        return { success: true, article };
    } else {
        const article = await prisma.articles.update({
            where: { id },
            data: {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                status: formData.get("status") as Status,
                author: formData.get("author") as string,
                journalId: Number(formData.get("journalId"))
            }
        });
        return { success: true, article };
    }
}

export async function deleteArticle(id: number) {
    return prisma.articles.delete({
        where: { id }
    });
}

export async function getArticlesFromJournalId(journalId: number) {
    return prisma.articles.findMany({
        where: { journalId },
        include: {
            file: true,
            journal: true,
        }
    });
}
