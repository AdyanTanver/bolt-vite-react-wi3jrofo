import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import type { AuthError } from './auth'

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function mockSignInWithPhone(phoneNumber: string) {
  if (!phoneNumber) {
    return {
      data: null,
      error: {
        message: 'Please enter a phone number',
        code: 'invalid_phone'
      } as AuthError
    }
  }

  try {
    // Validate phone number format
    if (!isValidPhoneNumber(phoneNumber)) {
      return {
        data: null,
        error: {
          message: 'Please enter a valid phone number',
          code: 'invalid_phone'
        } as AuthError
      }
    }

    // Parse and format to E.164
    const parsedNumber = parsePhoneNumber(phoneNumber)
    const e164Number = parsedNumber.format('E.164')

    // Simulate API delay
    await delay(1000)

    console.log('Mock SMS sent to:', e164Number)
    
    return { 
      data: { phoneNumber: e164Number },
      error: null 
    }
  } catch (error) {
    console.error('Mock auth error:', error)
    return {
      data: null,
      error: {
        message: 'An unexpected error occurred. Please try again.',
        code: 'unknown'
      } as AuthError
    }
  }
}

export async function mockVerifyOTP(phoneNumber: string, token: string) {
  if (!token || token.length !== 6) {
    return {
      data: null,
      error: {
        message: 'Please enter a valid verification code',
        code: 'invalid_otp'
      } as AuthError
    }
  }

  await delay(1000)

  // For development, accept any 6-digit code
  return { 
    data: { 
      user: { 
        id: 'mock-user-id',
        phone: phoneNumber 
      },
      session: {
        access_token: 'mock-token'
      }
    }, 
    error: null 
  }
}