import { Users } from 'lucide-react'
import React from 'react'
import AnimatedCounter from './Props/AnimatedCounter'

const AboutUs: React.FC = () => {
    return (
        <section className='bg-cover bg-no-repeat aboutSection'>
            <div className='max-w-7xl mx-auto px-4 py-24 max-md:px-6'>
                <div className='flex items-center justify-between max-md:flex-col-reverse'>
                    <div className='max-md:mt-12 max-md:text-center'>
                        <span className='bg-[#404040] py-1 px-3 text-[12px] font-bold text-white rounded-md'>Kompaniya haqida</span>

                        <h2 className='text-white text-[60px] font-bold my-4 max-md:text-[30px]'>Biz haqimizda</h2>
                        <p className='text-[18px] text-gray-300 max-w-xl max-md:text-[16px]'>"Mrrochi" kompaniyasi ko'p yillardan buyon bozorda o'z o'rniga ega bo'lgan,
                            sifat va ishonch timsoliga aylangan korxonadir.
                            Bizning maqsadimiz – har bir xonadonga qulaylik va zamonaviy ko'rinish olib kirish.</p>

                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div>
                                <AnimatedCounter value={6} suffix="+" delay={0} />
                                <p className="text-sm text-gray-400">Yillik Tajriba</p>
                            </div>
                            <div>
                                <AnimatedCounter value={100} suffix="+" delay={0} />
                                <p className="text-sm text-gray-400">Mamnun Mijozlar</p>
                            </div>
                            <div>
                                <AnimatedCounter value={100} suffix="%" delay={0} />
                                <p className="text-sm text-gray-400">Sifat Kafolati</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1 max-md:text-[24px]">24/7</h4>
                                <p className="text-sm text-gray-400">Qo'llab-quvvatlash</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 relative max-md:w-100">
                        <div className="relative z-10 rounded-3xl bg-white p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">

                            <div className="bg-cover bg-no-repeat aspect-4/3 rounded-xl bg-gray-200 overflow-hidden bgTeam"></div>

                            <div className="mt-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Mrrochi Team
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Professionallar jamoasi
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white ">
                                    <Users size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -right-6 h-full w-full rounded-3xl border-2 border-white/30 z-0"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs