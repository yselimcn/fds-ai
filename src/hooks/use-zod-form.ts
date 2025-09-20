import { useForm, type FieldValues, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'

/**
 * Generic React Hook Form wrapper with Zod validation.
 *
 * TL;DR on options?.mode ?? 'onTouched':
 * - We allow the user to override our default validation behavior if they want
 * - If they don't specify a mode, we use 'onTouched' (validate when user leaves field)
 * - If they don't specify reValidateMode, we use 'onChange' (re-validate on every keystroke after first validation)
 * - This pattern gives flexibility while maintaining good UX defaults
 *
 * Example:
 * ```tsx
 * import { z } from 'zod'
 *
 * const LoginSchema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8)
 * })
 *
 * const form = useZodForm(LoginSchema, {
 *   defaultValues: { email: '', password: '' }
 * })
 * ```
 */
export function useZodForm<TSchema extends z.ZodType<FieldValues>>(
    schema: TSchema,
    options?: Parameters<typeof useForm<z.infer<TSchema>>>[0],
) {
    // The zodResolver has a type mismatch between Zod v4 and @hookform/resolvers
    // We cast through unknown as the types are compatible at runtime
    const zodResolverTyped = zodResolver as (
        schema: z.ZodTypeAny,
    ) => Resolver<z.infer<TSchema>>

    return useForm<z.infer<TSchema>>({
        ...options,
        resolver: zodResolverTyped(schema),
        mode: options?.mode ?? 'onTouched',
        reValidateMode: options?.reValidateMode ?? 'onChange',
    })
}
