import { http } from "msw";

import base64data from '../../public/mocks/base64Placeholder.txt?raw';

const base64ToArrayBuffer = (base64:string) => {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export const handlers = [
  http.post("/login", async ({ request }) => {
    type LoginBody = { email: string; password: string };
    const requestBody = (await request.json()) as LoginBody;
    const { email, password } = requestBody;
    if (email === "test@example.com" && password === "password") {
      return new Response(JSON.stringify({ token: "mock-token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.post("/register", async () => {
    return new Response(JSON.stringify({ message: "User registered" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.get("/credits", async ({ request }) => {
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    const creditNumber = Math.floor(Math.random() * 100);
    if (token === "mock-token") {
      return new Response(JSON.stringify({ credits: creditNumber }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }),

http.post("/generate-sticker", async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const prompt = formData.get("prompt");
  const image = formData.get("file");
  const token = formData.get("token");
  if (!token) {
    return new Response(JSON.stringify({ message: "Missing token" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  if (!prompt || !image) {
    return new Response(JSON.stringify({ message: "Missing prompt or image" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  await new Promise((r) => setTimeout(r, 500));

  const buffer = base64ToArrayBuffer(base64data);
  return new Response(buffer, {
    status: 200,
    headers: { "Content-Type": "image/png" },
  });
}),

  http.get("/topup", async ({ request }) => {
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (token === "mock-token") {
      return new Response(null, {
        status: 200,
        headers: {
          Location: "https://www.topupUrl.com",
        },
      });
    }

    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }),
];