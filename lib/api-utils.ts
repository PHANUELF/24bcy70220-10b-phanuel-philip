import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { signToken, verifyToken } from "./jwt";

// ✅ CREATE COOKIE
export async function createAuthCookie(res: NextResponse, user: any) {
 const token = await signToken({
  id: user._id.toString(),   // ✅ FIX
  email: user.email,
});
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return res;
}

// ✅ GET SESSION
export async function getSession() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const session = await verifyToken(token);

    return session;
  } catch (err) {
    console.error("SESSION ERROR:", err);
    return null;
  }
}