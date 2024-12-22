import React from 'react'
import PhoneInput from 'react-phone-number-input'
import { CountrySelect } from './country-select'
import { Input } from '../ui/input'
import type { PhoneNumberInputProps } from './types'
import 'react-phone-number-input/style.css'

export function PhoneNumberInput({ value, onChange, className, error }: PhoneNumberInputProps) {
  return (
    <div className={className}>
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="US"
        value={value}
        onChange={value => onChange(value || '')}
        countrySelectComponent={CountrySelect}
        inputComponent={Input}
        className="phone-input-container"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}