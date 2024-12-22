import React, { useMemo } from 'react'
import { marqueeImages } from './marquee-images'

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Function to rotate array by random positions
function rotateArray<T>(array: T[], positions: number): T[] {
  const newArray = [...array]
  for (let i = 0; i < positions; i++) {
    newArray.push(newArray.shift()!)
  }
  return newArray
}

export function MarqueeBackground() {
  // Double shuffle mechanism for maximum randomization
  const leftImages = useMemo(() => {
    const firstShuffle = shuffleArray(marqueeImages)
    const secondShuffle = shuffleArray([...firstShuffle])
    return rotateArray(secondShuffle, Math.floor(Math.random() * secondShuffle.length))
  }, [])

  const rightImages = useMemo(() => {
    const firstShuffle = shuffleArray(marqueeImages)
    const secondShuffle = shuffleArray([...firstShuffle])
    return rotateArray(secondShuffle, Math.floor(Math.random() * secondShuffle.length))
  }, [])

  // Create duplicated arrays with different shuffles
  const duplicatedLeftImages = useMemo(() => {
    const secondSet = shuffleArray([...leftImages])
    return [...leftImages, ...secondSet]
  }, [leftImages])

  const duplicatedRightImages = useMemo(() => {
    const secondSet = shuffleArray([...rightImages])
    return [...rightImages, ...secondSet]
  }, [rightImages])

  return (
    <div className="marquee-container">
      {/* Left marquee */}
      <div className="marquee-track left-track">
        {duplicatedLeftImages.map((image, index) => (
          <div key={`left-${index}`} className="marquee-item">
            <img
              src={image.url}
              alt={image.alt}
              className="marquee-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Right marquee */}
      <div className="marquee-track right-track">
        {duplicatedRightImages.map((image, index) => (
          <div key={`right-${index}`} className="marquee-item">
            <img
              src={image.url}
              alt={image.alt}
              className="marquee-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}