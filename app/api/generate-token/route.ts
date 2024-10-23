import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const API_KEY = process.env.DAILY_API_KEY; // Your Daily API Key
  const { roomName } = await request.json(); // Get room name from the request body

  if (!API_KEY || !roomName) {
    return NextResponse.json(
      { error: `Missing room name or API key: ${roomName}, ${API_KEY}` },
      { status: 400 }
    );
  }

  try {
    // Create the room
    const roomResponse = await fetch(`https://api.daily.co/v1/rooms`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: roomName,
        properties: {
          enable_chat: true,
          exp: Math.round(Date.now() / 1000) + 3600, // 1 hour expiry
        },
      }),
    });

    if (!roomResponse.ok) {
      const roomError = await roomResponse.json();
      throw new Error(
        `Failed to create room: ${roomResponse.statusText}. ${
          roomError.info || roomError.message
        }`
      );
    }

    const roomData = await roomResponse.json();

    // Generate token using the general meeting token API
    const tokenResponse = await fetch(
      `https://api.daily.co/v1/meeting-tokens`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            room_name: roomData.name, // Room name from the created room
            is_owner: true, // Mark as owner/admin
          },
        }),
      }
    );

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.json();
      throw new Error(
        `Failed to generate token: ${tokenResponse.statusText}. ${
          tokenError.info || tokenError.message
        }`
      );
    }

    const tokenData = await tokenResponse.json();
    return NextResponse.json({ token: tokenData.token, url: roomData.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
