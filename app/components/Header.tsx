"use client"
import React, { useState } from 'react'
import { Menu } from 'lucide-react';
import Link from 'next/link'

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="w-full border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
              💎
            </div>
            <span className="text-lg font-semibold">
              Mrrochi
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link href="#" className="hover:text-black transition">
              Maxsulotlar
            </Link>
            <Link href="#" className="hover:text-black transition">
              Xizmatlar
            </Link>
            <Link href="#" className="hover:text-black transition">
              Biz haqimizda
            </Link>
            <Link href="#" className="hover:text-black transition">
              Kontakt
            </Link>
          </nav>

          <div className="items-center gap-4 hidden md:flex">
            <div className='border-r pr-4 border-gray-300'>
              <select className='focus:outline-none pr-2'>
                <option value="uz">UZ</option>
                <option value="ru">RU</option>
                <option value="en">EN</option>
              </select>
            </div>

            <a
              href="tel:+998909333898"
              className="rounded-xl bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-gray-900 transition"
            >
              +998 90 933 38 98
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className='md:hidden'>
            <Menu />
          </button>


        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col gap-4 px-4 py-6 text-sm font-medium text-gray-700">
            <Link href="#" onClick={() => setOpen(false)}>Maxsulotlar</Link>
            <Link href="#" onClick={() => setOpen(false)}>Xizmatlar</Link>
            <Link href="#" onClick={() => setOpen(false)}>Biz haqimizda</Link>
            <Link href="#" onClick={() => setOpen(false)}>Kontakt</Link>

            <div className="mt-4 flex flex-col gap-3">
              <button className="text-left text-sm font-medium">
                UZ ▾
              </button>
              <a
                href="tel:+998909333898"
                className="rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white"
              >
                +998 90 933 38 98
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header