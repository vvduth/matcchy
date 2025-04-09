'use client'
import React from 'react'
import Link from 'next/link'
import {  NavbarItem } from '@heroui/react'
import { usePathname } from 'next/navigation'
import { useMessageStore } from '@/hooks/useMessageStore'
type Props = {
    label: string, 
    href: string
}

const NavLink = ({label, href}: Props) => {
  const pathname = usePathname()
  const unreadCount = useMessageStore(state => state.unreadCount)
  
  return (
    <NavbarItem isActive={pathname===href} as={Link} href={href}>
         <span> {label}</span>
         {href === '/messages' && unreadCount > 0 && (
                <span>({unreadCount})</span>
            )}
        </NavbarItem>
  )
}

export default NavLink