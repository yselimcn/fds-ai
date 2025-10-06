'use client'

import { useProductTheme } from '@/providers/product-theme-provider'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface ProductThemeSwitcherProps {
    dict: {
        themes: {
            default: string
            parasut: string
            bizmu: string
        }
    }
}

export function ProductThemeSwitcher({ dict }: ProductThemeSwitcherProps) {
    const { themeSet, setThemeSet } = useProductTheme()

    return (
        <Select onValueChange={setThemeSet} value={themeSet}>
            <SelectTrigger>
                <SelectValue placeholder={dict.themes[themeSet]} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="default">{dict.themes.default}</SelectItem>
                <SelectItem value="parasut">{dict.themes.parasut}</SelectItem>
                <SelectItem value="bizmu">{dict.themes.bizmu}</SelectItem>
            </SelectContent>
        </Select>
    )
}
