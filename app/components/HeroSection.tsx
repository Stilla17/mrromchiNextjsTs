import { Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HeroSection: React.FC = () => {
    return (
        <section className="relative w-full overflow-hidden bg-black">
            {/* Gradient fon */}
            <div className="absolute inset-0 bg-linear-to-br from-black via-[#0b0b0b] to-black opacity-95" />

            <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
                <div className="max-w-2xl">

                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Premium Rom va Eshiklar
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                        Uyingiz uchun <br />
                        <span className="text-gray-400">Mukammal Sifat</span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
                        Mrrochi brendi sizga eng zamonaviy va sifatli PVX hamda
                        alyuminiy romlarini taqdim etadi. O&apos;z uyingizni
                        ishonchli qo&apos;llarga topshiring.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/catalog"
                            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                        >
                            Katalogini ko‘rish
                        </Link>

                        <a
                            href="tel:+998909333898"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            <Phone size={16} />
                            Bog‘lanish
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection