'use client'

import { NuqsAdapter, enableHistorySync } from 'nuqs/adapters/react'
import { Client } from './_components/client'

enableHistorySync()

export default function ReactSPA() {
  return (
    <NuqsAdapter>
      <Client title="React SPA" />
    </NuqsAdapter>
  )
}
