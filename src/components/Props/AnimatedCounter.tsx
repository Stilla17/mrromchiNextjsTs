'use client'
import React, { useEffect, useState } from 'react'

interface AnimatedCounterProps {
    value: number
    suffix?: string
    delay?: number
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix, delay }) => {
    const [count, setCount] = useState<number>(0)
    useEffect(() => {
        let current = 0
        const duration = 1000
        const stepTime = 20
        const steps = duration / stepTime
        const increment = value / steps

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                current += increment
                if (current >= value) {
                    setCount(value)
                    clearInterval(interval)
                } else {
                    setCount(Math.ceil(current))
                }
            }, stepTime)
        }, delay)

        return () => clearTimeout(timeout)
    }, [value, delay])

    return (
        <span className="text-3xl font-bold text-white mb-1 max-md:text-[24px]">
            {count}
            {suffix}
        </span>
    )
}

export default AnimatedCounter