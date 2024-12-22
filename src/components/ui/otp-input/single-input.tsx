import React, { useRef, useEffect } from 'react'
import { Input } from '../input'
import { otpInputStyles } from './styles'

interface SingleInputProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void
  onFocus: () => void
  index: number
  disabled?: boolean
  focused?: boolean
}

export function SingleInput({
  value,
  onChange,
  onKeyDown,
  onPaste,
  onFocus,
  index,
  disabled,
  focused
}: SingleInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [focused])

  return (
    <Input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={1}
      value={value}
      onChange={(e) => {
        const digit = e.target.value.replace(/\D/g, '')
        onChange(digit)
      }}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      onFocus={onFocus}
      disabled={disabled}
      className={otpInputStyles()}
      aria-label={`Digit ${index + 1}`}
    />
  )
}