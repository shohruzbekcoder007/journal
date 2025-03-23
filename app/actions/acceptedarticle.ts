"use server";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import path from "path";

export enum Status {
    active = "active",
    inactive = "inactive",
    pending = "pending"
}

export type AcceptedArticle = {
    id: number;
    title: string;
    description: string;
    status: Status;
    fileId?: number;
    file?: File | null;
    createdAt: Date;
    updatedAt: Date;
    author: string;
    keyword: string;
    month: string;
    year: number;
    frequency: string;
    comments: string;
}

export const  createAcceptedArticle = async (formData: FormData) => {
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

    try{
        // const article = await prisma.articles.create({
        //     data: {
        //         title: formData.get("title") as string,
        //         description: formData.get("description") as string,
        //         status: status || Status.pending,
        //         fileId: savedFile.id,
        //         author: formData.get("author") as string,
        //         year: formData.get("year"),
        //         month: formData.get("month")
        //     }
        // });
        // return JSON.stringify({ success: true, data: article });
    }catch (error) {
        return JSON.stringify({ success: false, data: error });
    }
}

export async function getAcceptedArticles() {
    return prisma.acceptedArticle.findMany({
        include: {
            file: true,
        }
    });
}

export async function deleteAcceptedArticle(id: number) {
    return prisma.acceptedArticle.delete({
        where: { id }
    });
}