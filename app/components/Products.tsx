import React from 'react'
import CarouselProduct from './Props/CarouselProduct'
import { pvxProducts, alyuminProducts, razdvijnoyProducts, fasadProducts, newSystemProducts, otherProducts } from '../data/products'

const Products: React.FC = () => {
    return (
        <section className='max-w-7xl mx-auto px-4 py-24'>
            <h2 className='text-3xl font-bold tracking-tight text-primary text-center md:text-5xl'>Bizning Mahsulotlar</h2>
            <p className='mt-4 text-lg text-gray-600 text-center'>Yuqori sifatli PVX va Alyuminiy profillari</p>

            <CarouselProduct title='PVX Profillari' className='bg-blue-600' products={pvxProducts} />
            <CarouselProduct title='Alyumin Profillari' className='bg-red-600' products={alyuminProducts} />
            <CarouselProduct title='Razdvijnoy Profillari' className='bg-green-600' products={razdvijnoyProducts} />
            <CarouselProduct title='Fasad Profillari' className='bg-yellow-600' products={fasadProducts} />
            <CarouselProduct title='Yangi Sistema' className='bg-yellow-600' products={newSystemProducts} />
            <CarouselProduct title='Boshqa Maxsulotlar' className='bg-yellow-600' products={otherProducts} />

        </section>
    )
}

export default Products