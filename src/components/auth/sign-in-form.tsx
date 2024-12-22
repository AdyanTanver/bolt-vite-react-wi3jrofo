import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PhoneNumberInput } from '@/components/phone-input'
import { signInWithPhone } from '@/lib/auth'
import type { AuthError } from '@/lib/auth'

interface SignInFormProps {
  onSubmit: (phoneNumber: string) => void
  onSignUpClick: () => void
}

export function SignInForm({ onSubmit, onSignUpClick }: SignInFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    try {
      const { error } = await signInWithPhone(phoneNumber)
      if (error) {
        setError(error)
      } else {
        onSubmit(phoneNumber)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone number</Label>
        <PhoneNumberInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          error={error?.message}
        />
      </div>

      <Button 
        className="w-full h-11 text-base font-medium mt-6" 
        type="submit"
        disabled={isLoading || !phoneNumber}
      >
        {isLoading ? 'Signing in...' : 'Continue'}
      </Button>

      <p className="text-center text-sm text-neutral-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSignUpClick}
          className="font-medium text-neutral-900 hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  )
}