'use client'
import { useState } from 'react'
import Link from 'next/link'
import { z } from 'zod'
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
import { Form } from './ui/form'
import {
    EmailInput,
    emailSchema,
    PasswordInput,
    passwordSchema,
    PhoneInput,
    phoneSchema,
} from './customized'
import { useZodForm } from '@/hooks/use-zod-form'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import {
    BadgeCheckIcon,
    Circle,
    CircleHelpIcon,
    CircleIcon,
    CircleCheckIcon,
} from 'lucide-react'
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
import { Checkbox } from './ui/checkbox'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuLink,
} from './ui/navigation-menu'
import { ListItem } from './ui/list-item'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination'
import { Progress } from './ui/progress'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import { Separator } from './ui/separator'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet'
import { Skeleton } from './ui/skeleton'
import { toast } from 'sonner'
import { Switch } from './ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { Textarea } from './ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { DatePicker } from './ui/date-picker'
import { DateRangePicker } from './ui/date-range-picker'
import { CurrencySection } from './customized/currency'

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description:
            'For sighted users to preview content available behind a link.',
    },
    {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
    },
    {
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description:
            'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
]

// Combined form schema using both EmailInput and PasswordInput validations
const LoginFormSchema = z.object({
    email: emailSchema({ required: true }),
    phone: phoneSchema({ required: true }),
    password: passwordSchema(),
})

