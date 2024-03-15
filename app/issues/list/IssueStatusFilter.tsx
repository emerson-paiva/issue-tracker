'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string; value?: Status }[] = [
  {
    label: 'All',
  },
  {
    label: 'Open',
    value: 'OPEN',
  },
  {
    label: 'In Progress',
    value: 'IN_PROGRESS',
  },
  {
    label: 'Closed',
    value: 'CLOSED',
  },
]

// Criar video comparando usar parametros assim ao invés de um estado global/context
const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onValueChange = (status: string) => {
    const params = new URLSearchParams()

    status !== 'all' && params.append('status', status)
    searchParams.get('orderBy') &&
      params.append('orderBy', searchParams.get('orderBy')!)
    searchParams.get('order') &&
      params.append('order', searchParams.get('order')!)

    router.push(`/issues/list${params.size && `?${params.toString()}`}`)
  }

  return (
    <Select.Root
      onValueChange={onValueChange}
      defaultValue={searchParams.get('status') ?? 'all'}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value ?? 'all'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
