import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import raw from '../src/content/copy.md?raw'
import { CHAPTERS } from '../src/content/copy'
import { parseCopy } from '../src/content/parse'
import SalesPage from '../src/sales/SalesPage'

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, '')

describe('página de vendas', () => {
  it('encontra todos os capítulos da copy', () => {
    expect(CHAPTERS.length).toBe(18)
    expect(parseCopy(raw)[0].key).toBe('xr-pec')
    expect(CHAPTERS.at(-1)!.key).toBe('xr-pec#2')
  })

  it('mostra cada linha da copy sem alterar o texto', () => {
    const html = decode(renderToStaticMarkup(<SalesPage />))
    const lines = raw
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && l !== '---')
      .map((l) => l.replace(/^#{1,3}\s+/, '').replace(/\*\*/g, '').replace(/^[“"]|[”"]$/g, ''))
    const missing = lines.filter((l) => !html.includes(l.replace(/\s+/g, '')))
    expect(missing).toEqual([])
  })

  it('não mostra preço antes da consulta (só o R$ 6.970 de conteúdo da própria copy)', () => {
    const html = renderToStaticMarkup(<SalesPage />)
    expect(html).not.toMatch(/3\.447|2\.947|1\.973|3\.947/)
    expect(html).not.toMatch(/lastlink/i)
  })
})
