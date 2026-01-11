import { Car } from 'lucide-react'
import React from 'react'
import CarouselProduct from './Props/CarouselProduct'

const Products: React.FC = () => {
    return (
        <section className='max-w-7xl mx-auto px-4 py-24'>
            <h2 className='text-3xl font-bold tracking-tight text-primary text-center md:text-5xl'>Bizning Mahsulotlar</h2>
            <p className='mt-4 text-lg text-gray-600 text-center'>Yuqori sifatli PVX va Alyuminiy profillari</p>

            <CarouselProduct title='PVX Profillari' className='bg-blue-600' products={}/>

        </section>
    )
}

export default Products