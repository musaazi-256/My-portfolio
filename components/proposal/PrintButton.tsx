'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-primary no-print gap-2"
    >
      <Printer className="h-4 w-4" />
      Export / Print PDF
    </button>
  )
}
