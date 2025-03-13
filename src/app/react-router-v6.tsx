'use client'

import { NuqsAdapter } from 'nuqs/adapters/react-router/v6'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Client } from './_components/client'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Client title="React Router v6" />} />
  )
)

export default function ReactRouterV6() {
  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  )
}
