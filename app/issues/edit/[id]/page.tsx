import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueFormSkeleton from '../../_components/IssueFormSkeleton'
import dynamic from 'next/dynamic'

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

type Props = {
  params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  if (!issue) {
    notFound()
  }

  return <IssueForm issue={issue} />
}

export default EditIssuePage
