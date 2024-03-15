import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { RxPencil2 } from 'react-icons/rx'

const EditIssueButton = ({ issueId }: { issueId: number }) => (
  <Button>
    <RxPencil2 />
    <Link href={`/issues/edit/${issueId}`}> Edit Issue</Link>
  </Button>
)

export default EditIssueButton
