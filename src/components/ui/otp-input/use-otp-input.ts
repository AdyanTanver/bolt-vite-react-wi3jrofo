import { useState, useCallback, useEffect } from 'react'

interface UseOTPInput {
  length: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function useOTPInput({ length, value, onChange, disabled }: UseOTPInput) {
  const [activeInput, setActiveInput] = useState(0)
  const digits = value.split('')

  // Auto-focus first input on mount
  useEffect(() => {
    if (!disabled && value.length === 0) {
      setActiveInput(0)
    }
  }, [disabled, value])

  const handleChange = useCallback((digit: string, index: number) => {
    const newValue = value.split('')
    newValue[index] = digit
    const newStringValue = newValue.join('')
    onChange(newStringValue)

    if (digit !== '' && index < length - 1) {
      setActiveInput(index + 1)
    }
  }, [length, onChange, value])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    switch (e.key) {
      case 'Backspace':
        e.preventDefault()
        if (value[index]) {
          handleChange('', index)
        } else if (index > 0) {
          setActiveInput(index - 1)
          handleChange('', index - 1)
        }
        break
      case 'ArrowLeft':
        if (index > 0) {
          e.preventDefault()
          setActiveInput(index - 1)
        }
        break
      case 'ArrowRight':
        if (index < length - 1) {
          e.preventDefault()
          setActiveInput(index + 1)
        }
        break
      case 'Delete':
        e.preventDefault()
        handleChange('', index)
        break
    }
  }, [handleChange, length, value])

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (disabled) return

    const pastedData = e.clipboardData.getData('text/plain')
    const digits = pastedData.replace(/\D/g, '').slice(0, length).split('')
    const newValue = digits.join('')
    onChange(newValue)
    
    if (digits.length > 0) {
      setActiveInput(Math.min(digits.length, length - 1))
    }
  }, [length, onChange, disabled])

  return {
    activeInput,
    digits,
    setActiveInput,
    handleChange,
    handleKeyDown,
    handlePaste,
  }
}