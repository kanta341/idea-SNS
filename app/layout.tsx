// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My App',
  description: 'My next-auth app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        
        <Providers>
          {children}
          </Providers>
      </body>
    </html>
  )
}