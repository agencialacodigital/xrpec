import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { EmailStep } from '../components/EmailStep'
import { OfferResult, ReviewResult } from '../components/Results'
import { lookup, type PublicOffer } from '../lib/api'

type Step = 'form' | 'offer' | 'review'

interface Ctx {
  open: boolean
  openCondition: () => void
}
const ConditionCtx = createContext<Ctx>({ open: false, openCondition: () => {} })
export const useCondition = () => useContext(ConditionCtx)

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function ConditionProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openCondition = useCallback(() => setOpen(true), [])
  return (
    <ConditionCtx.Provider value={{ open, openCondition }}>
      {children}
      {open && <ConditionModal onClose={() => setOpen(false)} />}
    </ConditionCtx.Provider>
  )
}

function ConditionModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [offer, setOffer] = useState<PublicOffer | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => panel.current?.querySelector<HTMLInputElement>('input')?.focus(), 80)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [onClose])

  async function submit(value: string, nome: string) {
    setBusy(true)
    setError(null)
    const r = await lookup(value)
    setBusy(false)
    if (!r.ok) return setError(r.message)
    setEmail(value)
    setName(nome)
    try {
      window.fbq?.('track', 'Lead')
    } catch {
      /* pixel é opcional */
    }
    if (r.data.status === 'offer') {
      setOffer(r.data.offer)
      setStep('offer')
    } else setStep('review')
    panel.current?.scrollTo({ top: 0 })
  }

  const back = () => {
    setOffer(null)
    setError(null)
    setStep('form')
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Sua condição especial">
      <button type="button" aria-label="Fechar" onClick={onClose} className="absolute inset-0 animate-fade cursor-default bg-black/75 backdrop-blur-sm" />
      <div
        ref={panel}
        className="relative max-h-[94vh] w-full max-w-[560px] animate-rise overflow-y-auto rounded-t-[28px] border border-xr-lime/25 bg-xr-night p-6 shadow-[0_40px_120px_-20px_rgba(0,0,0,.9)] sm:rounded-3xl sm:p-10"
      >
        <button type="button" onClick={onClose} aria-label="Fechar" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        {step === 'form' && <EmailStep key="form" initialName={name} initialEmail={email} busy={busy} error={error} onSubmit={submit} />}
        {step === 'offer' && offer && <OfferResult key="offer" offer={offer} onAnother={back} />}
        {step === 'review' && <ReviewResult key="review" onAnother={back} />}
      </div>
    </div>
  )
}
