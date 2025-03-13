'use client'

import dynamic from 'next/dynamic'

export const ReactRouterV6 = dynamic(() => import('./react-router-v6'), {
  loading: () => <p>Loading React Router v6...</p>,
  ssr: false
})
