import { ReactNode, useEffect, useRef } from "react";
import WindirHeader from "./header/header";
import Navigation from "./navigation/navigation";
import pageClasses from './page/page-content.module.css';
import classes from './page/styles/classes';
import { PageData } from "@/util/types";
import PageHeader from "./page/page-header";

export default function Layout({children, data}: {children: ReactNode, data: PageData}) {

    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (data.title && mainRef.current)
            mainRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [data, mainRef]);
    return (<>
        <WindirHeader />
        <Navigation />
        <main ref={mainRef} className={`${pageClasses.content} ${data.styles in classes ? classes[data.styles][data.styles] : ''}`}>
            <PageHeader data={data} />
            <section>{children}</section>
        </main>
    </>)
}