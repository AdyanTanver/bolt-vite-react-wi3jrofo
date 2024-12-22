import React, { useState } from 'react'
import { SignUpForm } from '@/components/auth/sign-up-form'
import { OTPVerification } from '@/components/auth/otp-input'
import { Logo } from '@/components/ui/logo'
import { MarqueeBackground } from '@/components/background/marquee'
import '@/styles/gradients.css'
import '@/styles/dark-mode-transition.css'
import '@/styles/marquee.css'

interface SignUpProps {
  onSignInClick: () => void
}

export function SignUp({ onSignInClick }: SignUpProps) {
  const [showOTP, setShowOTP] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className="auth-container min-h-screen bg-premium flex flex-col items-center justify-center px-4 py-8 sm:p-6">
      <MarqueeBackground />
      <div className="w-full max-w-[min(400px,100%-32px)] mx-auto space-y-6 sm:space-y-8 relative z-10">
        <Logo className="w-auto h-10 sm:h-14 mx-auto" />
        
        <div className="hover-glow rounded-xl sm:rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <img
              src="https://oluebbfdnhjwytstmvjy.supabase.co/storage/v1/object/public/App-Assets/KaviarIcon.png"
              alt="Kaviar Icon"
              className="w-10 h-10 sm:w-12 sm:h-12 logo transition-all duration-500"
            />
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                {showOTP ? 'Enter verification code' : 'Create account'}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                {showOTP 
                  ? `We sent a code to ${phoneNumber}`
                  : 'to get started with Kaviar'
                }
              </p>
            </div>
          </div>

          {showOTP ? (
            <OTPVerification
              phoneNumber={phoneNumber}
              onBack={() => setShowOTP(false)}
            />
          ) : (
            <SignUpForm
              onSubmit={(phone) => {
                setPhoneNumber(phone)
                setShowOTP(true)
              }}
              onSignInClick={onSignInClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}