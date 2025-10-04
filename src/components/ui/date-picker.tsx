'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useDictionary } from '@/providers/dictionary-provider'

const DATE_FORMAT = 'd MMMM yyyy'

export function DatePicker() {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date>()
    const dict = useDictionary()

    const formattedDate = date
        ? format(date, DATE_FORMAT, { locale: tr })
        : dict.component.date_picker.select_date

    const handleSelect = React.useCallback((selectedDate: Date | undefined) => {
        setDate(selectedDate)
        setOpen(false)
    }, [])

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="min-w-50 justify-between font-normal"
                    >
                        {formattedDate}
                        <CalendarIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                >
                    <Calendar
                        locale={tr}
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={handleSelect}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
