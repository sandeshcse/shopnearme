import Image from 'next/image';
import Link from 'next/link';

interface ShopCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  distance: string;
  isOpen: boolean;
  timing: string;
}

const ShopCard = ({ id, name, image, category, rating, distance, isOpen, timing }: ShopCardProps) => {
  return (
    <Link href={`/shop/${id}`}>
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
            {distance}
          </div>
          <div className="absolute bottom-3 left-3 flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {isOpen ? 'Open' : 'Closed'}
            </span>
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              {timing}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-1">{name}</h3>
              <div className="text-sm font-medium text-indigo-500">{category}</div>
            </div>
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 font-medium text-gray-700">{rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timing}
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors duration-200">
              View Menu →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard; 