import type { LucideIcon } from 'lucide-react';

export interface ProductItem {
    id: number;
    name: string;
    img: string;
    description: string;
}

export interface CarouselProductProps {
    title: string;
    className: string;
    products: ProductItem[];
}

export interface ServiceItem {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
}

export type Client = {
    id: number;
    name: string;
    img: string;
    color: string;
};

export interface Title {
    title: string;
    subtitle: string;
}
