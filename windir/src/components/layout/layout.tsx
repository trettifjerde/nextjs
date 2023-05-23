import { ReactNode } from "react";
import WindirHeader from "./header/header";
import Navigation from "./navigation/navigation";
import { PageData } from "@/util/types";
import PageContent from "./page/page-content";

export default function Layout({children, data}: {children: ReactNode, data: PageData}) {

    return (<>
        <WindirHeader error={data.styles === 'error' ? data.title : ''} />
        <Navigation />
        <PageContent data={data}>{children}</PageContent>
    </>)
    
}