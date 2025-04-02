'use client'
import React from 'react'
import Link from 'next/link'
import {  NavbarItem } from '@heroui/react'
import { usePathname } from 'next/navigation'
type Props = {
    label: string, 
    href: string
}

const NavLink = ({label, href}: Props) => {
  const pathname = usePathname()
  return (
    <NavbarItem isActive={pathname===href} as={Link} href={href}>
          {label}
        </NavbarItem>
  )
}

export default NavLink