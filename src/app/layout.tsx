import type { Metadata } from 'next'
import { Inter as Sans, JetBrains_Mono as Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { getDictionary } from '@/lib/dictionary'
import { DictionaryProvider } from '@/providers/dictionary-provider'
import { ProductThemeProvider } from '@/providers/product-theme-provider'

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/features/sidebar/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

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
        <html lang="tr" suppressHydrationWarning>
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
                            <SidebarProvider>
                                <AppSidebar />
                                <SidebarInset>
                                    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2">
                                        <div className="flex items-center gap-2 px-4">
                                            <SidebarTrigger className="-ml-1" />
                                            <Separator
                                                orientation="vertical"
                                                className="mr-2 data-[orientation=vertical]:h-4"
                                            />
                                            <Breadcrumb>
                                                <BreadcrumbList>
                                                    <BreadcrumbItem className="hidden md:block">
                                                        <BreadcrumbLink href="#">
                                                            Building Your
                                                            Application
                                                        </BreadcrumbLink>
                                                    </BreadcrumbItem>
                                                    <BreadcrumbSeparator className="hidden md:block" />
                                                    <BreadcrumbItem>
                                                        <BreadcrumbPage>
                                                            Data Fetching
                                                        </BreadcrumbPage>
                                                    </BreadcrumbItem>
                                                </BreadcrumbList>
                                            </Breadcrumb>
                                        </div>
                                    </header>
                                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                                        {children}
                                    </div>
                                </SidebarInset>
                            </SidebarProvider>
                        </DictionaryProvider>
                    </ThemeProvider>
                </ProductThemeProvider>
            </body>
        </html>
    )
}
