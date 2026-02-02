'use client'
import React from 'react'
import CarouselProduct from './Props/CarouselProduct'
import { pvxProducts, alyuminProducts, razdvijnoyProducts, fasadProducts, newSystemProducts, otherProducts } from '../data/products'
import { useTranslation } from 'react-i18next'
import TitleTexts from './Props/TitleTexts'

const Products: React.FC = () => {
    const { t } = useTranslation()
    return (
        <section className='max-w-7xl mx-auto px-4 mt-8'>

            <TitleTexts title={t('products.title')} subtitle={t('products.subtitle')} />

            <CarouselProduct title={t('products.pvx')} className='bg-blue-600' products={pvxProducts} />
            <CarouselProduct title={t('products.alumin')} className='bg-red-600' products={alyuminProducts} />
            <CarouselProduct title={t('products.sliding')} className='bg-green-600' products={razdvijnoyProducts} />
            <CarouselProduct title={t('products.fasad')} className='bg-yellow-600' products={fasadProducts} />
            <CarouselProduct title={t('products.newSystem')} className='bg-yellow-600' products={newSystemProducts} />
            <CarouselProduct title={t('products.others')} className='bg-yellow-600' products={otherProducts} />

        </section>
    )
}

export default Products