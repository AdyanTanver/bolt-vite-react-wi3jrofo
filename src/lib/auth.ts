import { supabase } from './supabase'
import { mockSignInWithPhone, mockVerifyOTP } from './mock-auth'

export type AuthError = {
  message: string
  code?: string
}

// Always use mock auth for demo purposes
const useMockAuth = true

export async function signInWithPhone(phoneNumber: string) {
  if (useMockAuth) {
    return mockSignInWithPhone(phoneNumber)
  }
  
  return supabase.auth.signInWithOtp({
    phone: phoneNumber,
    channel: 'sms'
  })
}

export async function verifyOTP(phoneNumber: string, token: string) {
  if (useMockAuth) {
    return mockVerifyOTP(phoneNumber, token)
  }

  return supabase.auth.verifyOtp({
    phone: phoneNumber,
    token,
    type: 'sms'
  })
}