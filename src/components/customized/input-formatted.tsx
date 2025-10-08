import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RotateCcw } from 'lucide-react'

interface FormattedInputProps {
    value: number
    onChange: (value: number) => void
    className?: string
    isCurrency?: boolean
    isPercentage?: boolean
    showModeToggle?: boolean
    onModeChange?: (mode: 'currency' | 'percentage') => void
    mode?: 'currency' | 'percentage'
    decimalLimit?: number
    disabled?: boolean
    selectedCurrencySymbol?: string
    showExchangeRateType?: boolean
    exchangeRateType?: 'Alış' | 'Satış'
    onExchangeRateTypeChange?: (type: 'Alış' | 'Satış') => void
    showDiscountModeToggle?: boolean
    discountMode?: 'currency' | 'percentage'
    onDiscountModeChange?: (mode: 'currency' | 'percentage') => void
    showReset?: boolean
    onReset?: () => void
}

export const FormattedInput: React.FC<FormattedInputProps> = ({
    value,
    onChange,
    className,
    isCurrency = false,
    decimalLimit = 4,
    disabled = false,
    selectedCurrencySymbol,
    showExchangeRateType = false,
    exchangeRateType = 'Alış',
    onExchangeRateTypeChange,
    showDiscountModeToggle = false,
    discountMode = 'currency',
    onDiscountModeChange,
    showReset = false,
    onReset,
}) => {
    const [displayValue, setDisplayValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Helper function to format integer part with thousand separators
    const formatInteger = (intPart: string): string => {
        return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    // Function to format the number for display on blur
    const formatForDisplay = (val: number, userInput: string): string => {
        const [intPartInput, decPartInput] = userInput.split(',')
        const formattedInt = formatInteger(intPartInput)
        if (decPartInput !== undefined) {
            // User has provided decimal part
            const trimmedDec = decPartInput.slice(0, decimalLimit)
            return isCurrency
                ? `${formattedInt},${trimmedDec}`
                : `${formattedInt},${trimmedDec}`
        } else {
            // No decimal provided, pad with ",00"
            return isCurrency ? `${formattedInt},00` : `${formattedInt},00`
        }
    }

    // Initialize displayValue based on value and focus state
    useEffect(() => {
        if (!isFocused) {
            if (value === 0 && !isCurrency) {
                setDisplayValue('')
            } else if (value === 0 && isCurrency) {
                setDisplayValue('')
            } else {
                // Convert the numeric value back to string with comma as decimal separator
                const numericString = value.toString().replace('.', ',')
                setDisplayValue(formatForDisplay(value, numericString))
            }
        }
    }, [value, isCurrency, isFocused])

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value

        // Allow only digits and comma
        newValue = newValue.replace(/[^\d,]/g, '')

        // Prevent multiple commas
        const commaCount = (newValue.match(/,/g) || []).length
        if (commaCount > 1) {
            // Keep only the first comma
            const firstCommaIndex = newValue.indexOf(',')
            newValue = `${newValue.slice(0, firstCommaIndex + 1)}${newValue
                .slice(firstCommaIndex + 1)
                .replace(/,/g, '')}`
        }

        // Split into integer and decimal parts
        const [intPart, decPart = ''] = newValue.split(',')

        // Limit decimal places during input
        if (decPart.length > decimalLimit) {
            newValue = `${intPart},${decPart.slice(0, decimalLimit)}`
        }

        setDisplayValue(newValue)

        // Convert to numeric value
        const numericValue =
            parseFloat(newValue.replace(/\./g, '').replace(',', '.')) || 0
        onChange(numericValue)
    }

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)

        if (displayValue === '') {
            setDisplayValue('')
            return
        }

        let formattedValue = ''

        if (displayValue.includes(',')) {
            const [intPartInput, decPartInput] = displayValue.split(',')
            const formattedInt = formatInteger(intPartInput)
            const trimmedDec = decPartInput.slice(0, decimalLimit)
            formattedValue = isCurrency
                ? `${formattedInt},${trimmedDec}`
                : `${formattedInt},${trimmedDec}`
        } else {
            const formattedInt = formatInteger(displayValue)
            formattedValue = isCurrency
                ? `${formattedInt},00`
                : `${formattedInt},00`
        }

        setDisplayValue(formattedValue)
    }

    return (
        <div className={`relative flex ${className}`}>
            <Input
                ref={inputRef}
                value={displayValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="0,00"
                disabled={disabled}
                className={cn(
                    showExchangeRateType
                        ? 'pr-32'
                        : isCurrency ||
                            showDiscountModeToggle ||
                            discountMode === 'percentage'
                          ? 'pr-16'
                          : 'pr-3',
                    className,
                )}
            />
            <div className="absolute top-0 right-0 bottom-0 flex items-center">
                {showExchangeRateType ? (
                    <div className="flex items-center space-x-2 pr-2">
                        <span className="text-muted-foreground whitespace-nowrap">
                            ₺ / {selectedCurrencySymbol}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                onExchangeRateTypeChange?.(
                                    exchangeRateType === 'Alış'
                                        ? 'Satış'
                                        : 'Alış',
                                )
                            }
                            className="text-muted-foreground hover:text-foreground px-2 text-sm"
                        >
                            {exchangeRateType}
                        </Button>
                        {showReset && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onReset}
                                className="text-muted-foreground hover:text-foreground h-8 w-8"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ) : isCurrency ? (
                    // Regular price view (shows just ₺)
                    <span className="text-muted-foreground mr-3">₺</span>
                ) : discountMode === 'percentage' ? (
                    // Show % for percentage mode, even without toggle
                    <span className="text-muted-foreground mr-3">%</span>
                ) : null}

                {/* Discount mode toggle */}
                {showDiscountModeToggle && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-1 w-8 self-center px-2 text-sm"
                        onClick={() => {
                            onDiscountModeChange?.(
                                discountMode === 'currency'
                                    ? 'percentage'
                                    : 'currency',
                            )
                        }}
                    >
                        {discountMode === 'currency' ? '₺' : '%'}
                    </Button>
                )}
            </div>
        </div>
    )
}
