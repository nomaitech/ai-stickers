import { http } from "msw";

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const requestBody = await request.json();
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

  http.post("/api/register", async () => {
    return new Response(JSON.stringify({ message: "User registered" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.get("/api/credits", async ({ request }) => {
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
  const prompt = formData.get("prompt");
  const image = formData.get("image");
  const token = formData.get("token");
  if (!token) {
    return new Response(JSON.stringify({ message: "Missing token" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  if (!prompt || !image) {
    return new Response(JSON.stringify({ message: "Missing prompt or image" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  await new Promise((r) => setTimeout(r, 500));

  return new Response(JSON.stringify({ url: "/mocks/mockSticker.png" }), { status: 200, headers: { "Content-Type": "application/json" } });
}),
];