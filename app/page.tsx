"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    if (res.ok) {
      setPosts(await res.json());
    }
  };

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        setUser(data);
        if (data) fetchPosts();
      });
  }, []);

  const createPost = async () => {
    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    fetchPosts();
  };

  const logout = async () => {
    await fetch("/api/logout");
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <a href="/login" className="text-blue-500">Login</a>
        <a href="/register" className="text-blue-500">Register</a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 mb-2 rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={createPost}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((p, i) => (
          <div key={i} className="border p-4 rounded shadow">
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-gray-600">{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}