import headerClasses from './page-header.module.css';
import pageClasses from './styles/classes';
import Image from 'next/image';
import { PageData } from '@/util/types';

const sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw";

export default function PageHeader({data}: {data: PageData}) {
    const {title, image, styles} = data;
    const header = <h1>{title}</h1>;

    return (<>
        {image && <div className={`${headerClasses['image-cont']} ${pageClasses[styles]['image-cont'] ? pageClasses[styles]['image-cont'] : ''}`}>
            <Image src={image} alt="Заглавное изображение" fill />
            {header}
        </div>}
        
        {!image && header}
    </>)
}