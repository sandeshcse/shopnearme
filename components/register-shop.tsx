"use client"

import { useState } from "react"
import { ArrowLeft, Upload, MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function RegisterShop() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    openingHours: "",
    category: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-orange-900">Register Your Shop</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-1">Shop Name</label>
                  <Input
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    placeholder="Enter your shop name"
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-1">Owner Name</label>
                  <Input
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter owner's name"
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-1">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-1">Phone Number</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-1">Address</label>
                  <Textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter shop address"
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-1">Shop Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your shop"
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-1">Opening Hours</label>
                  <Input
                    name="openingHours"
                    value={formData.openingHours}
                    onChange={handleChange}
                    placeholder="e.g., 9:00 AM - 9:00 PM"
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-1">Category</label>
                  <Input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Grocery, Electronics, Fashion"
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Register Shop
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 