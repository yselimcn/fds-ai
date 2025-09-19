import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 rounded-md text-sm leading-1 font-medium tracking-wider cursor-pointer transition-all disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:shadow-[inset_0_0_0_1px_#e4e4e4] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:shadow-[inset_0_0_0_2px_#0f62fe,inset_0_0_0_3px_theme(colors.white)] shadow-[inset_0_0_0_1px_theme(colors.primary)]   aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
                destructive:
                    'bg-destructive text-white hover:bg-destructive-hover active:bg-destructive-active focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'bg-transparent text-secondary-foreground shadow-[inset_0_0_0_1px_theme(colors.secondary-foreground)] hover:bg-secondary-hover hover:text-white hover:shadow-[inset_0_0_0_1px_theme(colors.secondary-hover)] active:bg-secondary-active active:shadow-[inset_0_0_0_1px_theme(colors.secondary-active)] dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
                secondary:
                    'bg-secondary-foreground text-secondary hover:bg-secondary-hover active:bg-secondary-active',
                ghost: 'bg-transparent text-[var(--color-antrasit-gray-60)] hover:bg-[var(--color-cool-gray-10)] active:bg-[var(--color-cool-gray-20)] dark:hover:bg-accent/50',
                link: 'text-primary underline-offset-4 hover:underline',
                'destructive-outline':
                    'bg-transparent text-destructive shadow-[inset_0_0_0_1px_#da1e28] hover:bg-destructive-hover hover:text-white hover:shadow-[inset_0_0_0_1px_theme(colors.destructive-hover)] active:bg-destructive-active active:shadow-[inset_0_0_0_1px_theme(colors.destructive-active)] dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            },
            size: {
                default: 'h-10',
                sm: 'h-8',
                lg: 'h-12',
                icon: 'size-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : 'button'

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
