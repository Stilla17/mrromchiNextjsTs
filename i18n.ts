'use client'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './public/locales/en/translation.json';
import ru from './public/locales/ru/translation.json';
import uz from './public/locales/uz/translation.json';

if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        resources: {
            en: { translation: en },
            ru: { translation: ru },
            uz: { translation: uz },
        },
        lng: 'uz',
        fallbackLng: 'uz',
        interpolation: {
            escapeValue: false,
        },
    });
}

export default i18n;
