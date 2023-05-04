import { ReactNode } from "react";

function Layout({children}: {children: ReactNode}) {
    return (
        <html lang="en">
            <head>
                <title>React Events</title>
            </head>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default Layout;