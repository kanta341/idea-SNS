// app/layout.tsx
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers/Providers'
import type { Metadata } from "next";
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My App',
  description: 'My next-auth app',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
        <div>
            <main className="flex-1 pt-16">{children}</main>
            <div className="flex-2">
        <Footer />
        </div>
            
        </div>
        
  )
}






