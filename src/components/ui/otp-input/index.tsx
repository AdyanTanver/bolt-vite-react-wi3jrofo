import React from 'react'
import { SingleInput } from './single-input'
import { useOTPInput } from './use-otp-input'
import { otpContainerStyles } from './styles'

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled
}: OTPInputProps) {
  const {
    activeInput,
    digits,
    setActiveInput,
    handleChange,
    handleKeyDown,
    handlePaste,
  } = useOTPInput({ length, value, onChange, disabled })

  return (
    <div className={otpContainerStyles()}>
      {Array.from({ length }, (_, index) => (
        <SingleInput
          key={index}
          value={digits[index] || ''}
          onChange={(digit) => handleChange(digit, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={() => setActiveInput(index)}
          index={index}
          disabled={disabled}
          focused={activeInput === index}
        />
      ))}
    </div>
  )
}