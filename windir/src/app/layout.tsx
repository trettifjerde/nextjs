import './globals.css'
import Navigation from '@/components/layout/navigation'
import WindirHeader from '@/components/layout/header'
import { UserContextProvider } from '@/context/user-context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="ru">
        <head>
          <title>Windir</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <UserContextProvider>
            <Navigation dark={false} />
            <WindirHeader />
            <main>{children}</main>
          </UserContextProvider>
        </body>
      </html>
  )
}