"use client"

import { useState } from "react"
import { Search, MapPin, ShoppingBag, Star, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { shopData, shopCategories } from "@/data/shops"
import { formatCurrency } from "@/lib/utils"
import CartSection from "@/components/cart-section"
import { toast } from "sonner"
import Link from "next/link"

export default function ShopNearMe() {
  const [location, setLocation] = useState("")
  const [showLocationDialog, setShowLocationDialog] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedShop, setSelectedShop] = useState(null)
  const [productSearchQuery, setProductSearchQuery] = useState("")
  const [productCategory, setProductCategory] = useState("all")
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  // Filter shops based on category and search query
  const filteredShops = shopData.filter((shop) => {
    const matchesCategory = selectedCategory === "all" || shop.category === selectedCategory
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get unique product categories for the selected shop
  const getProductCategories = () => {
    if (!selectedShop) return []
    const categories = selectedShop.products.map((product) => product.category)
    return ["all", ...new Set(categories)]
  }

  // Filter products based on category and search query
  const filteredProducts =
    selectedShop?.products.filter((product) => {
      const matchesCategory = productCategory === "all" || product.category === productCategory
      const matchesSearch = product.name.toLowerCase().includes(productSearchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    }) || []

  // Handle location submission
  const handleLocationSubmit = () => {
    if (location.trim()) {
      setShowLocationDialog(false)
    }
  }

  // Use current location
  const handleUseCurrentLocation = () => {
    setLocation("Current Location (Simulated)")
    setShowLocationDialog(false)
  }

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id && item.shopId === selectedShop.id)

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.shopId === selectedShop.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      )
      toast.success(`${product.name} quantity increased in cart`)
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          shopId: selectedShop.id,
          shopName: selectedShop.name,
        },
      ])
      toast.success(`${product.name} added to cart`)
    }
  }

  // View shop products
  const viewShopProducts = (shop) => {
    setSelectedShop(shop)
    setProductCategory("all")
    setProductSearchQuery("")
  }

  // Back to shop list
  const backToShopList = () => {
    setSelectedShop(null)
  }

  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart)
  }

  return (
    <div className="relative">
      {/* Location Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Your Location</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Input
              placeholder="Enter your address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleLocationSubmit} className="w-full">
              Continue
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>
            <Button variant="outline" onClick={handleUseCurrentLocation} className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Use Current Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header with location and cart */}
      <div className="flex justify-between items-center mb-6 p-4 bg-orange-50 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-orange-900">Shop Near Me</h2>
          {location && (
            <div className="flex items-center text-sm text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          )}
        </div>
        <Button 
          variant="outline" 
          onClick={toggleCart} 
          className="relative bg-orange-100 hover:bg-orange-200 border-orange-200 text-orange-900"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          <span>Cart</span>
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </Badge>
          )}
        </Button>
      </div>

      {/* Cart Section */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <CartSection cart={cart} setCart={setCart} onClose={() => setShowCart(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {!selectedShop ? (
          // Shop Listing
          <>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search shops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {shopCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Register Your Shop Button */}
            <div className="mb-6">
              <Link href="/register-shop">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Register Your Shop</Button>
              </Link>
            </div>

            {/* Shop List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <Card key={shop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={shop.image || "/placeholder.svg"}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-orange-500">{shop.distance} km</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{shop.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm">{shop.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{shop.category}</p>
                    <p className="text-gray-600 text-sm mt-2">{shop.address}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Badge variant="outline" className="text-xs">
                      {shop.products.length} products
                    </Badge>
                    <Button onClick={() => viewShopProducts(shop)}>View Products</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredShops.length === 0 && (
              <div className="text-center py-10">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No shops found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        ) : (
          // Shop Products
          <>
            {/* Shop Header */}
            <div className="flex items-center mb-6">
              <Button variant="ghost" onClick={backToShopList} className="mr-2">
                <X className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h3 className="text-xl font-bold">{selectedShop.name}</h3>
              <div className="ml-auto flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1">{selectedShop.rating}</span>
              </div>
            </div>

            {/* Product Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={productCategory} onValueChange={setProductCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {getProductCategories().map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-64">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">{product.category}</Badge>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-orange-600">{formatCurrency(product.price)}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-xs">{product.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-10">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No products found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Shop Reviews Section */}
            <div className="mt-10">
              <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {selectedShop.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
