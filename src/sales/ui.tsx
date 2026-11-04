import { createElement, useEffect, useRef, useState, type ReactNode } from 'react'

/** Renderiza **negrito** do texto da copy sem alterar nada além da ênfase. */
export function Rich({ text, hl }: { text: string; hl?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return (
    <>
      {parts.map((p, i) => {
        const bold = /^\*\*[^*]+\*\*$/.test(p)
        const content = bold ? p.slice(2, -2) : p
        const inner = hl && content.includes(hl) ? highlight(content, hl) : content
        return bold ? <strong key={i} className="font-extrabold">{inner}</strong> : <span key={i}>{inner}</span>
      })}
    </>
  )
}

/** Só estilo: destaca um trecho do próprio texto em verde-limão. */
export function highlight(text: string, phrase: string): ReactNode {
  const i = text.indexOf(phrase)
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <span className="text-xr-lime">{phrase}</span>
      {text.slice(i + phrase.length)}
    </>
  )
}

type Dir = 'up' | 'left' | 'right' | 'zoom'

export function Reveal({ children, delay = 0, dir = 'up', className = '', as = 'div' }: { children: ReactNode; delay?: number; dir?: Dir; className?: string; as?: string }) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return setShown(true)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const cls = `reveal ${dir === 'left' ? 'reveal-left' : dir === 'right' ? 'reveal-right' : dir === 'zoom' ? 'reveal-zoom' : ''} ${shown ? 'in' : ''} ${className}`
  return createElement(as, { ref, className: cls, style: { ['--d' as string]: `${delay}ms` } }, children)
}

/** Logo do xR Pec (refeito a partir da apresentação): cartão branco com xR, pec e selo NaFazenda.com. */
export function XrLogo({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' }) {
  const sm = size === 'sm'
  return (
    <div className={`inline-flex select-none items-start rounded-2xl bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)] ${sm ? 'gap-1.5 px-3.5 py-2.5' : 'gap-2.5 px-6 py-5'} ${className}`}>
      <span className="sr-only">xR PEC</span>
      <span aria-hidden="true" className={`font-black leading-[0.8] tracking-[-0.07em] text-xr-slate ${sm ? 'pt-1 text-[34px]' : 'pt-2 text-[68px]'}`}>xR</span>
      <span aria-hidden="true" className={`flex flex-col items-start ${sm ? 'gap-1' : 'gap-2'}`}>
        <span className={`rounded-[5px] border-[2.5px] border-xr-limed font-extrabold lowercase leading-none text-xr-limed ${sm ? 'px-1.5 py-[2px] text-[15px]' : 'px-2.5 py-[5px] text-[28px]'}`}>pec</span>
        <span className={`rounded-full border border-xr-slate font-medium tracking-[0.24em] text-xr-slate ${sm ? 'px-2 py-[1px] text-[6px]' : 'px-3.5 py-[2px] text-[10px]'}`}>NaFazenda.com</span>
        <span className={`flex items-center ${sm ? 'gap-1 pt-0.5' : 'gap-1.5 pt-1.5'}`}>
          <span className={`rounded-full bg-xr-bar ${sm ? 'h-[5px] w-[18px]' : 'h-[11px] w-[40px]'}`} />
          <span className={`rounded-full bg-xr-limed ${sm ? 'h-[5px] w-[5px]' : 'h-[11px] w-[11px]'}`} />
          <span className={`rounded-full border border-xr-limed ${sm ? 'h-[5px] w-[5px]' : 'h-[11px] w-[11px]'}`} />
        </span>
      </span>
    </div>
  )
}

export function Check({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

export function Cross({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
