import { ReactNode, useContext } from "react";
import MainHeader from "./MainHeader";
import NotificationContext from "@/store/context";
import Notification from "../ui/notification";

function Layout({children}: {children: ReactNode}) {
    const context = useContext(NotificationContext);
    return (<>
        <MainHeader />
        <main>{children}</main>
        {context.notification && <Notification notification={context.notification} hideHandler={context.hideNotification} />}
    </>)
}

export default Layout;