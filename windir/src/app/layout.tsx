'use client';
import './globals.css'
import Navigation from '@/components/layout/navigation'
import WindirHeader from '@/components/layout/header'
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export default async function RootLayout({children}: {children: ReactNode}) {
  return (
      <html lang="ru">
        <head>
          <title>Windir</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <SessionProvider>
            <Navigation />
            <WindirHeader />
            {children}
          </SessionProvider>
        </body>
      </html>
  )
}
