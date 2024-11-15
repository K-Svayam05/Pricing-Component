import './globals.css'
import { Manrope } from 'next/font/google'

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['600', '800'],
})

export const metadata = {
  title: 'Interactive Pricing Component',
  description: 'Frontend Mentor Challenge - Interactive Pricing Component',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
    </html>
  )
}