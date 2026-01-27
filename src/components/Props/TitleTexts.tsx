import { Title } from '@/types/product'
import React from 'react'

const TitleTexts: React.FC<Title> = ({ title, subtitle }) => {
    return (
        <>
            <h2 className='text-5xl font-bold tracking-tight text-primary text-center max-md:text-4xl'>
                {title}
            </h2>
            <p className='mt-4 text-lg text-gray-600 text-center mb-4 max-md:mb-8 max-md:text-[16px]'>
                {subtitle}
            </p>
        </>
    )
}

export default TitleTexts