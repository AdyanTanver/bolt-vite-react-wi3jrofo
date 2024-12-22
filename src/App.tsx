import React, { useState } from 'react'
import { SignIn } from '@/pages/SignIn'
import { SignUp } from '@/pages/SignUp'

function App() {
  const [currentPage, setCurrentPage] = useState<'signin' | 'signup'>('signup')

  return currentPage === 'signin' ? (
    <SignIn onSignUpClick={() => setCurrentPage('signup')} />
  ) : (
    <SignUp onSignInClick={() => setCurrentPage('signin')} />
  )
}

export default App