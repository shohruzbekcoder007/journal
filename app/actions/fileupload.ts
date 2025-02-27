"use server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import path from "path";

export async function uploadFile(formData: FormData) {
  "use server";
  
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  let randomUUId = randomUUID();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "public/uploads", randomUUId+"-"+file.name);

  await writeFile(filePath, buffer);

  // Adjust the schema to include a 'files' model if it doesn't exist
  const savedFile = await prisma.file.create({
    data: {
      name: file.name,
      path: `/uploads/${randomUUId+"-"+file.name}`,
    },
  });

  return savedFile;
}

export async function updateFile(id: number, formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  let randomUUId = randomUUID();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "public/uploads", randomUUId+"-"+file.name);

  await writeFile(filePath, buffer);

  // Adjust the schema to include a 'files' model if it doesn't exist
  const savedFile = await prisma.file.update({
    where: {
      id,
    },
    data: {
      name: file.name,
      path: `/uploads/${randomUUId+"-"+file.name}`,
    },
  });

  return savedFile;
}
