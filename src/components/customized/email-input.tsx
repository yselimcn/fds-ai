'use client'

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
export const emailSchema = z
    .string()
    .min(1, emailTexts.error.required)
    .email(emailTexts.error.invalid)

interface EmailInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<InputProps, 'type' | 'name' | 'placeholder'> {
    control: Control<TFieldValues>
    name: TName
    label?: string
    description?: string
}

/**
 * EmailInput Component
 *
 * A fully self-contained email input with built-in validation and texts.
 * Shows visual feedback with icons:
 * - TriangleAlert icon when there's a validation error
 * - Check icon when the email is valid
 *
 * No need to pass dictionary or validation - everything is handled internally.
 *
 * Works with forms that use useZodForm hook which handles:
 * - mode: 'onTouched' (validates on blur)
 * - reValidateMode: 'onChange' (removes errors on change)
 *
 * Usage in parent form:
 * ```
 * // Define schema using the exported emailSchema
 * const FormSchema = z.object({
 *   email: emailSchema,
 *   // other fields...
 * })
 *
 * // Use in form
 * <Form {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <EmailInput control={form.control} name="email" />
 *     <Button type="submit">Submit</Button>
 *   </form>
 * </Form>
 * ```
 */
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
