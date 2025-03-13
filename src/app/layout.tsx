import Script from 'next/script'
import { NuqsAdapter as NuqsNextAdapter } from 'nuqs/adapters/next/app'
import React, { Suspense } from 'react'
import { ReactRouterV6 } from './react-router-v6.client-loader'
import { ReactSPA } from './react-spa.client-loader'

export const metadata = {
  title: 'hydra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <NuqsNextAdapter>{children}</NuqsNextAdapter>
        <Separator />
        <Suspense>
          <ReactSPA />
        </Suspense>
        <Separator />
        <Suspense>
          <ReactRouterV6 />
        </Suspense>
        <Separator />
        <div id="vue" />
        <Script src="/vue.js" />
      </body>
    </html>
  )
}

const Separator = () => (
  <hr style={{ border: 'solid 0.5px lightgray', marginBlock: '2rem' }} />
)
