'use client'

import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const getUsers = () => axios.get<User[]>('/api/users')

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => getUsers().then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  })

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers()

  const handleAssigneeChange = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId !== 'unassigned' ? userId : null,
      })
    } catch (error) {
      toast.error('Failed to update assignee')
    }
  }

  if (isLoading) {
    return <Skeleton height="2rem" />
  }

  if (error) {
    return null
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassigned'}
        onValueChange={handleAssigneeChange}
      >
        <Select.Trigger placeholder="Unassigned" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect
