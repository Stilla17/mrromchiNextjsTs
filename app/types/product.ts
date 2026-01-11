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
    icon: any;
    color: string;
}