import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      console.error("Error creating uploads directory:", error);
    }

    // Generate a unique filename
    const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = join(uploadsDir, uniqueFilename);
    
    // Convert the file to an ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Write the file to the filesystem
    await writeFile(filePath, buffer);
    
    // Save file information to the database
    const fileRecord = await prisma.file.create({
      data: {
        name: file.name,
        path: `/uploads/${uniqueFilename}`,
      },
    });

    return NextResponse.json({
      success: true,
      fileId: fileRecord.id,
      path: `/uploads/${uniqueFilename}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
