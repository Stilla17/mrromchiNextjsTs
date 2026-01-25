'use client'
import { Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Header from './Header'
import { Trans, useTranslation } from 'react-i18next'

const HeroSection: React.FC = () => {
    const { t } = useTranslation()
    return (
        <header className="relative w-full overflow-hidden bg-white bgHeader">
            <Header />
            {/* Gradient fon */}
            <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
                <div className="max-w-2xl">

                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        {t('header.premium')}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                        {/* {t('header.title')} */}
                        <Trans
                            i18nKey="header.title"
                            components={{
                                highlight: (
                                    <span className='text-gray-400' />
                                ),
                                br: <br />
                            }}
                        />
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-125 text-sm leading-relaxed text-gray-400 sm:text-base">
                        {t("header.subtitle")}
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/catalog"
                            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                        >
                            {t("header.catalog")}
                        </Link>

                        <a
                            href="tel:+998909333898"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            <Phone size={16} />
                            {t("header.contact")}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeroSection