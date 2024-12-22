import { cva } from 'class-variance-authority'

export const otpInputStyles = cva(
  [
    // Base styles
    "relative flex-1 rounded-lg border border-neutral-200 bg-white text-center",
    "shadow-sm transition-all duration-200",
    "text-neutral-900 placeholder:text-neutral-500",
    
    // Focus styles with glow
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/20",
    "focus:border-emerald-400/30",
    "focus:shadow-[0_0_12px_rgba(52,211,153,0.15)]",
    
    // Disabled styles
    "disabled:cursor-not-allowed disabled:opacity-50",
    
    // Mobile-first sizing with adjusted height and padding
    "w-[40px] h-[40px] px-0",
    "text-lg leading-[40px]", // Align text vertically
    
    // Tablet and desktop sizing
    "sm:w-[44px] sm:h-[44px] sm:leading-[44px]",
    "sm:text-xl",
    
    // Font settings
    "font-medium tracking-wider",
  ].join(' ')
)

export const otpContainerStyles = cva(
  [
    // Container layout
    "flex justify-center items-center",
    
    // Spacing - adjusted for consistent gaps
    "gap-2 sm:gap-3",
    
    // Container sizing - adjusted to fit within card
    "w-full max-w-[280px] mx-auto",
    
    // Animation and glow
    "animate-in fade-in duration-300",
    "py-2",
    "rounded-xl",
    "relative",
    
    // Ambient glow effect
    "before:absolute before:inset-0 before:-z-10",
    "before:rounded-xl before:bg-gradient-to-b",
    "before:from-emerald-400/5 before:to-transparent",
    "before:blur-xl",
  ].join(' ')
)