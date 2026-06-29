import { NextResponse } from "next/server";

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const { phone } = (await request.json()) as { phone?: string };

    if (!phone?.trim()) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }

    if (!telegramBotToken || !telegramChatId) {
      return NextResponse.json(
        { error: "Telegram credentials are not configured" },
        { status: 500 }
      );
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: `Yangi Murojaat\nTelefon raqam: ${phone}`,
        }),
      }
    );

    if (!telegramResponse.ok) {
      return NextResponse.json(
        { error: "Telegram request failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
