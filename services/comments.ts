import Comment from "@/models/Comment";

export async function getCommentsByPost(postId: string) {
  return await Comment.find({ postId }).sort({ createdAt: -1 });
}

export async function createComment(userId: string, postId: string, content: string) {
  return await Comment.create({ userId, postId, content });
}