'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { PlusIcon, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { FormattedInput } from '@/components/customized/input-formatted'
import { useCurrencyRates, ExchangeRate } from '@/hooks/use-currency-rates'
import { useDictionary } from '@/providers/dictionary-provider'
import { CURRENCY_DATA } from '@/lib/currency'

interface CurrencySectionProps {
    disabled?: boolean
}

// Using shared CURRENCY_DATA from '@/lib/currency' to avoid duplication

export const CurrencySection: React.FC<CurrencySectionProps> = ({
    disabled = false,
}) => {
    const dict = useDictionary()
    const currencyDict = dict.component.currency

    const CURRENCIES = useMemo(
        () =>
            CURRENCY_DATA.map((c) => ({
                ...c,
                label: currencyDict.currencies[c.labelKey],
            })),
        [currencyDict.currencies],
    )

    const [showCurrencySection, setShowCurrencySection] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState(1)

    const selectedCurrencyInfo = CURRENCIES.find(
        (c) => c.id === selectedCurrency,
    )

    const currencyRateState = useCurrencyRates(
        selectedCurrencyInfo?.code ?? null,
    )

    const toggleCurrencySection = () => {
        if (showCurrencySection) {
            setSelectedCurrency(1) // Reset to default when closing
        }
        setShowCurrencySection((prev) => !prev)
    }

    const handleCurrencyChange = (value: string) => {
        setSelectedCurrency(Number(value))
    }

    const [exchangeRateType, setExchangeRateType] = useState<
        'sale' | 'purchase'
    >('sale')

    const [manualExchangeRate, setManualExchangeRate] = useState<ExchangeRate>({
        purchase: 0,
        sale: 0,
    })
    const apiRateRef = React.useRef<ExchangeRate | null>(null)

    useEffect(() => {
        if (currencyRateState.status === 'success') {
            setManualExchangeRate(currencyRateState.data)
            apiRateRef.current = currencyRateState.data
        }
    }, [currencyRateState])

    const exchangeRate =
        currencyRateState.status === 'success'
            ? manualExchangeRate
            : { purchase: 0, sale: 0 }
    const isLoading = currencyRateState.status === 'loading'

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-1 flex-row gap-4">
                {!showCurrencySection && (
                    <div className="col-span-5 col-start-3 flex gap-4">
                        <Button
                            variant="outline"
                            onClick={toggleCurrencySection}
                            type="button"
                            disabled={disabled}
                        >
                            <PlusIcon size={16} className="mr-2" />
                            {currencyDict.change_currency}
                        </Button>
                    </div>
                )}

                {showCurrencySection && (
                    <>
                        <div className="col-span-2">
                            <Select
                                value={selectedCurrency.toString()}
                                onValueChange={handleCurrencyChange}
                                disabled={disabled}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {CURRENCIES.find(
                                            (c) => c.id === selectedCurrency,
                                        )?.label || currencyDict.currencies.try}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {CURRENCIES.map((currency) => (
                                        <SelectItem
                                            key={currency.id}
                                            value={currency.id.toString()}
                                        >
                                            {currency.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {selectedCurrency !== 1 && (
                            <>
                                <div className="col-span-2 flex-1">
                                    <FormattedInput
                                        value={
                                            exchangeRateType === 'sale'
                                                ? exchangeRate.sale
                                                : exchangeRate.purchase
                                        }
                                        onChange={(val) =>
                                            setManualExchangeRate((prev) =>
                                                exchangeRateType === 'sale'
                                                    ? { ...prev, sale: val }
                                                    : {
                                                          ...prev,
                                                          purchase: val,
                                                      },
                                            )
                                        }
                                        decimalLimit={4}
                                        isCurrency
                                        selectedCurrencySymbol={
                                            selectedCurrencyInfo?.symbol
                                        }
                                        showExchangeRateType
                                        exchangeRateType={
                                            exchangeRateType === 'sale'
                                                ? currencyDict.sale
                                                : currencyDict.purchase
                                        }
                                        onExchangeRateTypeChange={(type) =>
                                            setExchangeRateType(
                                                type === currencyDict.sale
                                                    ? 'sale'
                                                    : 'purchase',
                                            )
                                        }
                                        disabled={isLoading || disabled}
                                        showReset={
                                            apiRateRef.current !== null &&
                                            (apiRateRef.current.purchase !==
                                                exchangeRate.purchase ||
                                                apiRateRef.current.sale !==
                                                    exchangeRate.sale)
                                        }
                                        onReset={() =>
                                            apiRateRef.current &&
                                            setManualExchangeRate(
                                                apiRateRef.current,
                                            )
                                        }
                                    />
                                </div>
                            </>
                        )}
                        <div className="col-span-1 flex justify-start">
                            <Button
                                isIcon
                                variant="outline"
                                onClick={toggleCurrencySection}
                                type="button"
                                disabled={disabled}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
