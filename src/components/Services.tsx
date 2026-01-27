'use client'
import React from 'react'
import { services } from '../data/products'
import { useTranslation } from 'react-i18next'
import TitleTexts from './Props/TitleTexts'

const Services: React.FC = () => {
    const { t } = useTranslation()

    return (
        <section className='max-w-7xl mx-auto px-4 mt-4'>
            <TitleTexts title={t('services.title')} subtitle={t('services.subtitle')} />

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => {
                    const Icon = service.icon

                    return (
                        <div
                            key={service.id}
                            className="
                bg-white rounded-2xl p-8
                shadow-md hover:shadow-lg
                transition-all duration-300
                hover:-translate-y-2 hover:scale-[1.02]
                group cursor-pointer
              "
                        >
                            <div
                                className={`
                  w-14 h-14 rounded-xl
                  flex items-center justify-center
                  ${service.color}
                  transition-transform duration-300
                  group-hover:scale-110
                `}
                            >
                                <Icon size={28} />
                            </div>

                            <h3 className="mt-6 text-xl font-semibold text-gray-900">
                                {t(service.title)}
                            </h3>

                            <p className="mt-3 text-gray-600 leading-relaxed">
                                {t(service.description)}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Services