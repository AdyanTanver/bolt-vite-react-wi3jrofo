import { parsePhoneNumber } from 'libphonenumber-js'

export function formatPhoneNumber(phoneNumber: string): string {
  try {
    const parsed = parsePhoneNumber(phoneNumber)
    return parsed.formatInternational()
  } catch {
    return phoneNumber
  }
}