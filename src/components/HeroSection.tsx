'use client'
import { Phone } from 'lucide-react'
import React from 'react'
import Header from './Header'
import { Trans, useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'
import { slides } from '@/data/products'

const HeroSection: React.FC = () => {
    const { t } = useTranslation()
    return (
        <header className="relative w-full overflow-hidden max-md:pb-12 h-screen">
            <div className="absolute inset-0 -z-10">
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={1}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop
                    className="h-full w-full"
                >
                    {slides.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="h-screen w-full bg-cover bg-center max-md:h-full max-md:bg-fixed"
                                style={{ backgroundImage: `url(${img})`, backgroundPosition: "0, bottom" }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="absolute inset-0 bg-black/60"></div>

            <div className='relative z-10'>

                <Header />
                <div className="mx-auto max-w-7xl px-4 py-27 max-md:mt-8">
                    <div className="max-w-2xl">

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white">
                            <div className="relative flex items-center justify-center">
                                <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                <span className="relative h-2 w-2 rounded-full bg-green-500"></span>
                            </div>
                            {t('header.premium')}
                        </div>

                        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
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

                        <p className="mt-6 max-w-125 text-sm leading-relaxed text-gray-200 sm:text-base max-md:text-white">
                            {t("header.subtitle")}
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <a
                                href="https://drive.google.com/file/d/1cf3CmaH90Yy4SnUy0ZgXAtxNrueUdjAD/view?usp=sharing"
                                aria-label="Mr Romchi katalogini yuklab olish"
                                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                            >
                                {t("header.catalog")}
                            </a>

                            <a
                                href="tel:+998909333898"
                                className="inline-flex items-center justify-center gap-2 
                                            rounded-full border border-white
                                            px-6 py-3 text-sm font-semibold text-white
                                            transition hover:bg-white/10
                                            animate-[glow_2s_ease-in-out_infinite]"
                            >
                                <Phone size={16} />
                                {t("header.contact")}
                            </a>
                        </div>
                    </div>
                </div>

            </div>


        </header>
    )
}

export default HeroSection