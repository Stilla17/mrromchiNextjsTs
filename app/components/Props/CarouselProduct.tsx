import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface ProductItem {
    id: number;
    name: string;
    img: string;
    description: string;
}

interface CarouselProductProps {
    title: string;
    className: string;
    img: string;
    imgName: string;
    description: string;
    products: ProductItem[];
}

const CarouselProduct: React.FC<CarouselProductProps> = ({ title, className, products }) => {
    return (
        <div>
            <div>
                <h3 className='text-2xl font-bold text-primary flex items-center gap-2'>
                    <span className={`w-1.5 h-8 ${className} rounded-full block`}></span>
                    {title}
                </h3>
                <button className='p-4 rounded-full border border-gray-400'><ArrowLeft /></button>
                <button className='p-4 rounded-full border border-gray-400'><ArrowRight /></button>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={products.length > 4}
                className="pb-12"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative overflow-hidden bg-gray-100">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h4 className="text-xl font-semibold text-gray-800">
                                    {product.name}
                                </h4>
                                <p className="text-gray-600 mt-2">{product.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default CarouselProduct