import { redirect } from 'next/navigation'
import { DESIGN_QUOTE } from './data'

/* The WRA quote is now two separate documents; old links land on the design quotation. */
export default async function WraQuotationIndex({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const params = searchParams ? await searchParams : {}
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string') query.set(key, value)
  })
  const qs = query.toString()
  redirect(qs ? `${DESIGN_QUOTE.href}?${qs}` : DESIGN_QUOTE.href)
}
