'use client'

import dynamic from 'next/dynamic'

export const ReactSPA = dynamic(() => import('./react-spa'), {
  loading: () => <p>Loading React SPA...</p>,
  ssr: false
})
