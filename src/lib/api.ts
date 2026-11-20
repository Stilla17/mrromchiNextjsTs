import axios from "axios";

export const api = axios.create({ timeout: 15_000 });

const TELEGRAM_INIT_TIMEOUT_MS = 3_000;
const TELEGRAM_INIT_POLL_MS = 50;

function getInitDataFromUrl(): string {
  if (typeof window === "undefined") return "";

  return new URLSearchParams(window.location.hash.slice(1)).get("tgWebAppData") ?? "";
}

async function getTelegramInitData(): Promise<string> {
  if (typeof window === "undefined") return "";

  const initDataFromUrl = getInitDataFromUrl();
  const deadline = Date.now() + TELEGRAM_INIT_TIMEOUT_MS;

  while (Date.now() < deadline) {
    const initData = window.Telegram?.WebApp?.initData || initDataFromUrl;
    if (initData) {
      window.Telegram?.WebApp?.ready();
      return initData;
    }

    await new Promise((resolve) => setTimeout(resolve, TELEGRAM_INIT_POLL_MS));
  }

  return "";
}

api.interceptors.request.use(async (config) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!baseURL) {
    throw new Error(
      "Backend manzili sozlanmagan. Administratorga murojaat qiling.",
    );
  }

  const initData = await getTelegramInitData();

  if (!initData) {
    throw new Error("Bu sahifani Telegram bot orqali oching.");
  }

  config.baseURL = baseURL.replace(/\/$/, "");
  config.headers.set("Authorization", `tma ${initData}`);
  return config;
});

export function getApiError(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    if (error.response?.data?.message) return error.response.data.message;
    if (error.code === "ECONNABORTED")
      return "So'rov vaqti tugadi. Qayta urinib ko'ring.";
    if (!error.response)
      return "Server bilan bog'lanib bo'lmadi. Internet aloqasini tekshiring.";
    return "So'rovni bajarib bo'lmadi. Qayta urinib ko'ring.";
  }
  return error instanceof Error
    ? error.message
    : "Kutilmagan xatolik yuz berdi.";
}
