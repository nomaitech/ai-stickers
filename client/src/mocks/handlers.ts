import { http } from "msw";

import imageRawData from "../assets/stickerOutputMock.png";

const validateAuth = (request: Request): boolean => {
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  return token === "mock-token";
};

const unauthorizedResponse = () => {
  return new Response(JSON.stringify({ message: "Invalid credentials" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
};

export const handlers = [
  http.post("/auth/login", async ({ request }) => {
    type LoginBody = { email: string; password: string };
    const requestBody = (await request.json()) as LoginBody;
    const { email, password } = requestBody;
    if (email === "test@example.com" && password === "password") {
      return new Response(JSON.stringify({ access_token: "mock-token" }), {
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

  http.get("/stickers", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
    console.log("It does try to get em I dont know man");
    return new Response(
      JSON.stringify([
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            generated_img_url: "https://picsum.photos/150",
            emoji: "👍",
            createdAt: "2025-09-10T12:11:06.383Z",
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            generated_img_url: "https://picsum.photos/150",
            emoji: "🤪",
            createdAt: "2025-09-10T12:11:06.383Z",
          },
        ],
      ),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.post("/stickers", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
    const formData = await request.formData();
    const image = formData.get("file");
    const emoji = formData.get("emoji") || "👍🏼";
    const prompt = formData.get("prompt") || "potato";

    if (!prompt) {
      return new Response(JSON.stringify({ message: "Missing prompt" }), {
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

    await new Promise((r) => setTimeout(r, 2000));

    return new Response(
      JSON.stringify({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        generated_img_url: imageRawData,
        emoji,
        prompt,
        createdAt: "2025-09-10T12:11:06.383Z",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.patch("/stickers/:stickerId", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();

    const body = (await request.json()) as { emoji: string };
    return new Response(
      JSON.stringify({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        image: "https://via.placeholder.com/150",
        emoji: body.emoji,
        prompt: "thisThePrompt",
        createdAt: "2025-09-10T12:11:06.383Z",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.delete("/stickers/:stickerId", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
    return new Response(null, { status: 204 });
  }),

  http.get("/user-info", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
    const creditAmount = Math.floor(Math.random() * 100);
    return new Response(
      JSON.stringify({ email: "user@example.com", credits: creditAmount }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.post("/topup", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();

    return new Response(null, {
      status: 302,
      headers: { Location: "https://www.topupUrl.com" },
    });
  }),

  http.get("/sticker-packs", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
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
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.post("/sticker-packs", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
    type stickerName = { name: string };
    const body = (await request.json()) as stickerName;
    return new Response(
      JSON.stringify({
        id: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: body?.name || "Untitled Pack",
        createdAt: new Date().toISOString(),
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.get("/sticker-packs/:packId", async ({ params, request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();

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
    if (!validateAuth(request)) return unauthorizedResponse();
    type stickerPackName = { name: string };
    const body = (await request.json()) as stickerPackName;
    return new Response(
      JSON.stringify({
        id: params.packId,
        name: body?.name || "Updated Sticker Pack",
        createdAt: "2025-09-10T12:20:06.383Z",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.delete("/sticker-packs/:packId", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
    return new Response(null, { status: 204 });
  }),

  http.get("/sticker-packs/:packId/stickers", async ({ params, request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
    if (!params.packId) return new Response(null, { status: 404 });
    return new Response(
      JSON.stringify([
        {
          id: "6fa85f64-5717-4562-b3fc-2c963f66afa6",
          generated_img_url: "https://picsum.photos/150",
          emoji: "🔥",
          createdAt: "2025-09-10T12:30:06.383Z",
        },
        {
          id: "7fa85f64-5717-4562-b3fc-2c963f66afa6",
          generated_img_url: "https://picsum.photos/150",
          emoji: "🎉",
          createdAt: "2025-09-10T12:31:06.383Z",
        },
      ]),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),

  http.post("/sticker-packs/:packId/stickers", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
    return new Response(null, { status: 202 });
  }),

  http.delete(
    "/sticker-packs/:packId/stickers/:stickerId",
    async ({ request }) => {
      if (!validateAuth(request)) return unauthorizedResponse();
      return new Response(null, { status: 204 });
    }
  ),

  http.post("/payments", async ({ request }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
    type stripeProductId = { price: string };
    const body = (await request.json()) as stripeProductId;
    if (body.price == "price_1RtrY9AttlqijaIVwcdBO5M5") {
      return new Response(
        JSON.stringify({
          checkout_url:
            "https://checkout.stripe.com/c/pay/cs_test_a1sMgOitlqmL0OvhPSvGN77nEWeibNgAhVlNFAke3ASNqZcZphTxpFKAyw#fidkdWxOYHwnPyd1blpxYHZxWjA0V3F3UjNEcXFpdGxvZExTfzduYGo3RkpkV0JNYFNRX2BiNFFGUGh9bmZKcHAwS3dGUWN2dzZkU2dGYEJrbFR9VHNKQkBOdFxhUVFDYDY9T1NhVWJnNlZnNTU1MjY0YTZXbCcpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyZjY2NjY2MnKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl",
        }),
        { status: 200 }
      );
    }
    return new Response(null, { status: 202 });
  }),
  http.get("/payment-status/:sessionId", async ({ request, params }) => {
    if (!validateAuth(request)) return unauthorizedResponse();
    if (!params.sessionId) return new Response(null, { status: 404 });
    return new Response(
      JSON.stringify({
      session_id: "cs_test_a14pkmVa005GOq2dyvsxjH7xtS3Qa2b6FKzvA0iKDEpqldRJxhQA83sBfB",
      status: "completed",
      created_at: "2025-09-28T21:33:52.375329Z",
      completed_at: "2025-09-28T21:34:28.800049Z"
    }))
  }),
];
