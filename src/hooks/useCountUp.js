import { useEffect, useRef, useState } from 'react'

/**
 * Counts up to `target` once `run` becomes true. Returns the current value.
 * Antes de animar devuelve `target`, así el HTML pre-renderizado (y quien no ejecuta JS) ve la cifra real.
 */
export default function useCountUp(target, run, duration = 1600) {
  const [value, setValue] = useState(target)
  const started = useRef(false)

  useEffect(() => {
    if (!run || started.current) return
    started.current = true
    setValue(0)
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [run, target, duration])

  return value
}
