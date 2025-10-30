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
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ThemeToggle } from '@/components/theme-toggle'
import { ProductThemeSwitcher } from '@/components/ui/product-toggle'
import { Separator } from '@/components/ui/separator'

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
                                    <header className="flex h-16 shrink-0 items-center px-4 md:pl-0">
                                        <div className="flex items-center gap-1 pr-4 md:hidden">
                                            <SidebarTrigger className="-ml-1" />
                                            <Separator
                                                orientation="vertical"
                                                className="mx-2 data-[orientation=vertical]:h-4"
                                            />
                                        </div>
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
                                        <div className="ml-auto flex items-center gap-2">
                                            <ProductThemeSwitcher
                                                dictionary={dictionary}
                                            />
                                            <ThemeToggle />
                                        </div>
                                    </header>
                                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:pl-0">
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
