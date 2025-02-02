import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  title: string;
  price: number;
  imagePlaceholder: string;
  description: string;
}

export function ProductCard({ title, price, imagePlaceholder, description }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
        {imagePlaceholder}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-amber-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-amber-900">${price.toFixed(2)}</span>
          <button className="flex items-center px-3 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}