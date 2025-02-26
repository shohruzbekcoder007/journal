"use server";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import path from "path";

export type Author = {
    id: number;
    fullName: string;
    email: string;
    institution: string;
    researchField: string;
    publicationsCount: number;
    orcidId?: string;
    status: string;
    biography?: string;
    photoId?: number;
};

enum Status {
    active = "active",
    inactive = "inactive",
    pending = "pending"
}

export async function createAuthor(formData: FormData) {

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

    const author = await prisma.author.create({
        data: {
            fullName: formData.get("fullName") as string,
            email: formData.get("email") as string,
            institution: formData.get("institution") as string,
            researchField: formData.get("researchField") as string,
            publicationsCount: parseInt(formData.get("publicationsCount") as string),
            orcidId: formData.get("orcidId") as string,
            status: status,
            biography: formData.get("biography") as string,
            photoId: savedFile.id
        }
    });
    return { success: true, author };
}

export async function getAuthor(id: Author["id"]) {
    return prisma.author.findUnique({ where: { id } });
}

export async function getAuthors() {
    return prisma.author.findMany({
        include: {
            photo: true,
        }
    });
}

export async function updateAuthor(id: Author["id"], data: Omit<Partial<Author>, "id">) {
    const status = data.status as Status;
    return prisma.author.update({ where: { id }, data: { ...data, status } });
}

export async function deleteAuthor(id: Author["id"]) {
    return prisma.author.delete({ where: { id } });
}

