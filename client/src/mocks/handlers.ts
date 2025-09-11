import { http } from "msw";

import imageRawData from "../assets/stickerOutputMock.png";

export const handlers = [
  http.post("/auth/login", async ({ request }) => {
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

  http.post("/auth/register", async () => {
    return new Response(JSON.stringify({ message: "User registered" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.get("/stickers", async () => {
    return new Response(
      JSON.stringify({
        stickers: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            image: "https://via.placeholder.com/150",
            emoji: "👍",
            createdAt: "2025-09-10T12:11:06.383Z",
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            image: "https://via.placeholder.com/150",
            emoji: "🤪",
            createdAt: "2025-09-10T12:11:06.383Z",
          },
        ],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }),

  http.post("/stickers", async ({ request }) => {
    const formData = await request.formData();
    console.log(formData);
    const image = formData.get("file");
    const token = formData.get("token");
    if (!token) {
      return new Response(JSON.stringify({ message: "Missing token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!image) {
      return new Response(JSON.stringify({ message: "Missing image" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await new Promise((r) => setTimeout(r, 3000));

    const buffer = await fetch(imageRawData).then((r) => r.blob());

    return new Response(buffer, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  }),

  http.patch("/stickers/:stickerId", async ({ request }) => {
    type requestBody = { emoji: string };
    const body = (await request.json()) as requestBody;
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

http.delete("/stickers/:stickerId", async ({ request: _ }) => {
  return new Response(null, { status: 204 });
}),

  http.get("/user-info", async () => {
    return new Response(
      JSON.stringify({
        email: "user@example.com",
        credits: 0,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.get("/topup", async ({ request }) => {
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (token === "mock-token") {
      return new Response(null, {
        status: 302,
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

  http.get("/sticker-packs", async () => {
    return new Response(JSON.stringify({
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sticker Pack 1",
      "createdAt": "2025-09-10T12:11:06.383Z",
    }), {
      status: 200, headers: { "Content-Type": "application/json" }})
  }),

  http.get("/sticker-packs", async () => {
    return new Response(
      JSON.stringify([
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "Sticker Pack 1",
          createdAt: "2025-09-10T12:11:06.383Z",
        },
        {
          id: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "Sticker Pack 2",
          createdAt: "2025-09-10T12:15:06.383Z",
        },
      ]),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }),

  http.post("/sticker-packs", async ({ request }) => {
    const body = await request.json();
    return new Response(
      JSON.stringify({
        id: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: body?.name || "Untitled Pack",
        createdAt: new Date().toISOString(),
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.get("/sticker-packs/:packId", async ({ params }) => {
    return new Response(
      JSON.stringify({
        id: params.packId,
        name: "Fetched Sticker Pack",
        createdAt: "2025-09-10T12:20:06.383Z",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.patch("/sticker-packs/:packId", async ({ params, request }) => {
    const body = await request.json();
    return new Response(
      JSON.stringify({
        id: params.packId,
        name: body.name || "Updated Sticker Pack",
        createdAt: "2025-09-10T12:20:06.383Z",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.delete("/sticker-packs/:packId", async () => {
    return new Response(null, { status: 204 });
  }),

  http.get("/sticker-packs/:packId/stickers", async ({ params }) => {
    return new Response(
      JSON.stringify([
        {
          id: "6fa85f64-5717-4562-b3fc-2c963f66afa6",
          image: "https://via.placeholder.com/150",
          emoji: "🔥",
          createdAt: "2025-09-10T12:30:06.383Z",
        },
        {
          id: "7fa85f64-5717-4562-b3fc-2c963f66afa6",
          image: "https://via.placeholder.com/150",
          emoji: "🎉",
          createdAt: "2025-09-10T12:31:06.383Z",
        },
      ]),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.post("/sticker-packs/:packId/stickers", async ({ request }) => {
    const body = await request.json();
    return new Response(null, { status: 202 });
  }),

  http.delete("/sticker-packs/:packId/stickers/:stickerId", async () => {
    return new Response(null, { status: 204 });
  }),
];

  //Remove, it's now in user info
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
];
