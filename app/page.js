import products from "@/utils/data";

export default function Home() {
  // Calculate total products and value
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Manager</h1>
        <p className="text-gray-600">Simple product listing - Day 1.1</p>
      </header>

      {/* Stats Summary */}
      <div className="w-full mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Buy Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Sell Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  {/* Image */}
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  {/* Product Name */}
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {product.id}
                    </div>
                  </td>

                  {/* Buying Price */}
                  <td className="px-6 py-4">
                    <div className="text-gray-900">${product.buyingPrice}</div>
                  </td>

                  {/* Selling Price */}
                  <td className="px-6 py-4">
                    <div className="text-green-600 font-medium">
                      ${product.sellingPrice}
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 max-w-xs">
                      {product.description}
                    </div>
                  </td>

                  {/* Notes */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{product.notes}</div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                        View
                      </button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center text-gray-500 text-sm">
          <p>
            ✅ Day 1.1 Complete - Showing {totalProducts} products with all
            fields
          </p>
          <p className="mt-1">Next: Day 2 - Add Product Form</p>
        </div>
      </footer>
    </div>
  );
}
