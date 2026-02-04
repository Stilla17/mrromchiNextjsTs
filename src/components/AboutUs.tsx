'use client'
import { Users } from 'lucide-react'
import React from 'react'
import AnimatedCounter from './Props/AnimatedCounter'
import { useTranslation } from 'react-i18next'

const AboutUs: React.FC = () => {
    const { t } = useTranslation()
    return (
        <section className='bg-cover bg-no-repeat aboutSection' id='about'>
            <div className='max-w-7xl mx-auto px-4 py-24 max-md:px-6'>
                <div className='flex items-center justify-between max-md:flex-col-reverse'>
                    <div className='max-md:mt-12 max-md:text-center'>
                        <span className='bg-[#404040] py-1 px-3 text-[12px] font-bold text-white rounded-md'>{t('about.miniTitle')}</span>

                        <h2 className='text-white text-[60px] font-bold my-4 max-md:text-[30px]'>{t('about.title')}</h2>
                        <p className='text-[18px] text-gray-300 max-w-xl max-md:text-[16px]'>{t('about.subtitle')}</p>

                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div>
                                <AnimatedCounter value={6} suffix="+" delay={0} />
                                <p className="text-sm text-gray-400">{t('about.yearWork')}</p>
                            </div>
                            <div>
                                <AnimatedCounter value={100} suffix="+" delay={0} />
                                <p className="text-sm text-gray-400">{t('about.clients')}</p>
                            </div>
                            <div>
                                <AnimatedCounter value={100} suffix="%" delay={0} />
                                <p className="text-sm text-gray-400">{t('about.quality')}</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1 max-md:text-[24px]">24/7</h4>
                                <p className="text-sm text-gray-400">{t('about.time')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-150 relative max-sm:max-w-full">
                        <div className="relative z-10 rounded-3xl bg-white p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">

                            <div className="bg-cover bg-no-repeat aspect-4/3 rounded-xl bg-gray-200 overflow-hidden bgTeam "></div>

                            <div className="mt-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Mr Romchi Team
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {t('about.team')}
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white ">
                                    <Users size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -right-6 h-full w-full rounded-3xl border-2 border-white/30 z-0 max-md:hidden"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs