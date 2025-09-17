'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Alert } from './ui/alert'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { BadgeCheckIcon, Circle } from 'lucide-react'
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './ui/breadcrumb'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Calendar } from '@/components/ui/calendar'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card'

function Components() {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
        <div className="flex flex-col gap-4">
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Alert</h1>
                <Alert variant="default">Default</Alert>
                <Alert variant="destructive">Destructive</Alert>
            </section>
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Alert Dialog</h1>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">Show Dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </section>
            {/* TODO: Aspect Ratio */}
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Aspect Ratio</h1>
                <Avatar>
                    <AvatarImage src="https://avatar.iran.liara.run/public/10" />
                    <AvatarFallback>
                        <Circle size="16" />
                    </AvatarFallback>
                </Avatar>
            </section>
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Badge</h1>
                <div className="flex w-full flex-wrap gap-2">
                    <Badge>Badge</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                </div>
                <div className="flex w-full flex-wrap gap-2">
                    <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600"
                    >
                        <BadgeCheckIcon />
                        Verified
                    </Badge>
                    <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                        8
                    </Badge>
                    <Badge
                        className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                        variant="destructive"
                    >
                        99
                    </Badge>
                    <Badge
                        className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                        variant="outline"
                    >
                        20+
                    </Badge>
                </div>
            </section>
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Breadcrumb</h1>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1">
                                    <BreadcrumbEllipsis className="size-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem>
                                        Documentation
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Themes</DropdownMenuItem>
                                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/docs/components">Components</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Buttons</h1>
                <div className="w-min-content flex flex-col gap-4">
                    <Label>Sizes</Label>
                    <div className="w-min-content flex flex-row gap-4">
                        <Button variant="default" size="sm">
                            Small
                        </Button>
                        <Button variant="default" size="default">
                            Default
                        </Button>
                        <Button variant="default" size="lg">
                            Large
                        </Button>
                        <Button variant="default" size="icon">
                            <Circle size="16" />
                        </Button>
                    </div>
                </div>
                <div className="w-min-content flex flex-col gap-4">
                    <Label>Variants</Label>
                    <div className="w-min-content flex flex-row gap-4">
                        <Button variant="default">Default</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>
                </div>
                <div className="w-min-content flex flex-col gap-4">
                    <Label>Icon</Label>
                    <div className="w-min-content flex flex-row gap-4">
                        <Button variant="default" size="icon">
                            <Circle size="16" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Circle size="16" />
                        </Button>
                        <Button variant="secondary" size="icon">
                            <Circle size="16" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Circle size="16" />
                        </Button>
                        <Button variant="destructive" size="icon">
                            <Circle size="16" />
                        </Button>
                    </div>
                </div>
            </section>
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Calendar</h1>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow-sm"
                    captionLayout="dropdown"
                />
            </section>
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Card</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                        <CardAction>Card Action</CardAction>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </section>
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Chart</h1>
                <Link href="https://ui.shadcn.com/charts/area">
                    https://ui.shadcn.com/charts/area
                </Link>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">
                    Input <b>(WIP)</b>
                </h1>
                <div className="w-min-content flex flex-row gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Small Outline</Label>
                        <Input
                            variant="default"
                            size="sm"
                            placeholder="Placeholder text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Default</Label>
                        <Input
                            variant="default"
                            placeholder="Placeholder text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Large Default</Label>
                        <Input
                            variant="default"
                            size="lg"
                            placeholder="Placeholder text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Small Outline</Label>
                        <Input
                            variant="outline"
                            size="sm"
                            placeholder="Placeholder text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Default Outline</Label>
                        <Input
                            variant="outline"
                            placeholder="Placeholder text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Large Outline</Label>
                        <Input
                            variant="outline"
                            size="lg"
                            placeholder="Placeholder text"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Components
