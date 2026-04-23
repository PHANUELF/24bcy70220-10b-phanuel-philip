import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import argon2 from "argon2";
import { NextResponse } from "next/server";
import { createAuthCookie } from "../../../lib/api-utils";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const { password: _, ...safeUser } = user.toObject();

    const res = NextResponse.json(safeUser);

    return await createAuthCookie(res, user);

  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}