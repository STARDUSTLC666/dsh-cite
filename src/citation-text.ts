/** Display text and literal identifiers have different normalization rules. */
export function literalText(value: unknown): string {
  if (value === undefined || value === null) return ''
  if (typeof value !== 'string' && typeof value !== 'number') throw new Error('文献字段不是文本。')
  const text = String(value)
  if (text.length > 16384) throw new Error('单个文献字段过长，请拆分或检查原始数据。')
  return text.trim()
}
export function plainText(value: unknown): string {
  return literalText(value).replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g, token => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&nbsp;': ' ' }[token]!))
    .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code: string) => { const n = code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : Number(code); return n > 0 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : '�' })
    .replace(/\s+/g, ' ').trim()
}
/** Strip known JATS/CSL formatting only at provider/parser adapters, never from identifiers. */
export function providerText(value: unknown): string {
  return plainText(literalText(value).replace(/<\/?(?:(?:jats|mml):[a-z][\w.-]*|(?:i|b|em|strong|sub|sup|span|p|br|italic|bold|title|sc))\b[^<>]*>/gi, ''))
}
