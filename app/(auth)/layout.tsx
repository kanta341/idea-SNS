// app/layout.tsx
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My App',
  description: 'My next-auth app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>{children}</div>
  )
}

