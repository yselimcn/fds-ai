import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                outline:
                    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                link: 'text-primary underline-offset-4 hover:underline',
                destructive:
                    'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                destructiveOutline:
                    'bg-background text-destructive border border-destructive shadow-xs hover:bg-destructive/90 hover:text-white focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 focus-visible:border-destructive dark:bg-destructive/60',
            },
            size: {
                sm: 'h-8',
                default: 'h-10',
                lg: 'h-12',
            },
            isIcon: {
                true: 'p-0 gap-0',
                false: '',
            },
        },
        compoundVariants: [
            // Icon button sizes - override height with size for square buttons
            {
                isIcon: true,
                size: 'sm',
                class: 'size-8',
            },
            {
                isIcon: true,
                size: 'default',
                class: 'size-10',
            },
            {
                isIcon: true,
                size: 'lg',
                class: 'size-12',
            },
        ],
        defaultVariants: {
            variant: 'default',
            size: 'default',
            isIcon: false,
        },
    },
)

function Button({
    className,
    variant,
    size,
    isIcon = false,
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
            className={cn(buttonVariants({ variant, size, isIcon, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
