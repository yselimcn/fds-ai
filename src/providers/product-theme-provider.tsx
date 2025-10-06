'use client'

import * as React from 'react'

// Olası Tema Setleri
type ThemeSet = 'default' | 'parasut' | 'bizmu'
const THEME_SET_KEY = 'theme-set' // LocalStorage anahtarı
const HTML_ATTRIBUTE = 'data-theme-set' // HTML özniteliği

interface ProductThemeContextType {
    themeSet: ThemeSet
    setThemeSet: (set: ThemeSet) => void
}

const ProductThemeContext = React.createContext<
    ProductThemeContextType | undefined
>(undefined)

export function ProductThemeProvider({
    children,
    defaultSet = 'default',
}: {
    children: React.ReactNode
    defaultSet?: ThemeSet
}) {
    const [themeSet, setThemeSet] = React.useState<ThemeSet>(() => {
        // 1. Initial state'i LocalStorage'dan al
        if (typeof window !== 'undefined') {
            return (
                (localStorage.getItem(THEME_SET_KEY) as ThemeSet) || defaultSet
            )
        }
        return defaultSet
    })

    // 2. Tema seti değiştiğinde HTML özniteliğini ve LocalStorage'ı güncelle
    React.useEffect(() => {
        const root = window.document.documentElement

        // HTML'ye özniteliği ayarla: data-theme-set="parasut"
        root.setAttribute(HTML_ATTRIBUTE, themeSet)

        localStorage.setItem(THEME_SET_KEY, themeSet)
    }, [themeSet])

    const value = React.useMemo(() => ({ themeSet, setThemeSet }), [themeSet])

    return (
        <ProductThemeContext.Provider value={value}>
            {children}
        </ProductThemeContext.Provider>
    )
}

// Kolay erişim için Hook
export function useProductTheme() {
    const context = React.useContext(ProductThemeContext)
    if (context === undefined) {
        throw new Error(
            'useProductTheme must be used within a ProductThemeProvider',
        )
    }
    return context
}
