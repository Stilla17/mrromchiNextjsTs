'use client';

import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import Image from 'next/image';

interface Country {
    name: string;
    flag: string;
    code: 'uz' | 'ru' | 'en';
}

const countries: Country[] = [
    { name: 'UZ', code: "uz", flag: '/flags/uz.png' },
    { name: 'RU', code: "ru", flag: '/flags/ru.png' },
    { name: 'EN', code: "en", flag: '/flags/en.png' },
]

const isLanguageCode = (value: string | null): value is Country['code'] =>
    countries.some((country) => country.code === value);

const DropdownLang: React.FC = () => {
    const [lang, setLang] = useState<Country['code']>(() => {
        if (typeof window === 'undefined') {
            return isLanguageCode(i18n.language) ? i18n.language : 'uz';
        }

        const savedLang = localStorage.getItem('lang');
        return isLanguageCode(savedLang) ? savedLang : 'uz';
    });
    const selectedCountry = countries.find(c => c.code === lang) ?? countries[0];

    useEffect(() => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
    }, [lang]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLang = e.target.value as Country['code'];
        setLang(selectedLang);
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
