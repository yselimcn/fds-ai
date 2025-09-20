'use client'

import * as React from 'react'
import { z } from 'zod'
import { Eye, EyeOff, Check } from 'lucide-react'

import { Input, type InputProps } from '@/components/ui/input'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getClientDictionary } from '@/lib/dictionary'
import { useWatch } from 'react-hook-form'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

// Get dictionary texts for password input
const dictionary = getClientDictionary()
const passwordTexts = dictionary.component.password_input

// Password criteria interface
interface PasswordCriterion {
    label: string
    test: (password: string) => boolean
}

// Default minimum password length
const DEFAULT_MIN_LENGTH = 8

// Create password criteria using dictionary texts
function createPasswordCriteria(
    minLength: number = DEFAULT_MIN_LENGTH,
): PasswordCriterion[] {
    return [
        {
            label: passwordTexts.criteria.uppercase,
            test: (p) => /[A-Z]/.test(p),
        },
        {
            label: passwordTexts.criteria.lowercase,
            test: (p) => /[a-z]/.test(p),
        },
        {
            label: passwordTexts.criteria.number,
            test: (p) => /\d/.test(p),
        },
        {
            label: passwordTexts.criteria.special,
            test: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p),
        },
        {
            label: passwordTexts.criteria.minLength.replace(
                '{min}',
                minLength.toString(),
            ),
            test: (p) => p.length >= minLength,
        },
    ]
}

// Create password validation schema with built-in messages
export function createPasswordSchema(minLength: number = DEFAULT_MIN_LENGTH) {
    return z
        .string()
        .min(1, passwordTexts.error.required)
        .min(
            minLength,
            passwordTexts.error.minLength.replace(
                '{min}',
                minLength.toString(),
            ),
        )
        .superRefine((val, ctx) => {
            const criteria = createPasswordCriteria(minLength)
            criteria.forEach(({ label, test }) => {
                if (!test(val)) {
                    ctx.addIssue({ code: 'custom', message: label })
                }
            })
        })
}

// Export default password schema with 8 character minimum
export const passwordSchema = createPasswordSchema(DEFAULT_MIN_LENGTH)

interface PasswordInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<InputProps, 'type' | 'name' | 'placeholder'> {
    control: Control<TFieldValues>
    name: TName
    label?: string
    description?: string
    showStrengthIndicator?: boolean
    minLength?: number
}

/**
 * PasswordInput Component
 *
 * A fully self-contained password input with built-in validation, strength indicator, and visibility toggle.
 * No need to pass dictionary or validation - everything is handled internally.
 *
 * Features:
 * - Eye icon to show/hide password
 * - Password strength indicator (optional)
 * - Visual feedback for each criterion
 * - Progress bar showing strength
 * - All texts from dictionary
 *
 * Usage in parent form:
 * ```
 * // Use default schema (8 char minimum)
 * const FormSchema = z.object({
 *   password: passwordSchema,
 * })
 *
 * // Or create custom schema with different min length
 * const FormSchema = z.object({
 *   password: createPasswordSchema(12),
 * })
 *
 * // Use in form
 * <Form {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <PasswordInput
 *       control={form.control}
 *       name="password"
 *       showStrengthIndicator={true}
 *     />
 *     <Button type="submit">Submit</Button>
 *   </form>
 * </Form>
 * ```
 */
export function PasswordInput<
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
    showStrengthIndicator = true,
    minLength = DEFAULT_MIN_LENGTH,
    ...props
}: PasswordInputProps<TFieldValues, TName>) {
    const [showPassword, setShowPassword] = React.useState(false)
    const passwordValue = useWatch({ control, name }) as string | undefined
    const value = passwordValue ?? ''

    // Get password criteria for the specified min length
    const passwordCriteria = React.useMemo(
        () => createPasswordCriteria(minLength),
        [minLength],
    )

    // Calculate which criteria are passed
    const passedCriteria = passwordCriteria.map((c) => c.test(value))
    const passedCount = passedCriteria.filter(Boolean).length

    // Find current criterion to highlight
    const currentIndex = passedCriteria.findIndex((p) => !p)
    const currentCriterion =
        currentIndex !== -1
            ? passwordCriteria[currentIndex]
            : passwordCriteria[passwordCriteria.length - 1]

    // Calculate strength
    const strength = React.useMemo(() => {
        if (passedCount <= 2)
            return { label: passwordTexts.strength.weak, color: 'bg-red-500' }
        if (passedCount <= 4)
            return {
                label: passwordTexts.strength.medium,
                color: 'bg-yellow-500',
            }
        return { label: passwordTexts.strength.strong, color: 'bg-green-500' }
    }, [passedCount])

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder={passwordTexts.placeholder}
                                className={cn(
                                    'pr-10', // Add padding for the eye icon
                                    className,
                                )}
                                disabled={disabled}
                                required={required}
                                autoComplete="new-password"
                                aria-invalid={fieldState.invalid}
                                aria-describedby={
                                    fieldState.invalid
                                        ? `${name}-error`
                                        : undefined
                                }
                                {...field}
                                {...props}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={
                                    showPassword
                                        ? passwordTexts.hidePassword
                                        : passwordTexts.showPassword
                                }
                            >
                                {showPassword ? (
                                    <EyeOff className="text-muted-foreground h-4 w-4" />
                                ) : (
                                    <Eye className="text-muted-foreground h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </FormControl>

                    {/* Password strength indicator */}
                    {showStrengthIndicator && value && (
                        <>
                            <div className="mt-2 flex gap-1">
                                {passwordCriteria.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            'h-1 flex-1 rounded-full transition-all',
                                            idx < passedCount
                                                ? strength.color
                                                : 'bg-muted',
                                        )}
                                    />
                                ))}
                            </div>
                            <div className="bg-muted/50 mt-2 flex items-center justify-between gap-3 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={cn(
                                            'flex h-5 w-5 items-center justify-center rounded-full transition-colors',
                                            passedCriteria[currentIndex] ||
                                                currentIndex === -1
                                                ? 'bg-green-500 text-white'
                                                : 'bg-muted border-muted-foreground/20 border-2',
                                        )}
                                    >
                                        {(passedCriteria[currentIndex] ||
                                            currentIndex === -1) && (
                                            <Check className="h-3 w-3" />
                                        )}
                                    </div>
                                    <span
                                        className={cn(
                                            'text-sm transition-colors',
                                            passedCriteria[currentIndex] ||
                                                currentIndex === -1
                                                ? 'text-green-600'
                                                : 'text-foreground',
                                        )}
                                    >
                                        {currentCriterion.label}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-muted-foreground text-xs font-medium">
                                        {passedCount}/{passwordCriteria.length}
                                    </span>
                                    <span
                                        className={cn('text-xs font-medium', {
                                            'text-red-500':
                                                strength.label ===
                                                passwordTexts.strength.weak,
                                            'text-yellow-500':
                                                strength.label ===
                                                passwordTexts.strength.medium,
                                            'text-green-500':
                                                strength.label ===
                                                passwordTexts.strength.strong,
                                        })}
                                    >
                                        {strength.label}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}

                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage id={`${name}-error`} />
                </FormItem>
            )}
        />
    )
}
