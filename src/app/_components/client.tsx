'use client'

import { parseAsInteger, useQueryState } from 'nuqs'

type ClientProps = {
  title: string
}

export function Client({ title }: ClientProps) {
  const [count, setCount] = useQueryState(
    'count',
    parseAsInteger.withDefault(0)
  )
  return (
    <section>
      <h2>{title}</h2>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <button style={{ width: '4rem' }} onClick={() => setCount(null)}>
          Clear
        </button>
        <button style={{ width: '4rem' }} onClick={() => setCount(c => c + 1)}>
          {count}
        </button>
      </div>
    </section>
  )
}
