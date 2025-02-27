'use server';

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import path from "path";
import { writeFile } from "fs/promises";

export type Journal = {
    id: number;
    title: string;
    field: string;
    issn: string;
    frequency: string;
    description: string;
    publisher: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    year: number | null;
};

enum Status {
    active = "active",
    inactive = "inactive",
    pending = "pending"
}

export async function createJournal(formData: FormData): Promise<Journal> {

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

    return await prisma.journal.create({ data: {
        title: formData.get("title") as string,
        field: formData.get("field") as string,
        issn: formData.get("issn") as string,
        frequency: formData.get("frequency") as string,
        description: formData.get("description") as string,
        publisher: formData.get("publisher") as string,
        year: parseInt(formData.get("year") as string) || new Date().getFullYear(),
        status,
        file: { connect: { id: savedFile.id } },
    } });
}

export async function getJournal(id: number): Promise<Journal | null> {
    return await prisma.journal.findUnique({ where: { id } });
}

export async function updateJournal(id: number, data: Partial<Omit<Journal, "id" | "createdAt" | "updatedAt">>): Promise<Journal> {
    const status = data.status as Status;
    return await prisma.journal.update({ where: { id }, data: { ...data, status } });
}

export async function deleteJournal(id: number): Promise<Journal> {
    return await prisma.journal.delete({ where: { id } });
}

export async function listJournals(): Promise<Journal[]> {
    return await prisma.journal.findMany({
        include: {
            file: true,
        }
    });
}

