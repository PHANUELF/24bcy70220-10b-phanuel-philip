import { getSession } from "../../../lib/api-utils";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(JSON.stringify(session), { status: 200 });

  } catch (err: any) {
    console.error("TEST ERROR:", err);
    return new Response(err.message, { status: 500 });
  }
}