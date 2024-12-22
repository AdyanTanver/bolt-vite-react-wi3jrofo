import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className="text-center relative">
      {/* Logo image */}
      <img
        src="https://oluebbfdnhjwytstmvjy.supabase.co/storage/v1/object/public/App-Assets/KaviarB.svg"
        alt="Kaviar"
        className={cn('main-logo transition-all duration-500', className)}
      />
      
      {/* Text with refined blur effect */}
      <div className="relative inline-block">
        {/* Lighter blur backdrop with tighter fit */}
        <div 
          className="absolute inset-x-[-0.5rem] inset-y-[-0.25rem] 
            backdrop-blur-[4px] bg-gradient-to-r 
            from-transparent via-white/5 to-transparent 
            rounded-full opacity-60"
        />
        
        {/* Text content with reduced margin */}
        <p className="relative logo-text mt-1.5 text-sm font-light text-neutral-600 tracking-wide animate-in fade-in slide-in-from-bottom-2 duration-700">
          For life's best moments{' '}
          <span className="heart-emoji inline-block animate-pulse">❤️‍🔥</span>
        </p>
      </div>
    </div>
  )
}