import { ReactNode } from "react";
import MainHeader from "./MainHeader";

function Layout({children}: {children: ReactNode}) {
    return (<>
        <MainHeader />
        <main>{children}</main>
    </>)
}

export default Layout;