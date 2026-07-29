"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Phone, Send, Instagram } from "lucide-react";
import { InputMask } from "primereact/inputmask";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";

const MapLibreMap = dynamic(() => import("./MapLibreMap"), {
  ssr: false,
  loading: () => <div className="w-full h-120 rounded-2xl bg-gray-100" />,
});

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const [phone, setPhone] = useState("");
  const token =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ||
    "8524344248:AAHpL6heBmlwVd0Kd8WvbdzSkOyh5_J3WmU";
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "8447516144";

  const openExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone.trim()) return;

    const message = `Yangi murojaat. Telefon raqam: ${phone}`;

    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });
      toast.success(t("contact.successToast"));
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setPhone("");
  };

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-4 py-24 flex max-md:flex-col max-md:gap-8"
    >
      <div className="bg-white p-10 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">{t("contact.title")}</h2>
        <p className="mb-4 text-gray-400 text-lg">{t("contact.subtitle")}</p>

        <form className="mb-6" onSubmit={handleSubmit}>
          <InputMask
            mask="+(998) 99 999 99 99"
            placeholder="+998"
            value={phone}
            onChange={(e) => setPhone(e.value ?? "")}
            className="block text-[18px] w-full border px-4 py-2 rounded-lg border-gray-300 focus:outline-none"
          />

          <button className="bg-black text-white rounded-md p-2 mt-4 w-full cursor-pointer">
            {t("contact.button")}
          </button>
        </form>

        <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
              <MapPin size={22} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {t("contact.address")}
              </p>
              <p className="text-gray-500">Allon 74</p>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-4 text-left group cursor-pointer"
            onClick={() => {
              window.location.href = "tel:+998957777075";
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
              <Phone size={22} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {t("contact.phone")}
              </p>
              <p className="text-gray-500 group-hover:text-gray-900 transition-colors">
                +998 95 777 70 75
              </p>
            </div>
          </button>

          <button
            type="button"
            className="flex items-center gap-4 text-left group cursor-pointer"
            onClick={() => openExternalLink("https://t.me/grand_window")}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
              <Send size={22} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Telegram</p>
              <p className="text-gray-500 group-hover:text-gray-900 transition-colors">
                @grand_window
              </p>
            </div>
          </button>

          <button
            type="button"
            className="flex items-center gap-4 text-left group cursor-pointer"
            onClick={() =>
              openExternalLink("https://www.instagram.com/grand.window")
            }
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
              <Instagram size={22} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Instagram</p>
              <p className="text-gray-500 group-hover:text-gray-900 transition-colors">
                @grand.window
              </p>
            </div>
          </button>
        </div>
      </div>
      <MapLibreMap />
    </section>
  );
};

export default Contact;
