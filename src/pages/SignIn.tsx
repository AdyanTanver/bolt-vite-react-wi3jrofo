import React, { useState } from 'react'
import { SignInForm } from '@/components/auth/sign-in-form'
import { OTPVerification } from '@/components/auth/otp-input'
import { Logo } from '@/components/ui/logo'
import { MarqueeBackground } from '@/components/background/marquee'
import '@/styles/gradients.css'
import '@/styles/dark-mode-transition.css'
import '@/styles/marquee.css'

interface SignInProps {
  onSignUpClick: () => void
}

export function SignIn({ onSignUpClick }: SignInProps) {
  const [showOTP, setShowOTP] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className="auth-container min-h-screen bg-premium flex flex-col items-center justify-center px-4 py-8 sm:p-6">
      <MarqueeBackground />
      <div className="w-full max-w-[min(400px,100%-32px)] mx-auto space-y-6 sm:space-y-8">
        <Logo className="w-auto h-10 sm:h-14 mx-auto filter drop-shadow-lg" />
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 space-y-4 sm:space-y-6 hover-glow">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              {showOTP ? 'Enter verification code' : 'Sign in'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              {showOTP 
                ? `We sent a code to ${phoneNumber}`
                : 'to continue to Kaviar'
              }
            </p>
          </div>

          {showOTP ? (
            <OTPVerification
              phoneNumber={phoneNumber}
              onBack={() => setShowOTP(false)}
            />
          ) : (
            <SignInForm
              onSubmit={(phone) => {
                setPhoneNumber(phone)
                setShowOTP(true)
              }}
              onSignUpClick={onSignUpClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}