'use client';
import { useEffect, useRef } from 'react';
import headerClasses from './page-header.module.css';
import pageClasses from './styles/classes';
import Image from 'next/image';
import { PageData } from '@/util/types';

export default function PageHeader({data}: {data: PageData}) {
    const {title, image, styles} = data;
    const hRef = useRef<HTMLHeadingElement>(null);
    const header = <h1 ref={hRef}>{title}</h1>;

    useEffect(() => {
        hRef.current!.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, []);

    return (<>
        {image && <div className={`${headerClasses['image-cont']} ${pageClasses[styles]['image-cont'] ? pageClasses[styles]['image-cont'] : ''}`}>
            <Image src={image} alt="Заглавное изображение" width={1200} height={600} />
            {header}
        </div>}
        
        {!image && header}
    </>)
}