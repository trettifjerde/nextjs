import { ReactNode } from "react";
import WindirHeader from "./header/header";
import Navigation from "./navigation/navigation";
import { PageData } from "@/util/types";
import PageContent from "./page/page-content";
import { oswald, runes, norse } from "@/styles/fonts";

export default function Layout({children, data}: {children: ReactNode, data: PageData}) {

    return (<div className={`${oswald.variable} ${runes.variable} ${norse.variable}`}>
        <WindirHeader error={data.styles === 'error' ? data.title : ''}/>
        <Navigation />
        <PageContent data={data}>{children}</PageContent>
        <div id="modal" />
    </div>)
}