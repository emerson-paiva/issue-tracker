import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'
import IssueActions from './IssueActions'
import IssueTable, { IssueQuery, issueTableColumnNames } from './IssueTable'

// export const revalidate = 0

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const page = parseInt(searchParams.page) || 1
  const pageSize = 5
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined
  const where = { status }
  const orderBy =
    searchParams.orderBy && issueTableColumnNames.includes(searchParams.orderBy)
      ? {
          [searchParams.orderBy]: ['asc', 'desc'].includes(searchParams.order)
            ? searchParams.order
            : 'asc',
        }
      : undefined

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const itemCount = await prisma.issue.count({
    where,
  })

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={itemCount}
        currentPage={page}
        pageSize={pageSize}
      />
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue List | Issue Tracker',
  description: 'View all proejct issues.',
}

export default IssuesPage
