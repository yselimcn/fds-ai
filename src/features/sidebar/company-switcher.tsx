'use client'

import * as React from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import Image from 'next/image'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

export function CompanySwitcher({
    teams,
}: {
    teams: {
        name: string
    }[]
}) {
    const [activeTeam, setActiveTeam] = React.useState(teams[0])

    if (!activeTeam) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2 py-1">
                <div className="flex aspect-square size-9 items-center justify-center rounded-lg">
                    <Image
                        src="/parasut.svg"
                        alt="Paraşüt"
                        width={28}
                        height={28}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div className="grid truncate text-left text-sm leading-tight font-medium">
                                {activeTeam.name}
                            </div>
                            <ChevronDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="end"
                        side="bottom"
                    >
                        {teams.map((team, index) => (
                            <DropdownMenuItem
                                key={team.name}
                                onClick={() => setActiveTeam(team)}
                                className="gap-2 p-2"
                            >
                                {team.name}
                                <DropdownMenuShortcut>
                                    ⌘{index + 1}
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Plus className="size-4" />
                            </div>
                            <div className="text-muted-foreground font-medium">
                                Add team
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
