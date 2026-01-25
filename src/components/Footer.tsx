'use client'
import { navItems } from '@/data/products'
import { Instagram, Mail, MapPin, Phone, Send } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer: React.FC = () => {
    const { t } = useTranslation()

    return (
        <footer className="bg-primary pt-20 pb-10 text-white bg-black border-t border-white/10 dark:border-gray-800">
            <div className="max-w-7xl mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <p className='font-bold text-[22px]'><span className='text-[#94813d]'>Mr</span> Romchi</p>
                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            Har bir xonadon uchun sifat va ishonch. Bizning maqsadimiz — uyingizni yanada qulay va
                            ko'rkam qilishdir.
                        </p>
                        <div className="flex gap-4">
                            <Link className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all" href="#">
                                <Instagram />
                            </Link>
                            <Link className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all" href="#">
                                <Send />
                            </Link>

                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h3 className="font-bold text-white mb-6">Menu</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {
                                navItems?.map(item => (
                                    <li key={item.href}>
                                        <Link href={item.href} className="hover:text-white transition-colors">
                                            {t(item.key)}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="lg:col-span-3">
                        <h3 className="font-bold text-white mb-6">Maxsulotlar</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a className="hover:text-white transition-colors" href="#">PVX 6000 Trio</a></li>
                            <li><a className="hover:text-white transition-colors" href="#">Engelberg 7000</a></li>
                            <li><a className="hover:text-white transition-colors" href="#">Alyumin Termo</a></li>
                            <li><a className="hover:text-white transition-colors" href="#">Aldoks</a></li>
                        </ul>
                    </div>
                    <div className="lg:col-span-3">
                        <h3 className="font-bold text-white mb-6">Bog'lanish</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <Phone />
                                <a href="tel:+998909333898">
                                    <span>+998 90 933 38 98</span></a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin />
                                <span>Allon 74</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail />
                                <span>mrromchi@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Mrrochi. Barcha huquqlar himoyalangan.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a className="hover:text-white transition-colors" href="#">Maxfiylik siyosati</a>
                        <a className="hover:text-white transition-colors" href="#">Foydalanish shartlari</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer