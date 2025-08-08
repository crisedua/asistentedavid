'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function SiteHeader() {
  return (
    <header className="w-full bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-center">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/logo-smartdecision.svg"
            alt="SmartDecision"
            width={180}
            height={56}
            priority
          />
        </Link>
      </div>
    </header>
  )
}


