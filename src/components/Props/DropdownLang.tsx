'use client';

import React, { useEffect, useState } from 'react';
import i18n from 'i18next';

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

const DropdownLang: React.FC = () => {

    const [lang, setLang] = useState<string>(i18n.language || 'uz');

    useEffect(() => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang) {
            i18n.changeLanguage(savedLang);
            setLang(savedLang);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLang = e.target.value;
        setLang(selectedLang);
        i18n.changeLanguage(selectedLang);
        localStorage.setItem('lang', selectedLang);
    };


    return (
        <div className="flex items-center gap-1">
            <img
                src={countries.find(c => c.code === lang)?.flag}
                alt={lang}
            />

            <select
                value={lang}
                onChange={handleChange}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer"
            >
                {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropdownLang