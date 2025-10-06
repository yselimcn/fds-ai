import type { Metadata } from 'next'
import { Inter as Sans, JetBrains_Mono as Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { getDictionary } from '@/lib/dictionary'
import { DictionaryProvider } from '@/providers/dictionary-provider'
import { ProductThemeProvider } from '@/providers/product-theme-provider'

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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const dictionary = await getDictionary()
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${sans.variable} ${mono.variable} antialiased`}>
                <ProductThemeProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <DictionaryProvider dictionary={dictionary}>
                            <Toaster richColors position="top-right" />
                            {children}
                        </DictionaryProvider>
                    </ThemeProvider>
                </ProductThemeProvider>
            </body>
        </html>
    )
}
