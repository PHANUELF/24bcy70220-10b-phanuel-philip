import Post from "@/models/Post";
import User from "@/models/User";

export async function createPost(userId: string, title: string, description: string) {
  return await Post.create({ userId, title, description });
}

export async function getAllPosts(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const userIds = posts.map((p) => p.userId);

  const users = await User.find({ _id: { $in: userIds } }).lean();

  return posts.map((post) => {
    const user = users.find((u) => u._id.toString() === post.userId);
    return {
      ...post,
      authorName: user?.name || "Unknown",
    };
  });
}

export async function getMyPosts(userId: string) {
  return await Post.find({ userId }).sort({ createdAt: -1 });
}

export async function deletePost(postId: string, userId: string) {
  return await Post.findOneAndDelete({ _id: postId, userId });
}