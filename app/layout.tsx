import type { Metadata, Viewport } from 'next'
import { Outfit, JetBrains_Mono, Lexend } from 'next/font/google'
import './globals.css'

// Primary font - Modern geometric sans
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
})

// Display font - Bold headlines
const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cabinet',
  weight: ['600', '700', '800'],
})

// Monospace font - Code & technical elements
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'DocuFlow | Professional PDF Editor',
  description: 'Enterprise-grade PDF editing in your browser. No uploads, no subscriptions — just powerful document tools.',
  keywords: ['PDF editor', 'document editing', 'PDF tools', 'browser PDF', 'online PDF editor'],
  authors: [{ name: 'DocuFlow' }],
  openGraph: {
    title: 'DocuFlow | Professional PDF Editor',
    description: 'Enterprise-grade PDF editing in your browser.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${lexend.variable} ${jetbrains.variable}`}>
      <body className={`${outfit.className} antialiased`}>
        {/* Background with gradient mesh */}
        <div className="fixed inset-0 bg-mesh -z-10" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" />
        
        {/* Main Content */}
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
