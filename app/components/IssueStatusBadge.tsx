import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const COLORS: Record<
  Status,
  {
    label: string
    color: 'red' | 'violet' | 'green'
  }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
}

type IssueStatusBadgeProps = {
  status: Status
}

export const IssueStatusBadge = ({ status }: IssueStatusBadgeProps) => {
  return <Badge color={COLORS[status].color}>{COLORS[status].label}</Badge>
}
