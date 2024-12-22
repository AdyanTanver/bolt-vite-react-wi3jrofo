import React from 'react'

interface FlagProps {
  country: string
  className?: string
}

export function FlagComponent({ country, className }: FlagProps) {
  const countryCode = country.toLowerCase()
  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      srcSet={`https://flagcdn.com/48x36/${countryCode}.png 2x`}
      width="24"
      height="18"
      alt={`${country} flag`}
      className={className}
    />
  )
}