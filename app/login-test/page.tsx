"use client";

export default function LoginTest() {
  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "amir2@test.com",
        password: "123456",
      }),
    });

    const data = await res.json();
    console.log(data);
    alert("Login done!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Test</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}