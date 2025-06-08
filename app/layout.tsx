'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import './globals.scss'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quiz',
  description: 'Tons of exciting quizs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    require('bootstrap')
  }, [])

  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
