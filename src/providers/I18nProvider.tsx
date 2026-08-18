'use client';

import { ReactNode, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';
import type { Locale } from '@/lib/seo';

const I18nProvider = ({
    children,
    language,
}: {
    children: ReactNode;
    language: Locale;
}) => {
    const [instance] = useState(() => i18n.cloneInstance({
        lng: language,
        fallbackLng: 'uz',
        initImmediate: false,
    }));

    return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}

export default I18nProvider
