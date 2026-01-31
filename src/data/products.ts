import { ProductItem, ServiceItem, Client } from './../types/product';
import { Wrench, Ruler, Truck, Settings, Hammer, Headset } from 'lucide-react'

export const pvxProducts: ProductItem[] = [
    {
        id: 1,
        name: '6000 trio',
        img: './productsImg/trio6000.png',
        description: 'Description for PVX Product 1',
    },
    {
        id: 2,
        name: '6000 qvt',
        img: './productsImg/quattro6000.png',
        description: 'Description for PVX Product 2',
    },
    {
        id: 3,
        name: '7000 engelberg',
        img: './productsImg/engelberg7000.png',
        description: 'Description for PVX Product 3',
    },
    {
        id: 4,
        name: '8000 engelberg',
        img: './productsImg/engelberg8000.png',
        description: 'Description for PVX Product 4',
    },
]

export const alyuminProducts: ProductItem[] = [
    {
        id: 1,
        name: 'Aldox',
        img: './productsImg/aldox.png',
        description: 'Description for Aluminum Product 1',
    },
    {
        id: 2,
        name: 'Champion',
        img: 'https://akfagroup.com/img/src/functional/aldox1.png',
        description: 'Description for Aluminum Product 2',
    },
    {
        id: 3,
        name: 'Termo 7000',
        img: '/productsImg/bkt70.png',
        description: 'Description for Aluminum Product 3',
    },
    {
        id: 4,
        name: 'Termo 5700',
        img: '/productsImg/termo5700.jpg',
        description: 'Description for Aluminum Product 3',
    },
    {
        id: 5,
        name: 'Termo 9800',
        img: '/productsImg/bkt98.png',
        description: 'Description for Aluminum Product 3',
    }
]

export const razdvijnoyProducts: ProductItem[] = [
    {
        id: 1,
        name: 'Bkx 65',
        img: './productsImg/bkx 65.png',
        description: 'Description for Sliding Product 1',
    },
    {
        id: 2,
        name: 'Bkx 38',
        img: '/productsImg/bkx38.jpg',
        description: 'Description for Sliding Product 2',
    }
]

export const fasadProducts: ProductItem[] = [
    {
        id: 1,
        name: 'Bkf 48',
        img: './productsImg/jp 48.png',
        description: 'Description for Balcony Product 1',
    },
    {
        id: 2,
        name: 'Bkf 50',
        img: '/productsImg/bkf50.jpg',
        description: 'Description for Facade Product 1',
    },
    {
        id: 3,
        name: 'Pauk sistema',
        img: '/productsImg/spidersystem.jpg',
        description: 'Description for Facade Product 2',
    }

]

export const newSystemProducts: ProductItem[] = [
    {
        id: 1,
        name: 'Rolstavniy',
        img: '/productsImg/rolsatvdoor.jpeg',
        description: 'Description for New System Product 1',
    },
    {
        id: 2,
        name: 'Sekshionniy',
        img: '/productsImg/sektiondoor.jpg',
        description: 'Description for New System Product 2',
    },
    {
        id: 3,
        name: 'Sensor',
        img: 'https://alutech.uz/upload/resize_cache/webp/iblock/8d9/8d9748d8ce3ab466f12dca0483a29b7a.webp',
        description: 'Description for New System Product 3',
    },
    {
        id: 4,
        name: 'Gelatina',
        img: '/productsImg/gelatina.jpeg',
        description: 'Description for New System Product 4',
    },
    {
        id: 5,
        name: 'Pergola',
        img: '/productsImg/pergola.jpg',
        description: 'Description for New System Product 5',
    },
    {
        id: 6,
        name: 'Markiza',
        img: '/productsImg/markizy-glavnaya.jpeg',
        description: 'Description for New System Product 6',
    }
]

export const otherProducts: ProductItem[] = [
    {
        id: 1,
        name: 'San-uzel',
        img: '/productsImg/san_uzel.jpeg',
        description: 'Description for Other Product 1',
    },
    {
        id: 2,
        name: 'Perila',
        img: '/productsImg/perila.jpeg',
        description: 'Description for Other Product 2',
    },
    {
        id: 3,
        name: 'Podokonnik',
        img: '/productsImg/podokonnik.png',
        description: 'Description for Other Product 3',
    },
    {
        id: 4,
        name: 'Moskitnaya setka',
        img: '/productsImg/setka.png',
        description: 'Description for Other Product 4',
    },
    {
        id: 5,
        name: 'Peregorodka',
        img: '/productsImg/peregarodka.jpeg',
        description: 'Description for Other Product 5',
    },
    {
        id: 6,
        name: 'Zimniy sad',
        img: '/productsImg/wintergarden.png',
        description: 'Description for Other Product 6',
    }
]

export const services: ServiceItem[] = [
    {
        id: 1,
        title: "services.items.1.title",
        description: "services.items.1.description",
        icon: Settings,
        color: "bg-blue-100 text-blue-600",
    },
    {
        id: 2,
        title: "services.items.2.title",
        description: "services.items.2.description",
        icon: Wrench,
        color: "bg-green-100 text-green-600",
    },
    {
        id: 3,
        title: "services.items.3.title",
        description: "services.items.3.description",
        icon: Ruler,
        color: "bg-purple-100 text-purple-600",
    },
    {
        id: 4,
        title: "services.items.4.title",
        description: "services.items.4.description",
        icon: Hammer,
        color: "bg-orange-100 text-orange-600",
    },
    {
        id: 5,
        title: "services.items.5.title",
        description: "services.items.5.description",
        icon: Headset,
        color: "bg-teal-100 text-teal-600",
    },
    {
        id: 6,
        title: "services.items.6.title",
        description: "services.items.6.description",
        icon: Truck,
        color: "bg-red-100 text-red-600",
    },
]

export const clients: Client[] = [
    { id: 1, name: "Krantash", img: "./customers/krantas.png", color: 'bg-yellow-600' },
    { id: 2, name: "Sevimli", img: "./customers/sevimli.png", color: "bg-red-500" },
    { id: 3, name: "Millat umidi", img: './customers/millatumidi.jpg', color: "bg-green-500" },
    { id: 4, name: "King Plov", img: './customers/kingPlov.jpg', color: "bg-green-500" },
];

export const navItems = [
    { href: '/', key: "nav.home" },
    { href: '#product', key: "nav.products" },
    { href: '#services', key: "nav.services" },
    { href: '#about', key: "nav.about" },
    { href: '#contact', key: "nav.contact" },
];

export const slides = [
    '/images/headerbg1.jpg',
    '/images/headerbg2.jpg',
    '/images/headerbg3.jpg',
]