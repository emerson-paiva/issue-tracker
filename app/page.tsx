import prisma from '@/prisma/client'
import { Flex, Grid } from '@radix-ui/themes'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import { Metadata } from 'next'

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: 'OPEN',
    },
  })
  const inProgress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS',
    },
  })
  const closed = await prisma.issue.count({
    where: {
      status: 'CLOSED',
    },
  })

  const counts = {
    open,
    inProgress,
    closed,
  }

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...counts} />
        <IssueChart {...counts} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Dashboard | Issue Tracker',
  description: 'View the latest issues and their status.',
}
