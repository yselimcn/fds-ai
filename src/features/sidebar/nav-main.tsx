'use client'

import * as React from 'react'
import { ChevronRight, type LucideIcon } from 'lucide-react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const { state, isMobile } = useSidebar()
    const [openTitle, setOpenTitle] = React.useState<string | null>(() => {
        const initiallyOpen = items.find((i) => i.isActive)
        return initiallyOpen ? initiallyOpen.title : null
    })
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) =>
                    !isMobile &&
                    state === 'collapsed' &&
                    item.items &&
                    item.items.length > 0 ? (
                        <SidebarMenuItem key={item.title}>
                            <HoverCard openDelay={0} closeDelay={0}>
                                <HoverCardTrigger asChild>
                                    <SidebarMenuButton>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </HoverCardTrigger>
                                <HoverCardContent
                                    side="right"
                                    align="start"
                                    sideOffset={4}
                                    className="relative w-56 p-1"
                                >
                                    <div className="absolute top-0 -left-[4px] h-full w-2"></div>
                                    <ul className="flex flex-col gap-1">
                                        {item.items.map((subItem) => (
                                            <li key={subItem.title}>
                                                <a
                                                    href={subItem.url}
                                                    className="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-2 py-1.5 text-sm"
                                                >
                                                    <span>{subItem.title}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </HoverCardContent>
                            </HoverCard>
                        </SidebarMenuItem>
                    ) : (
                        <Collapsible
                            key={item.title}
                            asChild
                            open={openTitle === item.title}
                            onOpenChange={(isOpen) =>
                                setOpenTitle(isOpen ? item.title : null)
                            }
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem
                                                key={subItem.title}
                                            >
                                                <SidebarMenuSubButton asChild>
                                                    <a href={subItem.url}>
                                                        <span>
                                                            {subItem.title}
                                                        </span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}
