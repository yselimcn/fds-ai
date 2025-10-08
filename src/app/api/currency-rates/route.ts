import { NextResponse } from 'next/server'

// This route handles GET /api/currency-rates
// Returns TRY-based exchange rates for USD, EUR, GBP with light caching.

interface RatesResp {
    base: string
    date: string
    rates: Record<string, number>
}

// Public FX API base URL (no key required)
const EXCHANGE_API_URL = 'https://api.exchangerate.host/latest'

// Optional: control ISR-like caching for this route handler
export const revalidate = 300

export async function GET() {
    try {
        let data: RatesResp | null = null

        // Primary source
        const primaryResp = await fetch(
            `${EXCHANGE_API_URL}?base=TRY&symbols=USD,EUR,GBP`,
            { next: { revalidate: 300 } },
        )
        if (primaryResp.ok) {
            data = (await primaryResp.json()) as RatesResp
        }

        // Fallback source
        if (!data || !data.rates) {
            const fallbackResp = await fetch(
                'https://open.er-api.com/v6/latest/TRY',
                { next: { revalidate: 300 } },
            )
            if (fallbackResp.ok) {
                data = (await fallbackResp.json()) as RatesResp
            }
        }

        if (!data || !data.rates) {
            return NextResponse.json(
                { message: 'Unable to retrieve currency rates' },
                { status: 502 },
            )
        }

        // Convert to TRY per foreign unit and add minimal bank spread
        const buildEntry = (code: 'USD' | 'EUR' | 'GBP') => {
            const againstTry = data!.rates[code]
            const tryPerForeign = againstTry ? 1 / againstTry : null
            return tryPerForeign
                ? {
                      CurrencyCode: code,
                      PurchaseRate: (tryPerForeign * 0.998).toFixed(4),
                      SaleRate: (tryPerForeign * 1.002).toFixed(4),
                  }
                : null
        }

        const currencyArr = [
            buildEntry('USD'),
            buildEntry('EUR'),
            buildEntry('GBP'),
        ].filter(Boolean)

        const payload = {
            Data: {
                Currency: currencyArr,
            },
            Date: data.date,
        }

        return NextResponse.json(payload, { status: 200 })
    } catch {
        return NextResponse.json(
            { message: 'Error fetching currency rates' },
            { status: 500 },
        )
    }
}
