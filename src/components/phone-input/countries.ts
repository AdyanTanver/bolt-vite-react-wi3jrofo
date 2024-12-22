export interface Country {
  name: string
  iso2: string
  dialCode: string
}

export const countries: Country[] = [
  { name: 'United States', iso2: 'us', dialCode: '+1' },
  { name: 'United Kingdom', iso2: 'gb', dialCode: '+44' },
  { name: 'Canada', iso2: 'ca', dialCode: '+1' },
  { name: 'Australia', iso2: 'au', dialCode: '+61' },
  { name: 'Germany', iso2: 'de', dialCode: '+49' },
  { name: 'France', iso2: 'fr', dialCode: '+33' },
  { name: 'Spain', iso2: 'es', dialCode: '+34' },
  { name: 'Italy', iso2: 'it', dialCode: '+39' },
  { name: 'Japan', iso2: 'jp', dialCode: '+81' },
  { name: 'China', iso2: 'cn', dialCode: '+86' },
]