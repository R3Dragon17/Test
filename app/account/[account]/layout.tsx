import { Providers } from '@/store/provider'
import '../../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Profile',
  description: 'See the details of users profile',
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