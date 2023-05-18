'use client';
import { useEffect, useRef } from 'react';
import contentClasses from './page-content.module.css';
import PageHeader from './page-header';
import classes from './styles/classes';
import { PageData } from '@/util/types';

export default function PageContent({children, data}: {children: React.ReactNode, data: PageData}) {
    const {styles} = data;
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mainRef.current!.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, []);

    return (
        <main ref={mainRef} className={`${contentClasses.content} ${styles in classes ? classes[styles][styles] : ''}`}>
            <PageHeader data={data} />
            <section>{children}</section>
        </main>
    )
}