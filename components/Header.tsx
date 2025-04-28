"use client"

import Link from "next/link"
import { Search, ShoppingCart, MapPin, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Image from 'next/image'

const Header = () => {
  const [cartItems, setCartItems] = useState(0) // This should be connected to your actual cart state

  return (
    <header className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-900 shadow-md relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-200/30 blur-xl"></div>
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-300/30 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 h-20 w-20 rounded-full bg-orange-200/20 blur-lg"></div>
      <div className="absolute top-1/2 right-1/4 h-20 w-20 rounded-full bg-orange-300/20 blur-lg"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center h-24">
          <Link href="/" className="flex flex-col items-center transform hover:scale-105 transition-transform duration-200">
            <div className="rounded-xl relative">
              <div className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-orange-300/60"></div>
              <div className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full bg-orange-400/60"></div>
              <Image
                src="/logoo.png"
                alt="Shop Near Me Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold mt-2 text-orange-900">
              Shop Near Me
            </h1>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header 