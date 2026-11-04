import type { ReactNode } from 'react'
import { groupBy, isBoldOnly, isQuote, stripBold, type Block, type Chapter } from '../content/parse'
import { Body, CtaButton, Photo, Section, Title } from './parts'
import { Check, Cross, Reveal, Rich, XrLogo, highlight } from './ui'
import { Footer } from '../components/Brand'
import { Logo } from '../components/Brand'
import { PRIVACY_URL } from '../lib/format'

import sunset from '../assets/xr/por-do-sol.webp'
import presenters from '../assets/xr/apresentadores.webp'
import farmer from '../assets/xr/pecuarista.webp'
import split from '../assets/xr/diagnostico.webp'
import method from '../assets/xr/metodo.webp'
import bucket from '../assets/xr/balde.webp'
import aerial from '../assets/xr/aerea.webp'
import pasture from '../assets/xr/pasto.webp'
import platform from '../assets/xr/plataforma.webp'
import groupMap from '../assets/xr/grupo-mapa.webp'
import challenges from '../assets/xr/desafios.webp'
import table from '../assets/xr/mesa.webp'
import ai from '../assets/xr/ia.webp'
import feed from '../assets/xr/cocho.webp'
import labx from '../assets/xr/labx.webp'
import duo from '../assets/xr/dupla.webp'

const ps = (b: Block[]) => b.filter((x) => x.t === 'p')

