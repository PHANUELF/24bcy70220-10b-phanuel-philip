"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/test")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout");
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      {user ? (
        <>
          <p>Welcome: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <a href="/login">Login</a><br />
          <a href="/register">Register</a>
        </>
      )}
    </div>
  );
}