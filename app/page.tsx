import ShopCard from '@/components/ShopCard';
import ProductCard from '@/components/ProductCard';
import ShopNearMe from '@/components/shop-near-me'

// Sample data - In a real app, this would come from an API
const shops = [
  {
    id: '1',
    name: 'Fashion Store',
    image: '/shop1.jpg',
    category: 'Fashion & Apparel',
    rating: 4.5,
    distance: '0.5 km',
    isOpen: true,
    timing: '9 AM - 9 PM'
  },
  {
    id: '2',
    name: 'Electronics Hub',
    image: '/shop2.jpg',
    category: 'Electronics',
    rating: 4.8,
    distance: '1.2 km',
    isOpen: true,
    timing: '10 AM - 8 PM'
  },
  {
    id: '3',
    name: 'Grocery Market',
    image: '/shop3.jpg',
    category: 'Groceries',
    rating: 4.2,
    distance: '0.8 km',
    isOpen: false,
    timing: '8 AM - 10 PM'
  }
];

const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 2999,
    image: '/product1.jpg',
    category: 'Electronics',
    rating: 4.5,
    shopName: 'Electronics Hub',
    distance: '1.2 km'
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    price: 599,
    image: '/product2.jpg',
    category: 'Fashion',
    rating: 4.3,
    shopName: 'Fashion Store',
    distance: '0.5 km'
  },
  {
    id: '3',
    name: 'Fresh Vegetables Pack',
    price: 199,
    image: '/product3.jpg',
    category: 'Groceries',
    rating: 4.7,
    shopName: 'Grocery Market',
    distance: '0.8 km'
  },
  {
    id: '4',
    name: 'Smart Watch',
    price: 4999,
    image: '/product4.jpg',
    category: 'Electronics',
    rating: 4.6,
    shopName: 'Electronics Hub',
    distance: '1.2 km'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopNearMe />
    </div>
  );
}
