import { ArrowLeftToLineIcon, ArrowRightToLineIcon } from 'lucide-react'
import { getClientDictionary } from '@/lib/dictionary'
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import React from 'react'

export function NavigationTrigger({
    className,
    onClick,
    ...props
}: React.ComponentProps<typeof SidebarMenuButton>) {
    const { toggleSidebar, state, isMobile } = useSidebar()
    const dict = getClientDictionary()
    const button = (
        <SidebarMenuButton
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="default"
            size="default"
            className={cn(
                'group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:[&>span:last-child]:hidden!',
                className,
            )}
            onClick={(event) => {
                onClick?.(event)
                toggleSidebar()
            }}
            {...props}
        >
            {state === 'expanded' ? (
                <ArrowLeftToLineIcon />
            ) : (
                <ArrowRightToLineIcon />
            )}
            <span
                className={cn(
                    'w-full truncate text-left',
                    'group-data-[state=collapsed]/sidebar:sr-only',
                )}
            >
                {state === 'expanded'
                    ? dict.component.sidebar.hideMenu
                    : dict.component.sidebar.showMenu}
            </span>
        </SidebarMenuButton>
    )
    return (
        <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent
                side="right"
                align="center"
                hidden={state !== 'collapsed' || isMobile}
            >
                {state === 'expanded'
                    ? dict.component.sidebar.hideMenu
                    : dict.component.sidebar.showMenu}
            </TooltipContent>
        </Tooltip>
    )
}
