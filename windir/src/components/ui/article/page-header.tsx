import classes from './page-header.module.css';
import Image from 'next/image';

export default function PageHeader({title, image}: {title: string, image: string}) {
    return (<>
    {image && <div className={classes['image-cont']}>
        <Image src={image} alt="Заглавное изображение" width={1200} height={600} />
        <h1>{title}</h1>
    </div>}
    {!image && <h1>{title}</h1>}
    </>)
}