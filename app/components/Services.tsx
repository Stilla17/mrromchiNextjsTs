'use client'
import React from 'react'
import { services } from '../data/products'

const Services = () => {
    return (
        <section className='max-w-7xl mx-auto px-4 py-24'>
            <h2 className='text-3xl font-bold tracking-tight text-primary text-center md:text-5xl'>Bizning Xizmatlar</h2>
            <p className='mt-4 text-lg text-gray-600 text-center'>Biz sizga to'liq sikldagi xizmatlarni taklif etamiz</p>

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
                                {service.title}
                            </h3>

                            <p className="mt-3 text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Services