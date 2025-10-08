// Centralized currency types and constants used across UI and data fetching

export type CurrencyCode = 'USD' | 'EUR' | 'GBP'

export type CurrencyLabelKey = 'try' | 'usd' | 'eur' | 'gbp'

export interface CurrencyItem {
    id: number
    symbol: string
    labelKey: CurrencyLabelKey
    code?: CurrencyCode
}

export const CURRENCY_DATA: CurrencyItem[] = [
    { id: 1, symbol: '₺', labelKey: 'try' },
    { id: 2, symbol: '$', labelKey: 'usd', code: 'USD' },
    { id: 3, symbol: '€', labelKey: 'eur', code: 'EUR' },
    { id: 4, symbol: '£', labelKey: 'gbp', code: 'GBP' },
]
