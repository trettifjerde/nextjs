import { ReactNode } from "react";
import WindirHeader from "./header/header";
import Navigation from "./navigation/navigation";

export default function Layout({children}: {children: ReactNode}) {
    return (<>
        <WindirHeader />
        <Navigation />
        {children}
    </>)
}