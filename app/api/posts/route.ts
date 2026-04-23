import { connectDB } from "../../../lib/db";
import Post from "../../../models/Post";

// 🔥 TEMP: no auth required (for submission stability)
const DEMO_USER_ID = "demo-user";

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find({ userId: DEMO_USER_ID }).sort({ _id: -1 });

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (err: any) {
    console.error(err);
    return new Response("Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { title, content } = await req.json();

    // basic validation
    if (!title || !content) {
      return new Response("Missing fields", { status: 400 });
    }

    const post = await Post.create({
      title,
      content,
      userId: DEMO_USER_ID,
    });

    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (err: any) {
    console.error(err);
    return new Response("Server Error", { status: 500 });
  }
}