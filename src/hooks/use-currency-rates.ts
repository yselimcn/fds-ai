'use client'
import { useEffect, useState } from 'react'
import type { CurrencyCode } from '@/lib/currency'

export type ExchangeRate = {
    purchase: number
    sale: number
}

export type CurrencyApiRate = {
    CurrencyCode: CurrencyCode
    PurchaseRate: string
    SaleRate: string
}

export type CurrencyApiResponse = {
    Data: {
        Currency: CurrencyApiRate[]
    }
    Date: string
}

type CurrencyRateState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: ExchangeRate }
    | { status: 'error'; error: Error }

export const useCurrencyRates = (currencyCode: CurrencyCode | null) => {
    const [state, setState] = useState<CurrencyRateState>({ status: 'idle' })

    useEffect(() => {
        const fetchRates = async () => {
            if (!currencyCode) {
                setState({ status: 'success', data: { purchase: 0, sale: 0 } })
                return
            }

            setState({ status: 'loading' })
            try {
                const res = await fetch('/api/currency-rates', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                if (!res.ok) throw new Error('Failed to fetch currency rates')
                const data: CurrencyApiResponse = await res.json()

                const rate = data.Data.Currency.find(
                    (c) => c.CurrencyCode === currencyCode,
                )

                if (rate) {
                    const parsed = {
                        purchase: parseFloat(rate.PurchaseRate),
                        sale: parseFloat(rate.SaleRate),
                    }
                    setState({ status: 'success', data: parsed })
                    return
                }
                throw new Error('Rate not found for selected currency')
            } catch (error) {
                setState({
                    status: 'error',
                    error:
                        error instanceof Error
                            ? error
                            : new Error('An unknown error occurred'),
                })
            }
        }

        fetchRates()
    }, [currencyCode])

    return state
}
