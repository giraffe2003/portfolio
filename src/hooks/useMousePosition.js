import { useState, useEffect } from 'react'

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return position
}
