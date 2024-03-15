'use client'

import { Skeleton } from '@/app/components'
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issues/list' },
]

export const Navbar = () => (
  <nav className="border-b mb-5 px-5 py-3">
    <Container>
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href="/">
            <AiFillBug aria-label="Logo" />
          </Link>
          <NavigationLinks />
        </Flex>

        <UserMenu />
      </Flex>
    </Container>
  </nav>
)

const NavigationLinks = () => {
  const currentPath = usePathname()

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames('nav-link', {
              '!text-zinc-900': link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const UserMenu = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Skeleton width="2.33rem" height="2.33rem" circle />
  }

  if (status === 'unauthenticated') {
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    )
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            src={session!.user!.image!}
            fallback="?"
            size="3"
            radius="full"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content sideOffset={5}>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}
