import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { Notification as Notif } from "@/util/types";

const NotificationContext = createContext<{
    notification: Notif | null,
    showNotification: (n:Notif) => void,
    hideNotification: () => void
}>({
    notification: null,
    showNotification: () => {},
    hideNotification: () => {}
})

export function NotificationContextProvider({children}: {children: ReactNode}) {
    const [notif, setNotif] = useState<Notif|null>(null);

    const showNotification = useCallback((n: Notif) => {
        setNotif(n);
    }, [setNotif]);

    const hideNotification = useCallback(() => setNotif(null), [setNotif]);

    useEffect(() => {
        if (notif && (notif.status === 'error' || notif.status === 'success')) {
            const timer = setTimeout(() => hideNotification(), 3000);
            return () => clearTimeout(timer);
        }
    }, [notif]);

    return (<NotificationContext.Provider value={{
        notification: notif,
        showNotification,
        hideNotification
    }}>
        {children}
    </NotificationContext.Provider>)
}

export default NotificationContext;