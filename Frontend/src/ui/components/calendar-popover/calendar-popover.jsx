"use client"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function CalendarPopover({ open, setOpen, value, onChange, placeholder = "Selecionar data" }) {
  const selectedDate = value ? new Date(value + "T00:00:00") : undefined
  const label = selectedDate ? selectedDate.toLocaleDateString("pt-BR") : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className={`justify-between font-normal w-full ${!value && "text-muted-foreground"}`}
        >
          {label || placeholder}
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          captionLayout="dropdown"
          onSelect={(date) => {
            if (!date) return
            const iso = date.toISOString().slice(0, 10)
            onChange(iso)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
