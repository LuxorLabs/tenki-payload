'use client'

import { useState } from 'react'
import { useMediaQuery } from '@/utils/hooks/use-media-query'
import { CalendarBlankIcon, XIcon } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { PropsBase, PropsRange, DateRange as RDPDateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type DatePickerRangeProps = Omit<PropsBase & PropsRange, 'mode'>

export type DateRange = RDPDateRange

export function DatePickerRange({ className, ...props }: DatePickerRangeProps) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [isOpen, setIsOpen] = useState(false)
  const date: DateRange | undefined = props.selected || { from: undefined, to: undefined }
  const hasDateValue = Boolean(date?.from || date?.to)

  const handleClearDate = () => {
    ;(props.onSelect as (range: DateRange | undefined) => void)?.(undefined)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary'}
          className={cn(
            'min-w-72 cursor-pointer justify-start text-left font-normal',
            {
              'ring-input-controls-border-hovered outline-1 outline-offset-2 outline-white hover:outline-white':
                isOpen,
              'outline-input-controls-border': !isOpen,
              'text-muted-foreground': !date,
            },
            className,
          )}
        >
          <div className="flex items-center gap-x-1">
            <CalendarBlankIcon size={16} weight="fill" className="text-input-controls-primary" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'MM/dd/yyyy')} - {format(date.to, 'MM/dd/yyyy')}
                </>
              ) : (
                format(date.from, 'MM/dd/yyyy')
              )
            ) : (
              <p
                className={cn(
                  'pb-0.5',
                  isOpen ? 'text-input-controls-secondary' : 'text-input-controls-primary',
                )}
              >
                Select date range
              </p>
            )}
          </div>

          {hasDateValue && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleClearDate()
              }}
              className="text-muted-foreground ml-2 cursor-pointer rounded p-1 hover:text-white"
              aria-label="Clear date"
            >
              <XIcon size={16} weight="bold" />
            </button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-input-controls border-input-controls-border my-1 w-auto border p-0"
        align="end"
        {...(isMobile && { side: 'bottom', align: 'center' })}
      >
        <Calendar
          {...props}
          mode="range"
          numberOfMonths={isMobile ? 1 : 2}
          rangeStartClassName="rounded-s-lg"
          rangeEndClassName="rounded-e-lg"
          showYearSwitcher={false}
        />
      </PopoverContent>
    </Popover>
  )
}
