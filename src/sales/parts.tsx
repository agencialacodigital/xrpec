import type { ReactNode } from 'react'
import { isBoldOnly, stripBold, type Block } from '../content/parse'
import { CTA_LABEL } from '../content/copy'
import { useCondition } from './condition'
import { Reveal, Rich } from './ui'

export type Tone = 'night' | 'forest' | 'mint' | 'white'
const dark = (t: Tone) => t === 'night' || t === 'forest'

const BG: Record<Tone, string> = {
  night: 'bg-xr-night text-white',
  forest: 'bg-xr-forest text-white',
  mint: 'bg-xr-mint text-xr-slate',
  white: 'bg-white text-xr-slate',
}

export function Section({ tone, id, children, className = '' }: { tone: Tone; id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative isolate overflow-hidden ${BG[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">{children}</div>
    </section>
  )
}

export function Title({ children, tone, className = '' }: { children: ReactNode; tone: Tone; className?: string }) {
  return (
    <Reveal className={className}>
      <span className="xr-mark" aria-hidden="true" />
      <h2 className={`text-balance text-[30px] font-extrabold uppercase leading-[1.08] tracking-tight sm:text-[44px] lg:text-[52px] ${dark(tone) ? 'text-white' : 'text-xr-night'}`}>{children}</h2>
    </Reveal>
  )
}

export function CtaButton({ large = false, className = '', pulse = false }: { large?: boolean; className?: string; pulse?: boolean }) {
  const { openCondition } = useCondition()
  return (
    <button type="button" onClick={openCondition} className={`xr-btn ${large ? 'xr-btn-lg' : ''} ${pulse ? 'animate-pulse2' : ''} ${className}`}>
      {CTA_LABEL}
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
      <span aria-hidden="true" className="sheen animate-sheen" />
    </button>
  )
}

const SHORT = 44
const isShort = (t: string) => !isBoldOnly(t) && t.length <= SHORT

interface BodyProps {
  blocks: Block[]
  tone: Tone
  /** como mostrar sequências de frases curtas */
  runs?: 'chips' | 'list'
  className?: string
  size?: 'md' | 'lg'
}

/**
 * Renderiza os blocos da copy como estão. Só decide a forma:
 * frase em negrito vira destaque, sequência de frases curtas vira lista de "pílulas".
 */
export function Body({ blocks, tone, runs = 'chips', className = '', size = 'md' }: BodyProps) {
  const d = dark(tone)
  const out: ReactNode[] = []
  let run: Block[] = []
  let k = 0

  const text = size === 'lg' ? 'text-[18px] sm:text-[21px]' : 'text-[16.5px] sm:text-[18px]'
  const paragraph = (b: Block) => (
    <Reveal key={k++} as="p" className={`mt-5 font-medium leading-[1.7] ${text} ${d ? 'text-white/85' : 'text-xr-slate'}`}>
      <Rich text={b.text} />
    </Reveal>
  )

  const flush = () => {
    if (run.length >= 3) {
      out.push(
        runs === 'list' ? (
          <ul key={k++} className="mt-6 space-y-3">
            {run.map((b, i) => (
              <Reveal as="li" key={i} delay={i * 60} className={`flex items-start gap-3 ${text} font-semibold ${d ? 'text-white' : 'text-xr-night'}`}>
                <span className="mt-[0.6em] block h-2 w-2 shrink-0 bg-xr-lime" aria-hidden="true" />
                <span><Rich text={b.text} /></span>
              </Reveal>
            ))}
          </ul>
        ) : (
          <ul key={k++} className="mt-7 flex flex-wrap gap-2.5">
            {run.map((b, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 70}
                dir="zoom"
                className={`rounded-full border px-4 py-2 text-[14px] font-bold sm:text-[15px] ${d ? 'border-xr-lime/40 bg-white/[0.06] text-white' : 'border-xr-fern/30 bg-white text-xr-leaf shadow-sm'}`}
              >
                <Rich text={b.text} />
              </Reveal>
            ))}
          </ul>
        ),
      )
    } else run.forEach((b) => out.push(paragraph(b)))
    run = []
  }

  for (const b of blocks) {
    if (b.t === 'p' && isShort(b.text)) {
      run.push(b)
      continue
    }
    flush()
    if (b.t === 'h2') {
      out.push(
        <Reveal key={k++} as="h3" className={`mt-12 text-[20px] font-extrabold uppercase tracking-tight sm:text-[26px] ${d ? 'text-white' : 'text-xr-night'}`}>
          {b.text}
        </Reveal>,
      )
    } else if (b.t === 'h3') {
      out.push(
        <Reveal key={k++} as="h4" className={`mt-10 text-[18px] font-extrabold sm:text-[22px] ${d ? 'text-xr-lime' : 'text-xr-leaf'}`}>
          {b.text}
        </Reveal>,
      )
    } else if (isBoldOnly(b.text)) {
      out.push(
        <Reveal key={k++} as="p" dir="left" className={`mt-8 border-l-4 border-xr-lime pl-5 text-[22px] font-extrabold leading-[1.3] sm:text-[30px] ${d ? 'text-white' : 'text-xr-night'}`}>
          {stripBold(b.text)}
        </Reveal>,
      )
    } else out.push(paragraph(b))
  }
  flush()
  return <div className={className}>{out}</div>
}

export function Photo({ src, alt = '', className = '', dir = 'zoom', float = false, tall = false }: { src: string; alt?: string; className?: string; dir?: 'up' | 'left' | 'right' | 'zoom'; float?: boolean; tall?: boolean }) {
  return (
    <Reveal dir={dir} className={className}>
      <div className={`overflow-hidden rounded-[28px] shadow-[0_40px_90px_-40px_rgba(0,0,0,.7)] ring-1 ring-black/5 ${tall ? 'aspect-[5/4]' : ''} ${float ? 'animate-float' : ''}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
    </Reveal>
  )
}
