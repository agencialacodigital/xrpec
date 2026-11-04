import raw from './copy.md?raw'
import { parseCopy, type Chapter } from './parse'

export const CHAPTERS: Chapter[] = parseCopy(raw)

/** Texto do botão de ação: é o último subtítulo da própria copy. */
export const CTA_LABEL: string = (() => {
  const last = CHAPTERS[CHAPTERS.length - 1]
  const h3 = [...last.blocks].reverse().find((b) => b.t === 'h3')
  return h3 ? h3.text : 'Veja sua condição especial da Black'
})()
