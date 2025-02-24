"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function registerUser(email: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    });

    return { success: true, user };
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return { success: false, message: "Invalid credentials" };
    }

    cookies().set("auth", user.id.toString(), { httpOnly: true, sameSite: "strict", path: "/" });

    return { success: true, user };
}

export async function logoutUser() {
    cookies().delete("auth");
    return { success: true };
}
