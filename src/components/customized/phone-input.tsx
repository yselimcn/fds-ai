'use client'

/**
 * @file PhoneInput Component
 * @description A comprehensive phone number input component with country selector and validation.
 * It integrates `react-phone-number-input` with `shadcn/ui` components for a seamless experience
 * within `react-hook-form` and `zod`.
 *
 * @features
 * - Easy integration with `react-hook-form`.
 * - Built-in validation using `libphonenumber-js` via the `phoneSchema` factory.
 * - Interactive country selector with search functionality.
 * - Visual feedback for validation states (valid, error).
 * - All user-facing text is sourced from the i18n dictionary.
 *
 * @example
 * // 1. Define your form schema using the `phoneSchema` factory
 * import { z } from 'zod'
 * import { phoneSchema } from './phone-input'
 *
 * const FormSchema = z.object({
 *   // For a required phone number
 *   mobilePhone: phoneSchema({ required: true }),
 *   // For an optional phone number
 *   homePhone: phoneSchema({ required: false }),
 * });
 *
 * // 2. Use the PhoneInput in your form
 * <PhoneInput
 *   control={form.control}
 *   name="mobilePhone"
 *   label="Mobile Phone"
 *   description="We'll use this for verification."
 * />
 */

import * as React from 'react'
import { Check, CheckIcon, ChevronDown, TriangleAlert } from 'lucide-react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input, type InputProps } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getClientDictionary } from '@/lib/dictionary'
import { cn } from '@/lib/utils'

// Get dictionary texts for phone input
const dictionary = getClientDictionary()
const phoneTexts = dictionary.component.phone_input

/**
 * Creates a Zod schema for phone number validation.
 *
 * @param options - Configuration for the schema.
 * @param {boolean} [options.required=false] - If true, the phone number is required.
 * @returns A Zod schema for phone number validation.
 */
export const phoneSchema = (options?: { required?: boolean }) => {
    const isRequired = options?.required ?? false
    let schema = z.string()

    if (isRequired) {
        schema = schema.min(1, phoneTexts.error.required)
    }

    schema = schema.refine(isValidPhoneNumber, {
        message: phoneTexts.error.invalid,
    })

    if (!isRequired) {
        return schema.optional().or(z.literal(''))
    }

    return schema
}

type PhoneInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<InputProps, 'onChange' | 'value' | 'ref' | 'name'> &
    Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
        control: Control<TFieldValues>
        name: TName
        label?: string
        description?: string
        onChange?: (value: RPNInput.Value) => void
        required?: boolean
    }

function PhoneInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    label,
    description,
    className,
    disabled,
    required,
    ...props
}: PhoneInputProps<TFieldValues, TName>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                // Check if field has been touched and has a value
                const isTouched = fieldState.isTouched || fieldState.isDirty
                const hasValue = field.value && field.value.length > 0
                const isValid = hasValue && !fieldState.invalid && isTouched
                const hasError = fieldState.invalid && isTouched
                return (
                    <FormItem>
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <div className="relative">
                                <RPNInput.default
                                    ref={field.ref}
                                    name={field.name}
                                    onBlur={field.onBlur}
                                    className={cn('flex', className)}
                                    flagComponent={FlagComponent}
                                    countrySelectComponent={CountrySelect}
                                    inputComponent={InputComponent}
                                    placeholder={phoneTexts.placeholder}
                                    smartCaret={false}
                                    value={field.value || undefined}
                                    /**
                                     * Handles the onChange event.
                                     *
                                     * react-phone-number-input might trigger the onChange event as undefined
                                     * when a valid phone number is not entered. To prevent this,
                                     * the value is coerced to an empty string.
                                     *
                                     * @param {E164Number | undefined} value - The entered value
                                     */
                                    onChange={(value) =>
                                        field.onChange(
                                            value || ('' as RPNInput.Value),
                                        )
                                    }
                                    {...props}
                                    disabled={disabled}
                                    required={required}
                                />
                                {/* Validation status icons */}
                                {hasError && (
                                    <TriangleAlert
                                        className="text-destructive pointer-events-none absolute top-1/2 right-3 z-10 h-4 w-4 -translate-y-1/2"
                                        aria-hidden="true"
                                    />
                                )}
                                {isValid && (
                                    <Check
                                        className="pointer-events-none absolute top-1/2 right-3 z-10 h-4 w-4 -translate-y-1/2 text-green-600"
                                        aria-hidden="true"
                                    />
                                )}
                            </div>
                        </FormControl>
                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => (
        <Input
            className={cn('rounded-s-none rounded-e-lg', className)}
            variant="default"
            {...props}
            ref={ref}
        />
    ),
)
InputComponent.displayName = 'InputComponent'

type CountryEntry = { label: string; value: RPNInput.Country | undefined }

type CountrySelectProps = {
    disabled?: boolean
    value: RPNInput.Country
    options: CountryEntry[]
    onChange: (country: RPNInput.Country) => void
}

const CountrySelect = ({
    disabled,
    value: selectedCountry,
    options: countryList,
    onChange,
}: CountrySelectProps) => {
    const scrollAreaRef = React.useRef<HTMLDivElement>(null)
    const [searchValue, setSearchValue] = React.useState('')
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Popover
            open={isOpen}
            modal
            onOpenChange={(open) => {
                setIsOpen(open)
                if (open) setSearchValue('')
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="flex gap-1 rounded-s-lg rounded-e-none border-r-0 px-3 focus:z-10"
                    size="default"
                    disabled={disabled}
                >
                    <FlagComponent
                        country={selectedCountry}
                        countryName={selectedCountry}
                    />
                    <ChevronDown
                        className={cn(
                            '-mr-2 size-4 opacity-50',
                            disabled ? 'hidden' : 'opacity-100',
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                    <CommandInput
                        value={searchValue}
                        onValueChange={(value) => {
                            setSearchValue(value)
                            setTimeout(() => {
                                if (scrollAreaRef.current) {
                                    const viewportElement =
                                        scrollAreaRef.current.querySelector(
                                            '[data-radix-scroll-area-viewport]',
                                        )
                                    if (viewportElement) {
                                        viewportElement.scrollTop = 0
                                    }
                                }
                            }, 0)
                        }}
                        placeholder="Search country..."
                    />
                    <CommandList>
                        <ScrollArea ref={scrollAreaRef} className="h-72">
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                                {countryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                            onSelectComplete={() =>
                                                setIsOpen(false)
                                            }
                                        />
                                    ) : null,
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

interface CountrySelectOptionProps extends RPNInput.FlagProps {
    selectedCountry: RPNInput.Country
    onChange: (country: RPNInput.Country) => void
    onSelectComplete: () => void
}

const CountrySelectOption = ({
    country,
    countryName,
    selectedCountry,
    onChange,
    onSelectComplete,
}: CountrySelectOptionProps) => {
    const handleSelect = () => {
        onChange(country)
        onSelectComplete()
    }

    return (
        <CommandItem className="gap-2" onSelect={handleSelect}>
            <FlagComponent country={country} countryName={countryName} />
            <span className="flex-1 text-sm">{countryName}</span>
            <span className="text-foreground/50 text-sm">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
            <CheckIcon
                className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
            />
        </CommandItem>
    )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country]

    return (
        <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm [&_svg:not([class*='size-'])]:size-full">
            {Flag && <Flag title={countryName} />}
        </span>
    )
}

export { PhoneInput }
