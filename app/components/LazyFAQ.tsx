'use client'

import { useEffect, useRef, useState } from 'react'
import FAQ from './FAQ'

export default function LazyFAQ() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (shouldRender) return
    const el = rootRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldRender(true)
          io.disconnect()
        }
      },
      // Start loading a bit before it becomes visible
      { rootMargin: '600px 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [shouldRender])

  return <div ref={rootRef}>{shouldRender ? <FAQ /> : null}</div>
}

