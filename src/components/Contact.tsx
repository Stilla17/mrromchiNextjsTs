'use client'

import React, { useState } from 'react'
import MapLibreMap from './MapLibreMap'
import { MapPin, Phone, Send, Instagram } from "lucide-react";
import { InputMask } from 'primereact/inputmask'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact: React.FC = () => {
    const { t } = useTranslation()

    const [phone, setPhone] = useState("");

    const chat_id = "72523250"
    const token = "8363757953:AAGxVfFz_wrd5OJkZ4lBhms7Fm94N79umjE"
    const urlApi = `https://api.telegram.org/bot${token}/sendMessage`

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!phone.trim()) return;
        try {

            await axios.post(urlApi, {
                chat_id: chat_id,
                text: `Yangi Murojaat\nTelefon raqam: ${phone}`
            });
            toast.success(t('contact.successToast'));
            setPhone("");
        }
        catch (error) {
            console.error("Error sending message:", error);
        }
    }

    return (
        <section id='contact' className='max-w-7xl mx-auto px-4 py-24 flex max-md:flex-col max-md:gap-8'>
            <div className="bg-white p-10 rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bold mb-4">{t('contact.title')}</h2>
                <p className="mb-4 text-gray-400 text-lg">{t('contact.subtitle')}</p>

                <form className="mb-6" onSubmit={handleSubmit}>

                    <InputMask
                        mask="+(998) 99 999 99 99"
                        placeholder="+998"
                        value={phone}
                        onChange={(e) => setPhone(e.value ?? "")}
                        className="block text-[18px] w-full border px-4 py-2 rounded-lg border-gray-300 focus:outline-none"
                    />

                    <button className="bg-black text-white rounded-md p-2 mt-4 w-full">{t('contact.button')}</button>
                </form>

                <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:items-center">

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                            <MapPin size={22} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{t('contact.address')}</p>
                            <p className="text-gray-500">Allon 74</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                            <Phone size={22} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{t('contact.phone')}</p>
                            <p className="text-gray-500">90 933 38 98</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                            <Send size={22} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Telegram</p>
                            <p className="text-gray-500">@azizov706</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                            <Instagram size={22} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Instagram</p>
                            <p className="text-gray-500">@mr_romchi</p>
                        </div>
                    </div>

                </div>

            </div>
            <MapLibreMap />
        </section>
    )
}

export default Contact