'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { defaultLocale, isLocale, type Locale } from '@/lib/seo';

interface Country {
    name: string;
    flag: string;
    code: Locale;
}

const countries: Country[] = [
    { name: 'UZ', code: "uz", flag: '/flags/uz.png' },
    { name: 'RU', code: "ru", flag: '/flags/ru.png' },
    { name: 'EN', code: "en", flag: '/flags/en.png' },
]

const DropdownLang: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { i18n } = useTranslation();
    const routeLocale = pathname.split('/')[1];
    const lang = isLocale(routeLocale) ? routeLocale : defaultLocale;
    const selectedCountry = countries.find(c => c.code === lang) ?? countries[0];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLang = e.target.value;
        if (!isLocale(selectedLang)) return;

        const segments = pathname.split('/').filter(Boolean);
        if (segments.length && isLocale(segments[0])) {
            segments[0] = selectedLang;
        } else {
            segments.unshift(selectedLang);
        }

        void i18n.changeLanguage(selectedLang);
        router.push(`/${segments.join('/')}${window.location.hash}`);
    };


    return (
        <div className="flex items-center gap-1">
            <Image
                src={selectedCountry.flag}
                alt={lang}
                width={24}
                height={16}
                className="h-4 w-6 object-cover"
            />

            <select
                value={lang}
                onChange={handleChange}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer "
            >
                {countries.map((country) => (
                    <option key={country.code} value={country.code} className='text-black'>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropdownLang
