'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { clients } from "@/data/products";

const Customers: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-24">
            <h2 className='text-3xl font-bold tracking-tight text-primary text-center md:text-5xl'>Bizning Mijozlar</h2>
            <p className='mt-4 text-lg text-gray-600 text-center mb-12'>Bizga ishonch bildirgan kompaniyalar</p>

            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                loop={true}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 5 },
                }}
                className="flex items-center"
            >
                {clients.map((client) => (
                    <SwiperSlide key={client.id} className="mx-auto">
                        <div className="group flex items-center justify-center gap-4 cursor-pointer transition">
                            <img src={client.img} alt={client.name} className="max-w-40" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    )
}

export default Customers