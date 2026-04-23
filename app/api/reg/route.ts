import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import argon2 from "argon2";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 🔍 DEBUG: log raw body
    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const { name, email, password } = body;

    // 🔥 Better validation (fixes your issue)
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Missing fields", body }),
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return new Response("User already exists", { status: 400 });
    }

    const hashed = await argon2.hash(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const { password: _, ...safeUser } = user.toObject();

    return new Response(JSON.stringify(safeUser), { status: 200 });

  } catch (err: any) {
    console.error("ERROR:", err);
    return new Response(err.message, { status: 500 });
  }
}