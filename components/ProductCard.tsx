import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  shopName: string;
  distance: string;
}

const ProductCard = ({ id, name, price, image, category, rating, shopName, distance }: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link href={`/product/${id}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-indigo-600">
            {distance}
          </div>
        </div>
        <div className="p-4">
          <div className="text-xs font-medium text-indigo-500 mb-1">{category}</div>
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{name}</h3>
          <div className="text-sm text-gray-600 mb-2">{shopName}</div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-900">₹{price}</div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-600">{rating}</span>
            </div>
          </div>
        </div>
      </Link>
      <button className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

export default ProductCard; 