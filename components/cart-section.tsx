"use client"

import { useState } from "react"
import { X, Trash2, CreditCard, MapPin, Package, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CartItem {
  id: string
  shopId: string
  shopName: string
  name: string
  price: number
  quantity: number
  category: string
  image?: string
}

interface CartSectionProps {
  cart: CartItem[]
  setCart: (cart: CartItem[]) => void
  onClose: () => void
}

interface FormData {
  [key: string]: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  deliveryInstructions: string
}

export default function CartSection({ cart, setCart, onClose }: CartSectionProps) {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    deliveryInstructions: ""
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Calculate subtotal
  const subtotal = cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)

  // Calculate delivery fee
  const deliveryFee = subtotal > 0 ? 40 : 0

  // Calculate total
  const total = subtotal + deliveryFee

  // Remove item from cart
  const removeItem = (itemId: string, shopId: string) => {
    setCart(cart.filter((item: CartItem) => !(item.id === itemId && item.shopId === shopId)))
  }

  // Update item quantity
  const updateQuantity = (itemId: string, shopId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCart(
      cart.map((item: CartItem) => (item.id === itemId && item.shopId === shopId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  // Group cart items by shop
  const groupedCart = cart.reduce((groups: Record<string, CartItem[]>, item: CartItem) => {
    const group = groups[item.shopId] || []
    group.push(item)
    groups[item.shopId] = group
    return groups
  }, {})

  // Validate form data
  const validateForm = () => {
    const errors: Record<string, string> = {}
    const requiredFields = ["address", "city", "state", "zipCode", "phone"]
    
    if (paymentMethod === "card") {
      requiredFields.push("cardNumber", "expiryDate", "cvv", "cardName")
    }

    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = "This field is required"
      }
    })

    // Validate card number format
    if (paymentMethod === "card" && formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Invalid card number"
    }

    // Validate expiry date format
    if (paymentMethod === "card" && formData.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      errors.expiryDate = "Invalid expiry date"
    }

    // Validate CVV format
    if (paymentMethod === "card" && formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = "Invalid CVV"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  // Process payment
  const processPayment = () => {
    if (!validateForm()) return

    setPaymentStatus("processing")

    // Simulate API call
    setTimeout(() => {
      setPaymentStatus("success")

      setTimeout(() => {
        setShowPaymentDialog(false)
        setPaymentStatus("")
        setCart([])
        onClose()
      }, 2000)
    }, 2000)
  }

  return (
    <div className="w-full max-w-md bg-white h-full shadow-xl flex flex-col">
      {/* Cart Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto p-4">
        {Object.keys(groupedCart).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg
              className="w-16 h-16 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedCart).map(([shopId, items]) => (
              <div key={shopId} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <h3 className="font-medium">{items[0].shopName}</h3>
                </div>
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="p-3 flex">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeItem(item.id, item.shopId)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="font-bold text-orange-600">{formatCurrency(item.price)}</p>
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => updateQuantity(item.id, item.shopId, item.quantity - 1)}
                            >
                              <span>-</span>
                            </Button>
                            <span className="mx-2 text-sm w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => updateQuantity(item.id, item.shopId, item.quantity + 1)}
                            >
                              <span>+</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary */}
      <div className="border-t p-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600"
          disabled={cart.length === 0}
          onClick={() => setShowPaymentDialog(true)}
        >
          Checkout
        </Button>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>

          {paymentStatus === "processing" ? (
            <div className="py-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
              <p>Processing your order...</p>
            </div>
          ) : paymentStatus === "success" ? (
            <div className="py-8 flex flex-col items-center">
              <div className="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-lg font-medium text-green-600">Order Placed Successfully!</p>
              <p className="text-gray-500 mt-1">Your order will be delivered soon.</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Package className="h-4 w-4 mr-2" />
                <span>Order #12345</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="space-y-6 flex-1 overflow-y-auto">
                {/* Delivery Address */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Delivery Address
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your street address"
                      />
                      {formErrors.address && (
                        <p className="text-sm text-red-500 mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {formErrors.address}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                        />
                        {formErrors.city && (
                          <p className="text-sm text-red-500 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                        />
                        {formErrors.state && (
                          <p className="text-sm text-red-500 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.state}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="ZIP Code"
                        />
                        {formErrors.zipCode && (
                          <p className="text-sm text-red-500 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.zipCode}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone number"
                        />
                        {formErrors.phone && (
                          <p className="text-sm text-red-500 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</Label>
                      <Textarea
                        id="deliveryInstructions"
                        name="deliveryInstructions"
                        value={formData.deliveryInstructions}
                        onChange={handleInputChange}
                        placeholder="Any special instructions for delivery"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Method
                  </h3>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-3 mt-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                        />
                        {formErrors.cardNumber && (
                          <p className="text-sm text-red-500 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.cardNumber}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                          />
                          {formErrors.expiryDate && (
                            <p className="text-sm text-red-500 mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.expiryDate}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                          />
                          {formErrors.cvv && (
                            <p className="text-sm text-red-500 mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                        />
                        {formErrors.cardName && (
                          <p className="text-sm text-red-500 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.cardName}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Order Summary
                  </h3>
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.shopId}`} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white pt-4 border-t mt-4">
                <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={processPayment}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
