"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt  from "jsonwebtoken";
require('dotenv').config()

const secretKey = process.env.SECRET_KEY; // Replace with a strong secret

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

    const payload = {
        userId: user?.id,
        username: user?.name,
        email: user?.email,
        role: 'admin'
      };

      if (!secretKey) {
        throw new Error('SECRET_KEY environment variable is not set');
      }
      
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
      
      console.log('Generated Token:', token);

    cookies().set("auth", token, { httpOnly: true, sameSite: "strict", path: "/" });

    return { success: true, user };
}

export async function logoutUser() {
    cookies().delete("auth");
    return { success: true };
}