/* ───────────── Abertura ───────────── */
function Hero({ ch }: { ch: Chapter }) {
  const h2 = ch.blocks.find((b) => b.t === 'h2')
  const h3s = ch.blocks.filter((b) => b.t === 'h3')
  return (
    <section className="relative isolate overflow-hidden bg-xr-night text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-xr-forest/70 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 h-[420px] w-[620px] rounded-full bg-xr-lime/10 blur-[140px]" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
        <Logo className="h-9 sm:h-11" />
        <span className="xr-eyebrow hidden sm:flex">Black NaFazenda 2026</span>
      </header>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:pb-24">
        <div>
          <Reveal><XrLogo size="sm" className="mb-8" /></Reveal>
          {h2 && (
            <Reveal delay={80} as="h1" className="text-[40px] font-extrabold leading-[1.04] tracking-tight sm:text-[58px] lg:text-[68px]">
              {highlight(h2.text, 'dentro da porteira.')}
            </Reveal>
          )}
          {h3s[0] && (
            <Reveal delay={180} as="p" className="mt-8 text-[20px] font-medium leading-snug text-white/80 sm:text-[24px]">
              {h3s[0].text}
            </Reveal>
          )}
          {h3s[1] && (
            <Reveal delay={260} as="p" className="mt-2 text-[22px] font-extrabold leading-snug text-xr-lime sm:text-[28px]">
              {h3s[1].text}
            </Reveal>
          )}
          <Reveal delay={360} className="mt-10"><CtaButton large /></Reveal>
        </div>

        <Reveal dir="right" delay={150}>
          <div className="relative mx-auto aspect-[4/4.6] w-full max-w-[520px] overflow-hidden rounded-[32px] shadow-[0_50px_120px_-40px_rgba(0,0,0,.9)] ring-1 ring-white/10 lg:aspect-[4/5]">
            <img src={sunset} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-xr-night/80 via-transparent to-transparent" />
            <img src={presenters} alt="Matheus Moretti e Leonardo Lima" className="absolute bottom-0 left-1/2 w-[112%] max-w-none -translate-x-1/2" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Intro({ ch }: { ch: Chapter }) {
  const all = ps(ch.blocks)
  const quotes = all.filter((b) => isQuote(b.text))
  const rest = all.filter((b) => !isQuote(b.text))
  const ci = rest.findIndex((b) => isBoldOnly(b.text))
  const before = ci < 0 ? rest : rest.slice(0, ci)
  const callout = ci < 0 ? null : rest[ci]
  const after = ci < 0 ? [] : rest.slice(ci + 1)
  const lead = after[0]
  const negs = after.filter((b) => /^(Não para|E muito menos)/.test(b.text))
  const tail = after.slice(1).filter((b) => !negs.includes(b))

  return (
    <>
      <Section tone="mint">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {quotes.map((q, i) => (
            <Reveal key={i} delay={i * 90} className="relative rounded-2xl bg-white p-6 pt-12 shadow-[0_18px_50px_-30px_rgba(10,36,20,.5)] ring-1 ring-xr-night/5">
              <span aria-hidden="true" className="absolute left-5 top-2 text-[56px] font-black leading-none text-xr-lime">“</span>
              <p className="text-[16px] font-bold leading-snug text-xr-night">{q.text.replace(/^[“"]|[”"]$/g, '')}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_.75fr]">
          <Body blocks={before} tone="mint" size="lg" className="-mt-5" />
          <Reveal dir="right">
            <div className="relative mx-auto max-w-[400px] overflow-hidden rounded-[32px] bg-xr-forest pt-10">
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-xr-lime/25 blur-[60px]" />
              <img src={farmer} alt="" loading="lazy" className="relative mx-auto h-[420px] w-auto object-contain object-bottom" />
            </div>
          </Reveal>
        </div>
      </Section>

      {callout && (
        <section className="relative isolate overflow-hidden bg-xr-night text-white">
          <img src={pasture} alt="" loading="lazy" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
          <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
            <Reveal as="p" className="text-[28px] font-extrabold leading-[1.2] tracking-tight text-xr-lime sm:text-[44px]">
              {stripBold(callout.text)}
            </Reveal>
          </div>
        </section>
      )}

      <Section tone="white">
        {lead && (
          <Reveal as="p" className="max-w-3xl text-[28px] font-extrabold leading-[1.15] tracking-tight text-xr-night sm:text-[44px]">
            <Rich text={lead.text} />
          </Reveal>
        )}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {negs.map((n, i) => (
            <Reveal key={i} delay={i * 110} className="flex gap-4 rounded-2xl border border-xr-night/10 bg-xr-mint p-6">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-xr-ember/10 text-xr-ember"><Cross className="h-4 w-4" /></span>
              <p className="text-[17px] font-semibold leading-snug text-xr-slate">{n.text}</p>
            </Reveal>
          ))}
        </div>
        {tail.length > 0 && (
          <Reveal className="mt-10 rounded-[28px] bg-xr-forest p-8 text-white sm:p-12">
            {tail.map((b, i) => (
              <p key={i} className={`font-semibold leading-[1.5] ${i === 0 ? 'text-[22px] sm:text-[30px]' : 'mt-5 text-[17px] text-white/85 sm:text-[20px]'}`}>
                <Rich text={b.text} hl={i === 0 ? 'xR Pec' : '12 meses'} />
              </p>
            ))}
          </Reveal>
        )}
      </Section>
    </>
  )
}

function Opening({ ch }: { ch: Chapter }) {
  return (
    <>
      <Hero ch={ch} />
      <Intro ch={ch} />
    </>
  )
}

/* ───────────── Não é mais um curso ───────────── */
function NotACourse({ ch }: { ch: Chapter }) {
  const i2 = ch.blocks.findIndex((b) => b.t === 'h2')
  const intro = ch.blocks.slice(0, i2 < 0 ? ch.blocks.length : i2)
  const triadTitle = i2 < 0 ? null : ch.blocks[i2].text
  const after = i2 < 0 ? [] : ch.blocks.slice(i2 + 1)
  const n = after.slice(0, 3).filter((b) => b.t === 'p' && b.text.length <= 30)
  const triad = n.length === 3 ? n : []
  const rest = after.slice(triad.length)
  const words = triadTitle ? triadTitle.split(/\.\s*/).filter(Boolean) : []

  return (
    <Section tone="night">
      <img src={pasture} alt="" loading="lazy" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.12]" />
      <Title tone="night">{ch.title}</Title>
      <Body blocks={intro} tone="night" size="lg" className="max-w-3xl" />

      {words.length > 0 && (
        <div className="mt-16">
          <h3 className="sr-only">{triadTitle}</h3>
          <div className="grid gap-4 md:grid-cols-3" aria-hidden="true">
            {words.map((w, i) => (
              <Reveal key={w} delay={i * 140} className="rounded-3xl border border-xr-lime/25 bg-gradient-to-b from-white/[0.07] to-transparent p-7">
                <span className="text-[13px] font-black tracking-[0.3em] text-xr-lime">0{i + 1}</span>
                <p className="mt-6 text-[26px] font-extrabold tracking-tight text-white sm:text-[30px]">{w}.</p>
                {triad[i] && <p className="mt-3 text-[17px] font-semibold text-white/70">{triad[i].text}</p>}
              </Reveal>
            ))}
          </div>
          <span className="sr-only">{triad.map((t) => t.text).join(' ')}</span>
        </div>
      )}

      <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
        <Photo src={split} className="lg:sticky lg:top-8" dir="left" />
        <Body blocks={rest} tone="night" runs="list" className="-mt-5" />
      </div>
    </Section>
  )
}

/* ───────────── Método ───────────── */
function MethodChapter({ ch }: { ch: Chapter }) {
  const { intro, groups } = groupBy(ch.blocks, 'h3')
  return (
    <Section tone="mint">
      <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <Title tone="mint">{ch.title}</Title>
          <Body blocks={intro} tone="mint" size="lg" />
          <Photo src={method} className="mt-10" />
        </div>
        <ol className="space-y-5">
          {groups.map((g, i) => {
            const m = /^(\d+)\.\s*(.*)$/.exec(g.title)
            return (
              <Reveal as="li" key={i} delay={60} className="relative overflow-hidden rounded-3xl bg-white p-7 shadow-[0_24px_60px_-40px_rgba(10,36,20,.6)] ring-1 ring-xr-night/5 sm:p-9">
                <div className="flex items-start gap-5">
                  <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-xr-night text-[20px] font-black text-xr-lime">{m ? m[1] : i + 1}</span>
                  <h3 className="pt-2 text-[21px] font-extrabold leading-tight text-xr-night sm:text-[25px]">{m && <span className="sr-only">{m[1]}. </span>}{m ? m[2] : g.title}</h3>
                </div>
                <Body blocks={g.blocks} tone="mint" runs="list" className="pl-0 sm:pl-[68px]" />
                {i === 2 && <img src={bucket} alt="" loading="lazy" className="mt-6 aspect-[16/8] w-full rounded-2xl object-cover sm:ml-[68px] sm:w-[calc(100%-68px)]" />}
              </Reveal>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}

/* ───────────── Por que 12 meses ───────────── */
function Months({ ch }: { ch: Chapter }) {
  return (
    <Section tone="forest">
      <img src={aerial} alt="" loading="lazy" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 mix-blend-luminosity" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-10 -z-10 select-none text-[300px] font-black leading-none text-transparent [-webkit-text-stroke:2px_rgba(134,227,34,.22)] sm:text-[440px]">12</span>
      <Title tone="forest">{ch.title}</Title>
      <Body blocks={ch.blocks} tone="forest" size="lg" className="max-w-3xl" />
    </Section>
  )
}

/* ───────────── O que você recebe ───────────── */
function Receive({ ch }: { ch: Chapter }) {
  const { groups } = groupBy(ch.blocks, 'h2')
  return (
    <Section tone="white">
      <Title tone="white">{ch.title}</Title>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={i} delay={i * 120} className="flex flex-col rounded-3xl bg-xr-mint p-8 ring-1 ring-xr-night/5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-xr-night text-[16px] font-black text-xr-lime">0{i + 1}</span>
            <h3 className="mt-6 text-[20px] font-extrabold uppercase leading-tight text-xr-night">{g.title}</h3>
            <Body blocks={g.blocks} tone="mint" runs="list" className="[&_p]:text-[16px]" />
          </Reveal>
        ))}
      </div>
      <Reveal dir="zoom" className="mx-auto mt-16 max-w-4xl">
        <img src={platform} alt="" loading="lazy" className="w-full animate-float drop-shadow-[0_40px_50px_rgba(10,36,20,.35)]" />
      </Reveal>
    </Section>
  )
}

/* ───────────── Linhas com foto ───────────── */
function Feature({ ch, tone, image, side }: { ch: Chapter; tone: 'mint' | 'night' | 'forest' | 'white'; image: string; side: 'left' | 'right' }) {
  return (
    <Section tone={tone}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={side === 'left' ? 'lg:order-2' : ''}>
          <Title tone={tone}>{ch.title}</Title>
          <Body blocks={ch.blocks} tone={tone} />
        </div>
        <Photo src={image} tall dir={side === 'left' ? 'left' : 'right'} className={side === 'left' ? 'lg:order-1' : ''} />
      </div>
    </Section>
  )
}

/* ───────────── Na Black ───────────── */
function BlackBonus({ ch }: { ch: Chapter }) {
  const { intro, groups } = groupBy(ch.blocks, 'h2')
  const last = groups[groups.length - 1]
  const hi = last ? last.blocks.findIndex((b) => b.t === 'h3') : -1
  const closing = last && hi >= 0 ? last.blocks.slice(hi) : []
  if (last && hi >= 0) last.blocks = last.blocks.slice(0, hi)
  const total = closing.find((b) => b.t === 'h3')
  const closingRest = closing.filter((b) => b !== total)

  return (
    <Section tone="mint">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Title tone="mint">{ch.title}</Title>
          <Body blocks={intro} tone="mint" size="lg" />
        </div>
        <Photo src={feed} dir="right" className="mx-auto w-full max-w-[460px]" />
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => {
          const special = /SIMULAPEC/i.test(g.title)
          return (
            <Reveal key={i} delay={(i % 3) * 90} className={`group relative overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1 ${special ? 'bg-xr-night text-white' : 'bg-white ring-1 ring-xr-night/5 hover:shadow-[0_30px_60px_-35px_rgba(10,36,20,.6)]'}`}>
              <span className={`text-[12px] font-black tracking-[0.3em] ${special ? 'text-xr-lime' : 'text-xr-fern'}`}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={`mt-4 text-[18px] font-extrabold uppercase leading-tight ${special ? 'text-xr-lime' : 'text-xr-night'}`}>{g.title}</h3>
              {ps(g.blocks).map((b, j) => (
                <p key={j} className={`mt-3 text-[15px] font-medium leading-relaxed ${special ? 'text-white/80' : 'text-xr-slate'}`}>{b.text}</p>
              ))}
              <span aria-hidden="true" className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-xr-lime/0 transition duration-500 group-hover:bg-xr-lime/25" />
            </Reveal>
          )
        })}
      </div>

      {total && (
        <Reveal className="mt-14 rounded-[28px] bg-xr-forest p-8 text-center text-white sm:p-12">
          <p className="mx-auto max-w-3xl text-[22px] font-extrabold leading-snug sm:text-[32px]">{highlight(total.text, 'R$ 6.970')}</p>
          {closingRest.map((b, i) => (
            <p key={i} className="mx-auto mt-4 max-w-2xl text-[17px] font-medium text-white/85 sm:text-[19px]">{b.text}</p>
          ))}
        </Reveal>
      )}
    </Section>
  )
}

/* ───────────── LabX ───────────── */
function LabX({ ch }: { ch: Chapter }) {
  return (
    <Section tone="white">
      <div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <Reveal dir="zoom">
          <div className="mx-auto max-w-[420px] rounded-[32px] bg-white p-6 shadow-[0_40px_90px_-40px_rgba(10,36,20,.5)] ring-1 ring-xr-night/10">
            <img src={labx} alt="LabX Agroscience" loading="lazy" className="w-full" />
          </div>
        </Reveal>
        <div>
          <Title tone="white">{ch.title}</Title>
          <Body blocks={ch.blocks} tone="white" size="lg" />
        </div>
      </div>
    </Section>
  )
}

/* ───────────── Perspectiva ───────────── */
function Perspective({ ch }: { ch: Chapter }) {
  const p = ps(ch.blocks)
  return (
    <Section tone="night">
      <img src={sunset} alt="" loading="lazy" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.14]" />
      <Title tone="night">{ch.title}</Title>
      <div className="max-w-3xl">
        {p[0] && (
          <Reveal as="p" className="mt-8 text-[26px] font-extrabold leading-[1.2] text-xr-lime sm:text-[38px]">{p[0].text}</Reveal>
        )}
        <Body blocks={ch.blocks.filter((b) => b !== p[0])} tone="night" size="lg" />
      </div>
    </Section>
  )
}

/* ───────────── Para quem / Não é para quem ───────────── */
function Fit({ yes, no }: { yes: Chapter; no: Chapter }) {
  const noP = ps(no.blocks)
  const ei = noP.findIndex((b) => /^O xR Pec exige/.test(b.text))
  const noList = ei < 0 ? noP : noP.slice(0, ei)
  const exigir = ei < 0 ? [] : noP.slice(ei)
  return (
    <Section tone="mint">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal dir="left" className="rounded-[28px] bg-white p-8 shadow-[0_30px_80px_-50px_rgba(10,36,20,.6)] ring-1 ring-xr-night/5 sm:p-10">
          <span className="xr-mark" aria-hidden="true" />
          <h2 className="text-[26px] font-extrabold uppercase leading-[1.1] tracking-tight text-xr-night sm:text-[34px]">{yes.title}</h2>
          <ul className="mt-8 space-y-5">
            {ps(yes.blocks).map((b, i) => (
              <Reveal as="li" key={i} delay={i * 70} className="flex gap-4 text-[16.5px] font-medium leading-snug text-xr-slate">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-xr-lime text-xr-night"><Check className="h-4 w-4" /></span>
                <span><Rich text={b.text} /></span>
              </Reveal>
            ))}
          </ul>
        </Reveal>

        <Reveal dir="right" className="rounded-[28px] bg-xr-night p-8 text-white sm:p-10">
          <span className="mb-6 block h-[10px] w-[10px] bg-xr-ember" aria-hidden="true" />
          <h2 className="text-[26px] font-extrabold uppercase leading-[1.1] tracking-tight sm:text-[34px]">{no.title}</h2>
          <ul className="mt-8 space-y-5">
            {noList.map((b, i) => (
              <Reveal as="li" key={i} delay={i * 80} className="flex gap-4 text-[16.5px] font-medium leading-snug text-white/85">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-xr-ember/15 text-xr-ember"><Cross className="h-4 w-4" /></span>
                <span>{b.text}</span>
              </Reveal>
            ))}
          </ul>
          {exigir.length > 0 && (
            <div className="mt-9 border-t border-white/15 pt-7">
              {exigir.map((b, i) => (
                <p key={i} className={i === 0 ? 'text-[19px] font-extrabold text-xr-lime sm:text-[22px]' : 'mt-2 text-[17px] font-semibold text-white/85'}>{b.text}</p>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  )
}

/* ───────────── Tudo o que você recebe ───────────── */
function Everything({ ch }: { ch: Chapter }) {
  const p = ch.blocks.filter((b) => b.t === 'p')
  const bridgeIdx = p.findIndex((b) => !isBoldOnly(b.text) && p.indexOf(b) > 0 && /condição especial/i.test(b.text))
  const intro = p.find((b) => !isBoldOnly(b.text))
  const items = p.filter((b) => isBoldOnly(b.text))
  const splitAt = bridgeIdx < 0 ? items.length : items.filter((b) => p.indexOf(b) < bridgeIdx).length
  const base = items.slice(0, splitAt)
  const bonus = items.slice(splitAt)
  const bridge = bridgeIdx < 0 ? null : p[bridgeIdx]

  const list = (arr: Block[], accent: boolean, offset = 0) => (
    <ul className="grid gap-3 sm:grid-cols-2">
      {arr.map((b, i) => (
        <Reveal as="li" key={i} delay={((i + offset) % 6) * 60} className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-[16px] font-bold leading-snug ${accent ? 'border border-xr-lime/40 bg-xr-lime/10 text-white' : 'bg-white/[0.06] text-white ring-1 ring-white/10'}`}>
          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${accent ? 'bg-xr-lime text-xr-night' : 'bg-xr-lime/20 text-xr-lime'}`}><Check className="h-4 w-4" /></span>
          <span>{stripBold(b.text)}</span>
        </Reveal>
      ))}
    </ul>
  )

  return (
    <Section tone="night">
      <Title tone="night">{ch.title}</Title>
      {intro && <Reveal as="p" className="mt-6 text-[18px] font-medium text-white/80 sm:text-[21px]">{intro.text}</Reveal>}
      <div className="mt-10">{list(base, false)}</div>
      {bridge && <Reveal as="p" className="mb-6 mt-12 text-[20px] font-extrabold text-xr-lime sm:text-[26px]">{bridge.text}</Reveal>}
      {bonus.length > 0 && list(bonus, true, 2)}
    </Section>
  )
}

/* ───────────── Condição especial ───────────── */
function Offer({ ch }: { ch: Chapter }) {
  const h3 = ch.blocks.find((b) => b.t === 'h3')
  const body = ch.blocks.filter((b) => b.t === 'p')
  return (
    <section id="condicao" className="relative isolate overflow-hidden bg-gradient-to-br from-xr-forest via-xr-leaf to-xr-forest text-white">
      <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-xr-lime/25 blur-[110px]" />
      <div aria-hidden="true" className="absolute -bottom-32 -left-24 -z-10 h-[380px] w-[380px] rounded-full bg-xr-night/60 blur-[110px]" />
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <Reveal><span className="xr-mark mx-auto" aria-hidden="true" /></Reveal>
        <Reveal as="h2" className="text-balance text-[28px] font-extrabold uppercase leading-[1.1] tracking-tight sm:text-[44px]">{ch.title}</Reveal>
        <div className="mx-auto mt-4 max-w-3xl text-left sm:text-center">
          <Body blocks={body} tone="forest" size="lg" />
        </div>
        {h3 && <Reveal as="p" className="mt-12 text-[13px] font-extrabold uppercase tracking-[0.22em] text-xr-lime sm:text-[15px]">{h3.text}</Reveal>}
        <Reveal delay={120} className="mt-6"><CtaButton large pulse /></Reveal>
      </div>
    </section>
  )
}

/* ───────────── A decisão é sua ───────────── */
function Decision({ ch }: { ch: Chapter }) {
  return (
    <Section tone="night">
      <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <Photo src={duo} dir="left" className="lg:sticky lg:top-10" />
        <div>
          <Title tone="night">{ch.title}</Title>
          <Body blocks={ch.blocks} tone="night" size="lg" />
        </div>
      </div>
    </Section>
  )
}

/* ───────────── Fechamento ───────────── */
function Closing({ ch }: { ch: Chapter }) {
  const h2 = ch.blocks.find((b) => b.t === 'h2')
  const bold = ch.blocks.find((b) => b.t === 'p')
  return (
    <section className="relative isolate overflow-hidden bg-xr-night text-white">
      <img src={sunset} alt="" loading="lazy" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-xr-night via-xr-night/70 to-xr-night/90" />
      <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal><XrLogo /></Reveal>
        {h2 && <Reveal as="h2" delay={100} className="mt-10 text-[32px] font-extrabold leading-[1.08] tracking-tight sm:text-[52px]">{highlight(h2.text, 'dentro da porteira.')}</Reveal>}
        {bold && <Reveal as="p" delay={180} className="mx-auto mt-6 max-w-2xl text-[17px] font-medium leading-relaxed text-white/85 sm:text-[20px]"><Rich text={bold.text} /></Reveal>}
        <Reveal delay={260} className="mt-10"><CtaButton large /></Reveal>
      </div>
    </section>
  )
}

/* ───────────── Genérico (se a copy ganhar um capítulo novo) ───────────── */
function Generic({ ch }: { ch: Chapter }) {
  return (
    <Section tone="mint">
      <Title tone="mint">{ch.title}</Title>
      <Body blocks={ch.blocks} tone="mint" size="lg" className="max-w-3xl" />
    </Section>
  )
}

/** Monta a página na ordem da copy, escolhendo o visual de cada capítulo. */
export function renderChapters(chapters: Chapter[]): ReactNode[] {
  const byKey = new Map(chapters.map((c) => [c.key, c]))
  const out: ReactNode[] = []
  for (const ch of chapters) {
    const key = ch.key
    let node: ReactNode
    if (key === 'xr-pec') node = <Opening ch={ch} />
    else if (key === 'xr-pec#2') node = <Closing ch={ch} />
    else if (key.startsWith('o-xr-pec-nao-e-mais-um-curso')) node = <NotACourse ch={ch} />
    else if (key.startsWith('um-metodo')) node = <MethodChapter ch={ch} />
    else if (key.startsWith('por-que-12')) node = <Months ch={ch} />
    else if (key.startsWith('o-que-voce-recebe')) node = <Receive ch={ch} />
    else if (key.startsWith('mentoria')) node = <Feature ch={ch} tone="mint" image={groupMap} side="right" />
    else if (key.startsWith('desafios')) node = <Feature ch={ch} tone="forest" image={challenges} side="left" />
    else if (key.startsWith('6-mesas')) node = <Feature ch={ch} tone="white" image={table} side="right" />
    else if (key.startsWith('inteligencia-artificial')) node = <Feature ch={ch} tone="night" image={ai} side="left" />
    else if (key.startsWith('na-black')) node = <BlackBonus ch={ch} />
    else if (key.startsWith('beneficio-labx')) node = <LabX ch={ch} />
    else if (key.startsWith('agora-coloque')) node = <Perspective ch={ch} />
    else if (key === 'o-xr-pec-e-para-quem') {
      const no = byKey.get('o-xr-pec-nao-e-para-quem')
      node = no ? <Fit yes={ch} no={no} /> : <Generic ch={ch} />
    } else if (key === 'o-xr-pec-nao-e-para-quem') node = byKey.has('o-xr-pec-e-para-quem') ? null : <Generic ch={ch} />
    else if (key.startsWith('tudo-o-que')) node = <Everything ch={ch} />
    else if (key.startsWith('uma-condicao-especial')) node = <Offer ch={ch} />
    else if (key.startsWith('no-fim')) node = <Decision ch={ch} />
    else node = <Generic ch={ch} />
    if (node) out.push(<div key={key}>{node}</div>)
  }
  return out
}

export function SalesFooter() {
  return (
    <div className="bg-xr-night">
      <Footer privacyUrl={PRIVACY_URL} />
      <div className="h-20 sm:h-0" />
    </div>
  )
}
