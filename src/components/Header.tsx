"use client"
import React, { useState } from 'react'
import { Menu } from 'lucide-react';
import Link from 'next/link'
import DropdownLang from './Props/DropdownLang';
import { useTranslation } from 'react-i18next';
import { navItems } from '@/data/products';
import Image from 'next/image';
import logo from './../../public/mr_romchi.png';

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation()
  return (
    <header className="w-full border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center gap-2">
            <Image
              width={50}
              src={logo}
              alt='Mr Romchi - Sifatli xizmatlar'
              priority />
            <p className='font-bold text-[22px]'><span className='text-[#94813d]'>Mr</span> Romchi</p>
          </div>

          <nav aria-label="Asosiy menyu" >
            <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
              {
                navItems.map((item, index) => (
                  <li key={item.key}>
                    <Link href={item.href} className="hover:text-[#94813d] transition ">
                      {t(item.key)}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </nav>

          <div className="items-center gap-4 hidden md:flex">
            <div className='border-r pr-4 border-gray-300'>
              <DropdownLang />
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
            {
              navItems?.map(item => (
                <Link key={item.key} href={item.href} onClick={() => setOpen(false)}>{t(item.key)}</Link>

              ))
            }

            <div className="mt-4 flex flex-col gap-3">
              <DropdownLang />
              <a
                href="tel:+998909333898"
                className="rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white"
              >
                +998 90 933 38 98
              </a>
            </div>
          </nav>
        </div>
      )
      }
    </header >
  )
}

export default Header