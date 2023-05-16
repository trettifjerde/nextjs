import { useEffect } from 'react';
import contentClasses from './page-content.module.css';
import PageHeader from './page-header';
import classes from './styles/classes';
import { PageData } from '@/util/types';

export default function PageContent({children, data}: 
    {children: React.ReactNode, data: PageData}) {
    
    const {styles} = data;

    return (
        <main className={`${contentClasses.content} ${styles in classes ? classes[styles][styles] : ''}`}>
            <PageHeader data={data} />
            <section>{children}</section>
        </main>
    )
}