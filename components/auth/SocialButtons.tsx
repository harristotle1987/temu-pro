'use client'

import { Button } from '@/components/ui/Button'
import FcGoogle from 'react-icons/fc'
import FaFacebook from 'react-icons/fa'

export function SocialButtons() {
  const handleGoogleSignIn = () => {
    // Google OAuth implementation
    console.log('Google sign in')
  }

  const handleFacebookSignIn = () => {
    // Facebook OAuth implementation  
    console.log('Facebook sign in')
  }

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center space-x-3"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="w-5 h-5" />
        <span>Continue with Google</span>
      </Button>

      <Button
        variant="outline" 
        className="w-full flex items-center justify-center space-x-3"
        onClick={handleFacebookSignIn}
      >
        <FaFacebook className="w-5 h-5 text-blue-600" />
        <span>Continue with Facebook</span>
      </Button>
    </div>
  )
}