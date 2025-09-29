'use client'

/**
 * @file EmailInput Component
 * @description A fully self-contained email input with built-in validation and texts.
 * It's designed to work seamlessly with `react-hook-form` and `zod`.
 *
 * @features
 * - Easy integration with `react-hook-form`.
 * - Built-in validation logic via the `emailSchema` factory.
 * - Visual feedback for validation states (valid, error).
 * - All user-facing text is sourced from the i18n dictionary.
 *
 * @example
 * // 1. Define your form schema using the `emailSchema` factory
 * import { z } from 'zod'
 * import { emailSchema } from './email-input'
 *
 * const FormSchema = z.object({
 *   // For a required email
 *   workEmail: emailSchema({ required: true }),
 *   // For an optional email (default)
 *   personalEmail: emailSchema(),
 * });
 *
 * // 2. Use the EmailInput in your form
 * <EmailInput
 *   control={form.control}
 *   name="workEmail"
 *   label="Work Email"
 *   description="Your primary contact email."
 * />
 */

import * as React from 'react'
import { z } from 'zod'
import { Check, TriangleAlert } from 'lucide-react'

import { Input, type InputProps } from '@/components/ui/input'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { getClientDictionary } from '@/lib/dictionary'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

// Get dictionary texts for email input
const dictionary = getClientDictionary()
const emailTexts = dictionary.component.email_input

// Create email validation schema with built-in messages

/**
 * Creates a Zod schema for email validation.
 *
 * @param options - Configuration for the schema.
 * @param {boolean} [options.required=false] - If true, the email is required.
 * @returns A Zod schema for email validation.
 */
export const emailSchema = (options?: { required?: boolean }) => {
    const isRequired = options?.required ?? false
    let schema = z.string()

    if (isRequired) {
        schema = schema.min(1, emailTexts.error.required)
    }

    schema = schema.email(emailTexts.error.invalid)

    if (!isRequired) {
        return schema.optional().or(z.literal(''))
    }

    return schema
}

interface EmailInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<InputProps, 'type' | 'name' | 'placeholder'> {
    control: Control<TFieldValues>
    name: TName
    label?: string
    description?: string
}

export function EmailInput<
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
}: EmailInputProps<TFieldValues, TName>) {
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
                                <Input
                                    type="email"
                                    placeholder={emailTexts.placeholder}
                                    className={cn(
                                        'pr-10', // Add padding for the icon
                                        className,
                                    )}
                                    disabled={disabled}
                                    required={required}
                                    autoComplete="email"
                                    aria-invalid={fieldState.invalid}
                                    aria-describedby={
                                        fieldState.invalid
                                            ? `${name}-error`
                                            : undefined
                                    }
                                    {...field}
                                    {...props}
                                />
                                {/* Validation status icons */}
                                {hasError && (
                                    <TriangleAlert
                                        className="text-destructive pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
                                        aria-hidden="true"
                                    />
                                )}
                                {isValid && (
                                    <Check
                                        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-green-600"
                                        aria-hidden="true"
                                    />
                                )}
                            </div>
                        </FormControl>
                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}
                        <FormMessage id={`${name}-error`} />
                    </FormItem>
                )
            }}
        />
    )
}
