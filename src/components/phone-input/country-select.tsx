import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import type { Country } from 'react-phone-number-input'
import { getCountryCallingCode } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface CountrySelectProps {
  disabled?: boolean
  value: Country
  options: { value: Country; label: string }[]
  onChange: (value: Country) => void
}

export function CountrySelect({
  disabled,
  value,
  options,
  onChange,
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)
  const Flag = value ? flags[value] : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex gap-2 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10"
          disabled={disabled}
        >
          {Flag && (
            <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-neutral-100">
              <Flag className="h-full w-full" />
            </span>
          )}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options.map(({ value: country, label }) => {
                  const CountryFlag = flags[country]
                  return (
                    <CommandItem
                      key={country}
                      className="flex items-center gap-2"
                      onSelect={() => {
                        onChange(country)
                        setOpen(false)
                      }}
                    >
                      {CountryFlag && (
                        <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-neutral-100">
                          <CountryFlag className="h-full w-full" />
                        </span>
                      )}
                      <span className="flex-1 text-sm">{label}</span>
                      <span className="text-sm text-neutral-500">
                        +{getCountryCallingCode(country)}
                      </span>
                      <Check className={cn("h-4 w-4", country === value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}