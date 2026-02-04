'use client'
import { ArrowUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ToUp: React.FC = () => {
    const router = useRouter()
    const scrollTop = () => {
        router.push('/')
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className='fixed bottom-8 right-8'>
            <button onClick={scrollTop} className='bg-black cursor-pointer text-white p-3 rounded-full hover:scale-110 transition-transform duration-300 inline-block 
            shadow-md shadow-white'>
                <ArrowUp size={24} />
            </button>
        </div>
    )
}

export default ToUp