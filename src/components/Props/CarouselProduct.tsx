'use client';
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CarouselProductProps } from './../../types/product';

const CarouselProduct: React.FC<CarouselProductProps> = ({ title, className, products }) => {

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div>
            <div className='flex justify-between items-center '>
                <h3 className='text-2xl font-bold text-primary flex items-center gap-2 max-md:text-xl'>
                    <span className={`w-1.5 h-8 ${className} rounded-full block`}></span>
                    {title}
                </h3>
                <div className='flex gap-4 items-center'>
                    <button ref={prevRef} className={`p-4 rounded-full border border-gray-400 cursor-pointer max-md:p-2`}><ArrowLeft /></button>
                    <button ref={nextRef} className={`p-4 rounded-full border border-gray-400 cursor-pointer max-md:p-2`}><ArrowRight /></button>
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                onBeforeInit={(swiper) => {
                    if (typeof swiper.params.navigation !== 'boolean') {
                        swiper.params.navigation!.prevEl = prevRef.current
                        swiper.params.navigation!.nextEl = nextRef.current
                    }
                }}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={products.length > 4}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className='py-12'>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative overflow-hidden bg-gray-100">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-full h-64 object-contain transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-6 ">
                                <h4 className="text-xl font-semibold text-gray-800 max-md:text-lg">
                                    {product.name}
                                </h4>
                                <p className="text-gray-600 mt-2 text-[14px]">{product.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default CarouselProduct