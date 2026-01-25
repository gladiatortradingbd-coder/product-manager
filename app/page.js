"use client"; // Required for React state

import { useState } from "react";
import productsData from "@/utils/data";

export default function Home() {
  // State to manage products
  const [products, setProducts] = useState(productsData);

  // State for new product form
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    buyingPrice: "",
    sellingPrice: "",
    notes: "",
    image: "",
  });

  // State for form visibility
  const [showForm, setShowForm] = useState(false);

  // Calculate total products
  const totalProducts = products.length;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new product object
    const productToAdd = {
      id: products.length + 1,
      name: newProduct.name,
      description: newProduct.description,
      buyingPrice: parseFloat(newProduct.buyingPrice) || 0,
      sellingPrice: parseFloat(newProduct.sellingPrice) || 0,
      notes: newProduct.notes,
      image:
        newProduct.image ||
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    };

    // Add to products array
    setProducts([...products, productToAdd]);

    // Reset form
    setNewProduct({
      name: "",
      description: "",
      buyingPrice: "",
      sellingPrice: "",
      notes: "",
      image: "",
    });

    // Hide form
    setShowForm(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setNewProduct({
      name: "",
      description: "",
      buyingPrice: "",
      sellingPrice: "",
      notes: "",
      image: "",
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Manager</h1>
        <p className="text-gray-600">
          Day 2 - Add Product Form (Temporary Storage)
        </p>
      </header>

      {/* Stats Summary */}
      <div className="w-full mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm text-gray-500">Total Products</h3>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Buying Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Buying Price *
                </label>
                <input
                  type="number"
                  name="buyingPrice"
                  value={newProduct.buyingPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Selling Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price *
                </label>
                <input
                  type="number"
                  name="sellingPrice"
                  value={newProduct.sellingPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Leave empty for default image"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="2"
                  required
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={newProduct.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="2"
                />
              </div>
            </div>

            {/* Form Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}

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
          <p>✅ Day 2 Complete - Add Product Form (Temporary State)</p>
          <p className="mt-1">
            <span className="text-blue-600">Note:</span> Products stored in
            React state - will reset on page refresh
          </p>
          <p className="mt-1">
            Day 3: Fuzzy Search | Day 5: MongoDB Integration
          </p>
        </div>
      </footer>
    </div>
  );
}
