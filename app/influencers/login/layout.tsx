import { Providers } from '@/store/provider'
import '../../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Login',
  description: 'Update, change and analyze your profile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <Providers>
                {children}
            </Providers>
      </body>
    </html>
  )
}