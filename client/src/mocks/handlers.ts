import { http } from "msw";

import imageRawData from '../assets/stickerOutputMock.png'

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
  const image = formData.get("file");
  const token = formData.get("token");
  if (!token) {
    return new Response(JSON.stringify({ message: "Missing token" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  if (!image) {
    return new Response(JSON.stringify({ message: "Missing image" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  await new Promise((r) => setTimeout(r, 500));

  const buffer = await fetch(imageRawData).then(r => r.blob());

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
