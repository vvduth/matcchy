import Link from 'next/link'
import React from 'react'
import { GiMatchTip } from 'react-icons/gi'

const Footer = () => {
  return (
    
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GiMatchTip size={30} className="text-secondary-500" />
            <span className="ml-2 text-xl font-semibold">matchyy</span>
          </div>
          
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-secondary-400 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-secondary-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-secondary-400 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-secondary-400 transition-colors">Contact</Link>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-gray-400">
            © {new Date().getFullYear()} matchyy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
