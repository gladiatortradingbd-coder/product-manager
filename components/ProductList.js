"use client";

import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div>
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="font-bold text-lg">📊 Summary</h2>
        <p className="text-sm">
          Total Products: <span className="font-bold">{products.length}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;