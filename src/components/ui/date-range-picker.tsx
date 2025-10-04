'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { type DateRange } from 'react-day-picker'
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

const formatDate = (date: Date) => format(date, DATE_FORMAT, { locale: tr })

export function DateRangePicker() {
    const [range, setRange] = React.useState<DateRange>()
    const dict = useDictionary()

    const formattedDate = React.useMemo(() => {
        if (!range?.from) {
            return dict.component.date_picker.select_date_range
        }

        if (!range.to) {
            return formatDate(range.from)
        }

        return `${formatDate(range.from)} - ${formatDate(range.to)}`
    }, [range, dict.component.date_picker.select_date_range])

    return (
        <div className="flex flex-col gap-3">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="dates"
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
                        mode="range"
                        selected={range}
                        captionLayout="dropdown"
                        onSelect={setRange}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
