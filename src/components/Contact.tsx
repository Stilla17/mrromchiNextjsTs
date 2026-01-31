'use client'

import React from 'react'
import MapLibreMap from './MapLibreMap'
import { MapPin, Phone, Send, Instagram } from "lucide-react";
import { InputMask } from 'primereact/inputmask'

const Contact: React.FC = () => {
    return (
        <section className='max-w-7xl mx-auto px-4 py-24 flex max-md:flex-col max-md:gap-8'>
            <div className="bg-white p-10 rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bold mb-4">Bepul xisoblash</h2>
                <p className="mb-4 text-gray-400 text-lg">
                    Eshik va romlar uchun bepul hisob-kitob va dizayn xizmati!
                    Telefon raqamingizni qoldiring, biz siz bilan aloqaga chiqamiz.</p>

                <form className="mb-6">
                    {/* <input type="email"
                        placeholder="Pochtangizni kiriting"
                        className="block text-[18px] w-full border px-4 py-2 mb-4 rounded-lg border-gray-300 focus:outline-none" /> */}

                    <InputMask
                        mask="+(998) 99 999 99 99"
                        placeholder="+998"
                        className="block text-[18px] w-full border px-4 py-2 rounded-lg border-gray-300 focus:outline-none"
                    />

                    <button className="bg-black text-white rounded-md p-2 mt-4 w-full">Jo'natish</button>
                </form>

                <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:items-center">

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                            <MapPin size={22} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Manzil</p>
                            <p className="text-gray-500">Allon 74</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                            <Phone size={22} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Telefon</p>
                            <p className="text-gray-500">90 933 38 98</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                            <Send size={22} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Telegram</p>
                            <p className="text-gray-500">@azizov707</p>
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