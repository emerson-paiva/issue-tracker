import { Box } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'

const IssueFormSkeleton = () => (
  <Box className="max-w-xl">
    <Skeleton height="1.8rem" className="mb-2" />
    <Skeleton height="23rem" />
  </Box>
)

export default IssueFormSkeleton
