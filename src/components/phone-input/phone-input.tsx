import React, { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { countries } from './countries'
import { FlagComponent } from './flags'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
  error?: string
}

export function PhoneInput({ value, onChange, className, error }: PhoneInputProps) {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country)
    setOpen(false)
    
    // Update phone number with new country code
    const nationalNumber = value.replace(/^\+\d+/, '')
    onChange(country.dialCode + nationalNumber)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleaned = e.target.value.replace(/[^\d+]/g, '')
    if (!cleaned.startsWith(selectedCountry.dialCode)) {
      cleaned = selectedCountry.dialCode + cleaned.replace(/^\+/, '')
    }
    onChange(cleaned)
  }

  return (
    <div className="space-y-2">
      <div className={cn('flex w-full gap-0', className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[120px] justify-between rounded-e-none border-e-0"
            >
              <div className="flex items-center gap-2">
                <FlagComponent country={selectedCountry.iso2} />
                <span className="truncate">{selectedCountry.dialCode}</span>
              </div>
              <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.iso2}
                      value={country.name}
                      onSelect={() => handleCountrySelect(country)}
                      className="flex items-center gap-2"
                    >
                      <FlagComponent country={country.iso2} />
                      <span className="flex-1 text-sm">{country.name}</span>
                      <span className="text-xs text-neutral-500">
                        {country.dialCode}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          type="tel"
          value={value.replace(selectedCountry.dialCode, '')}
          onChange={handlePhoneChange}
          placeholder="(555) 000-0000"
          className="flex-1 rounded-s-none"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}