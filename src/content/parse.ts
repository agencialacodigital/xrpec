/**
 * Lê a copy (markdown simples) e devolve capítulos.
 * A copy fica em `copy.md`, exatamente como foi enviada; aqui só se separa em blocos.
 */
export type BlockType = 'h2' | 'h3' | 'p'
export interface Block {
  t: BlockType
  text: string
}
export interface Chapter {
  /** Chave estável derivada do título (h1). Repetidos ganham `#2`. */
  key: string
  title: string
  blocks: Block[]
}

export const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export function parseCopy(md: string): Chapter[] {
  const chapters: Chapter[] = []
  const seen = new Map<string, number>()
  let current: Chapter | null = null

  for (const raw of md.replace(/\r/g, '').split('\n')) {
    const line = raw.trim()
    if (!line || line === '---') continue

    const h = /^(#{1,3})\s+(.*)$/.exec(line)
    if (h) {
      const level = h[1].length
      const text = h[2].trim()
      if (level === 1) {
        const base = slug(text)
        const n = (seen.get(base) ?? 0) + 1
        seen.set(base, n)
        current = { key: n === 1 ? base : `${base}#${n}`, title: text, blocks: [] }
        chapters.push(current)
      } else if (current) {
        current.blocks.push({ t: level === 2 ? 'h2' : 'h3', text })
      }
      continue
    }
    if (current) current.blocks.push({ t: 'p', text: line })
  }
  return chapters
}

/** Linha inteira em negrito (usada como frase de destaque). */
export const isBoldOnly = (t: string) => /^\*\*[^*]+\*\*$/.test(t)
export const stripBold = (t: string) => t.replace(/\*\*/g, '')
export const isQuote = (t: string) => /^[“"].*[”"]$/.test(t)

/** Divide blocos em introdução + grupos iniciados por um subtítulo do nível dado. */
export function groupBy(blocks: Block[], level: 'h2' | 'h3') {
  const intro: Block[] = []
  const groups: { title: string; blocks: Block[] }[] = []
  for (const b of blocks) {
    if (b.t === level) groups.push({ title: b.text, blocks: [] })
    else if (groups.length) groups[groups.length - 1].blocks.push(b)
    else intro.push(b)
  }
  return { intro, groups }
}
