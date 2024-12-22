import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OTPInput } from '@/components/ui/otp-input'
import { verifyOTP } from '@/lib/auth'
import { formatPhoneNumber } from '@/lib/format'
import type { AuthError } from '@/lib/auth'

interface OTPVerificationProps {
  phoneNumber: string
  onBack: () => void
}

export function OTPVerification({ phoneNumber, onBack }: OTPVerificationProps) {
  const [otp, setOTP] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error } = await verifyOTP(phoneNumber, otp)
      if (error) {
        setError(error)
      } else {
        // Redirect to dashboard or home page after successful verification
        window.location.href = '/'
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    // Implement resend logic here
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <Button
        type="button"
        variant="ghost"
        className="-ml-2 text-sm text-neutral-600 hover:text-neutral-900"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="mt-6 space-y-8">
        <OTPInput
          value={otp}
          onChange={setOTP}
          disabled={isLoading}
        />

        {error && (
          <p className="text-sm text-red-500 text-center" role="alert">
            {error.message}
          </p>
        )}

        <div className="space-y-3">
          <Button 
            className="w-full h-11 text-base font-medium" 
            type="submit"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? 'Verifying...' : otp.length === 6 ? 'Verify' : 'Enter code'}
          </Button>

          <button
            type="button"
            className="w-full text-sm text-neutral-600 hover:text-neutral-900"
            onClick={handleResend}
            disabled={isLoading}
          >
            Didn't receive a code? Send again
          </button>
        </div>
      </div>
    </form>
  )
}