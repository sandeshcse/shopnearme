import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-900 border-t border-orange-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About Us</h3>
            <p className="text-orange-700">
              Shop Near Me helps you discover and support local businesses in your area. 
              Find unique products and services from your neighborhood.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-orange-700 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shops" className="text-orange-700 hover:text-orange-500 transition-colors">
                  Shops
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-orange-700 hover:text-orange-500 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-orange-700 hover:text-orange-500 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-orange-700">
                <Mail className="h-5 w-5" />
                <span>support@shopnearme.com</span>
              </li>
              <li className="flex items-center space-x-2 text-orange-700">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-orange-700">
                <MapPin className="h-5 w-5" />
                <span>123 Main Street, City</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-orange-700 hover:text-orange-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-orange-700 hover:text-orange-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-orange-700 hover:text-orange-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-orange-200 mt-8 pt-8 text-center text-orange-700">
          <p>&copy; {new Date().getFullYear()} Sandesh-Priyanshu-Dipendra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 