export default function Components() {
    const [date, setDate] = useState<Date | undefined>(undefined)

    const tabsWithBadges = [
        {
            name: 'Account',
            value: 'account',
            content: 'Account settings will be here.',
        },
        {
            name: 'Notifications',
            value: 'notifications',
            content: 'Notification settings will be here.',
            count: 3,
        },
        {
            name: 'Appearance',
            value: 'appearance',
            content: 'Appearance settings will be here.',
        },
        {
            name: 'Support',
            value: 'support',
            content: 'Support information will be here.',
            count: 9,
        },
    ]

    // Combined login form using useZodForm
    const loginForm = useZodForm(LoginFormSchema, {
        defaultValues: {
            email: '',
            password: '',
            phone: '',
        },
    })

    const onLoginSubmit = () => {
        toast(`Form submitted`)
        loginForm.reset()
    }
    return (
        <div className="mx-auto flex max-w-screen-md flex-col gap-4">
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
            {/* TODO: Avatar */}
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Avatar</h1>
                <div className="flex w-full flex-wrap gap-2">
                    <Avatar>
                        <AvatarImage
                            src="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="@itsacat"
                        />
                        <AvatarFallback>
                            <Circle size="16" />
                        </AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>
                            <Circle size="16" />
                        </AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex w-full flex-wrap gap-2">
                    <Avatar className="rounded-md">
                        <AvatarImage
                            src="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="@itsacat"
                        />
                        <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <Avatar className="rounded-md">
                        <AvatarFallback>
                            <Circle size="16" />
                        </AvatarFallback>
                    </Avatar>
                    <Avatar className="rounded-md">
                        <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                </div>
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
                        <Button variant="default" size="sm" isIcon>
                            <Circle size="16" />
                        </Button>
                        <Button variant="default" size="default" isIcon>
                            <Circle size="16" />
                        </Button>
                        <Button variant="default" size="lg" isIcon>
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
                        <Button variant="destructiveOutline">
                            Destructive Outline
                        </Button>
                    </div>
                </div>
                <div className="w-min-content flex flex-col gap-4">
                    <Label>With Icons</Label>
                    <div className="w-min-content flex flex-row gap-4">
                        <Button variant="default">
                            Default
                            <Circle size="16" />
                        </Button>
                        <Button variant="outline">
                            <Circle size="16" />
                            Outline
                        </Button>
                    </div>
                </div>
                <div className="w-min-content flex flex-col gap-4">
                    <Label>Icon</Label>
                    <div className="w-min-content flex flex-row gap-4">
                        <Button variant="default" isIcon>
                            <Circle size="16" />
                        </Button>
                        <Button variant="outline" isIcon>
                            <Circle size="16" />
                        </Button>
                        <Button variant="secondary" isIcon>
                            <Circle size="16" />
                        </Button>
                        <Button variant="ghost" isIcon>
                            <Circle size="16" />
                        </Button>
                        <Button variant="destructive" isIcon>
                            <Circle size="16" />
                        </Button>
                        <Button variant="destructiveOutline" isIcon>
                            <Circle size="16" />
                        </Button>
                    </div>
                </div>
                <div className="w-min-content flex flex-col gap-4">
                    <Label>States</Label>
                    <div className="w-min-content flex flex-row gap-4">
                        <Button variant="default" disabled>
                            Disabled
                        </Button>
                        <Button variant="outline" isIcon disabled>
                            <Circle size="16" />
                        </Button>
                    </div>
                </div>
            </section>
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Calendar</h1>
                <div className="w-min-content flex flex-row gap-4">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        captionLayout="dropdown"
                        showOutsideDays={false}
                    />
                    <Calendar
                        mode="range"
                        selected={{ from: date, to: date }}
                        captionLayout="dropdown"
                        showOutsideDays={false}
                    />
                </div>
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
            <section className="space-y-4 border-b pb-4">
                <h1 className="text-md font-bold">Checkbox</h1>
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">
                            Accept terms and conditions
                        </Label>
                    </div>
                    <div className="flex items-start gap-3">
                        <Checkbox id="terms-2" defaultChecked />
                        <div className="grid gap-2">
                            <Label htmlFor="terms-2">
                                Accept terms and conditions
                            </Label>
                            <p className="text-muted-foreground text-sm">
                                By clicking this checkbox, you agree to the
                                terms and conditions.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Checkbox id="toggle" disabled />
                        <Label htmlFor="toggle">Enable notifications</Label>
                    </div>
                    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                        <Checkbox
                            id="toggle-2"
                            defaultChecked
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
                        <div className="grid gap-1.5 font-normal">
                            <p className="text-sm leading-none font-medium">
                                Enable notifications
                            </p>
                            <p className="text-muted-foreground text-sm">
                                You can enable or disable notifications at any
                                time.
                            </p>
                        </div>
                    </Label>
                </div>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Radio Group</h1>
                <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2">Comfortable</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="compact" id="r3" />
                        <Label htmlFor="r3">Compact</Label>
                    </div>
                </RadioGroup>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Hover Card</h1>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant="link" className="w-fit">
                            @nextjs
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="flex justify-between gap-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/vercel.png" />
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">
                                    @nextjs
                                </h4>
                                <p className="text-sm">
                                    The React Framework – created and maintained
                                    by @vercel.
                                </p>
                                <div className="text-muted-foreground text-xs">
                                    Joined December 2021
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
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
                </div>
                <div className="w-min-content flex flex-row gap-4">
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
                <div className="w-min-content flex flex-row gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Date Picker</Label>
                        <DatePicker />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Date Range Picker</Label>
                        <DateRangePicker />
                    </div>
                </div>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Input OTP</h1>
                <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Select</h1>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Currency Section</h1>
                <CurrencySection />
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Textarea</h1>
                <Textarea />
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">
                    Login Form (Email & Password Customized Inputs)
                </h1>
                <div className="w-full max-w-md">
                    <Form {...loginForm}>
                        <form
                            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                            className="space-y-4"
                        >
                            <EmailInput
                                control={loginForm.control}
                                name="email"
                            />
                            <PhoneInput
                                control={loginForm.control}
                                international
                                defaultCountry="TR"
                                name="phone"
                            />
                            <PasswordInput
                                control={loginForm.control}
                                name="password"
                                showStrengthIndicator={true}
                            />
                            <Button type="submit" className="w-full">
                                Giriş Yap
                            </Button>
                        </form>
                    </Form>
                </div>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Navigation Menu</h1>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="mt-4 mb-2 text-lg font-medium">
                                                    shadcn/ui
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-tight">
                                                    Beautifully designed
                                                    components built with
                                                    Tailwind CSS.
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/docs" title="Introduction">
                                        Re-usable components built using Radix
                                        UI and Tailwind CSS.
                                    </ListItem>
                                    <ListItem
                                        href="/docs/installation"
                                        title="Installation"
                                    >
                                        How to install dependencies and
                                        structure your app.
                                    </ListItem>
                                    <ListItem
                                        href="/docs/primitives/typography"
                                        title="Typography"
                                    >
                                        Styles for headings, paragraphs,
                                        lists...etc
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Components
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/docs">Docs</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>List</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[300px] gap-4">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="#">
                                                <div className="font-medium">
                                                    Components
                                                </div>
                                                <div className="text-muted-foreground">
                                                    Browse all components in the
                                                    library.
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link href="#">
                                                <div className="font-medium">
                                                    Documentation
                                                </div>
                                                <div className="text-muted-foreground">
                                                    Learn how to use the
                                                    library.
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link href="#">
                                                <div className="font-medium">
                                                    Blog
                                                </div>
                                                <div className="text-muted-foreground">
                                                    Read our latest blog posts.
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Simple
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[200px] gap-4">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="#">Components</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link href="#">Documentation</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link href="#">Blocks</Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                With Icon
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[200px] gap-4">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="#"
                                                className="flex-row items-center gap-2"
                                            >
                                                <CircleHelpIcon />
                                                Backlog
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="#"
                                                className="flex-row items-center gap-2"
                                            >
                                                <CircleIcon />
                                                To Do
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="#"
                                                className="flex-row items-center gap-2"
                                            >
                                                <CircleCheckIcon />
                                                Done
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Pagination</h1>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Progress</h1>
                <Progress value={50} />
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Separator</h1>
                <div>
                    <div className="space-y-1">
                        <h4 className="text-sm leading-none font-medium">
                            Radix Primitives
                        </h4>
                        <p className="text-muted-foreground text-sm">
                            An open-source UI component library.
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <div>Blog</div>
                        <Separator orientation="vertical" />
                        <div>Docs</div>
                        <Separator orientation="vertical" />
                        <div>Source</div>
                    </div>
                </div>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold"> Sheet</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Open</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save
                                when you&apos;re done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-demo-name">Name</Label>
                                <Input
                                    id="sheet-demo-name"
                                    defaultValue="Pedro Duarte"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-demo-username">
                                    Username
                                </Label>
                                <Input
                                    id="sheet-demo-username"
                                    defaultValue="@peduarte"
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                            <SheetClose asChild>
                                <Button variant="outline">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold"> Skeleton</h1>
                <Skeleton className="h-20 w-40" />
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold"> Sonner</h1>
                <Button
                    variant="outline"
                    onClick={() =>
                        toast('Event has been created', {
                            description: 'Sunday, December 03, 2023 at 9:00 AM',
                            action: {
                                label: 'Undo',
                                onClick: () => console.log('Undo'),
                            },
                        })
                    }
                >
                    Show Toast
                </Button>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold"> Switch</h1>
                <Switch />
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Tabs</h1>
                <Tabs defaultValue={tabsWithBadges[0].value}>
                    <TabsList>
                        {tabsWithBadges.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value}>
                                {tab.name}
                                {!!tab.count && (
                                    <Badge
                                        variant="secondary"
                                        className="ml-2 rounded-full px-1.5 py-0.5 text-xs"
                                    >
                                        {tab.count}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {tabsWithBadges.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value}>
                            <p className="text-muted-foreground text-sm">
                                {tab.content}
                            </p>
                        </TabsContent>
                    ))}
                </Tabs>
            </section>
            <section className="w-min-content flex flex-col gap-4">
                <h1 className="text-md font-bold">Tooltip</h1>
                <Tooltip>
                    <TooltipTrigger>Hover</TooltipTrigger>
                    <TooltipContent side="top">Add to library</TooltipContent>
                </Tooltip>
            </section>
        </div>
    )
}
