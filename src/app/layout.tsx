import type { Metadata } from 'next'
import { Inter as Sans, JetBrains_Mono as Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

const sans = Sans({
    variable: '--font-sans',
    subsets: ['latin'],
})

const mono = Mono({
    variable: '--font-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'FDS-AI',
    description: 'Base repo for FDS-AI',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${sans.variable} ${mono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster richColors position="top-right" />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
