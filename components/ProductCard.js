const ProductCard = ({ product }) => {
  const profit = product.sellingPrice - product.buyingPrice;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Cost:</span>
          <span className="font-medium">${product.buyingPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Price:</span>
          <span className="font-medium text-green-600">${product.sellingPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Profit:</span>
          <span className={`font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${profit}
          </span>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="flex-1 bg-blue-500 text-white py-2 rounded text-sm">
          View
        </button>
        <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded text-sm">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductCard;