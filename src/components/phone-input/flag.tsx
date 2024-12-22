import * as React from 'react'
import flags from 'react-phone-number-input/flags'
import type { Country } from 'react-phone-number-input'

interface FlagProps {
  country: Country
}

export function FlagComponent({ country }: FlagProps) {
  const Flag = flags[country]

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-neutral-100">
      {Flag && <Flag className="h-full w-full" />}
    </span>
  )
}