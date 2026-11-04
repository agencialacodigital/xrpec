import { useEffect, useMemo, useState } from 'react'
import { CHAPTERS } from '../content/copy'
import { ConditionProvider, useCondition } from './condition'
import { CtaButton } from './parts'
import { renderChapters, SalesFooter } from './chapters'

function Progress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])
  return <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-xr-lime" style={{ transform: `scaleX(${p})` }} />
}

function StickyBar() {
  const { open } = useCondition()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.85)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const visible = show && !open
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-xr-lime/25 bg-xr-night/92 px-4 py-3 backdrop-blur-md transition duration-300 sm:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      aria-hidden={!visible}
    >
      <CtaButton className="w-full !px-4 !py-3.5 !text-[12px]" />
    </div>
  )
}

export default function SalesPage() {
  useEffect(() => {
    document.title = 'xR Pec | Black NaFazenda'
  }, [])
  const sections = useMemo(() => renderChapters(CHAPTERS), [])
  return (
    <ConditionProvider>
      <Progress />
      <main>{sections}</main>
      <SalesFooter />
      <StickyBar />
    </ConditionProvider>
  )
}
