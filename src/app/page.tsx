import { Suspense } from 'react'
import { Client } from './_components/client'

export default function Page() {
  return (
    <Suspense>
      <Client title="Next.js" />
    </Suspense>
  )
}
