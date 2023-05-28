import { useEffect, useRef } from 'react';
import contentClasses from './page-content.module.css';
import PageHeader from './page-header';
import classes from './styles/classes';
import { PageData } from '@/util/types';
import fonts from '@/styles/fonts.module.css';

export default function PageContent({children, data}: {children: React.ReactNode, data: PageData}) {
    const {styles} = data;
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (data.title && mainRef.current)
            mainRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [mainRef, data]);

    return (
        <main ref={mainRef} className={`${fonts.oswald} ${contentClasses.content} ${styles in classes ? classes[styles][styles] : ''}`}>
            <PageHeader data={data} />
            <section>{children}</section>
        </main>
    )
};
