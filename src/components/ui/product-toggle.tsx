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
    dictionary: {
        themes: {
            default: string
            parasut: string
            bizmu: string
        }
    }
}

export function ProductThemeSwitcher({
    dictionary,
}: ProductThemeSwitcherProps) {
    const { themeSet, setThemeSet } = useProductTheme()

    return (
        <Select onValueChange={setThemeSet} value={themeSet}>
            <SelectTrigger>
                <SelectValue placeholder={dictionary.themes[themeSet]} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="default">
                    {dictionary.themes.default}
                </SelectItem>
                <SelectItem value="parasut">
                    {dictionary.themes.parasut}
                </SelectItem>
                <SelectItem value="bizmu">{dictionary.themes.bizmu}</SelectItem>
            </SelectContent>
        </Select>
    )
}
