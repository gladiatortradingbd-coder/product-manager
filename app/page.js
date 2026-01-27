"use client"; // Required for React state

import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import productsData from '@/utils/data';

export default function Home() {
  // State to manage products
  const [products, setProducts] = useState(productsData);
  
  // State for product form (used for both add and edit)
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    buyingPrice: '',
    sellingPrice: '',
    notes: '',
    image: ''
  });
  
  // State for form mode and visibility
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [showForm, setShowForm] = useState(false);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for delete confirmation
  const [productToDelete, setProductToDelete] = useState(null);

  // Calculate total products
  const totalProducts = products.length;

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    const options = {
      keys: [
        'name',
        'description', 
        'notes'
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 1 // User's customization
    };
    return new Fuse(products, options);
  }, [products]);

  // Filter products based on search
  const filteredProducts = searchTerm 
    ? fuse.search(searchTerm).map(result => result.item)
    : products;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle Add Product button click
  const handleAddClick = () => {
    setFormMode('add');
    setFormData({
      id: null,
      name: '',
      description: '',
      buyingPrice: '',
      sellingPrice: '',
      notes: '',
      image: ''
    });
    setShowForm(true);
  };

  // Handle Edit button click
  const handleEditClick = (product) => {
    setFormMode('edit');
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
      notes: product.notes,
      image: product.image
    });
    setShowForm(true);
  };

  // Handle form submission (for both add and edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formMode === 'add') {
      // Add new product
      const productToAdd = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: formData.name,
        description: formData.description,
        buyingPrice: parseFloat(formData.buyingPrice) || 0,
        sellingPrice: parseFloat(formData.sellingPrice) || 0,
        notes: formData.notes,
        image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
      };

      setProducts([...products, productToAdd]);
      
    } else if (formMode === 'edit') {
      // Update existing product
      const updatedProducts = products.map(product =>
        product.id === formData.id
          ? {
              ...product,
              name: formData.name,
              description: formData.description,
              buyingPrice: parseFloat(formData.buyingPrice) || 0,
              sellingPrice: parseFloat(formData.sellingPrice) || 0,
              notes: formData.notes,
              image: formData.image || product.image
            }
          : product
      );
      
      setProducts(updatedProducts);
    }
    
    // Reset form and hide
    setFormData({
      id: null,
      name: '',
      description: '',
      buyingPrice: '',
      sellingPrice: '',
      notes: '',
      image: ''
    });
    setShowForm(false);
    setFormMode('add');
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      id: null,
      name: '',
      description: '',
      buyingPrice: '',
      sellingPrice: '',
      notes: '',
      image: ''
    });
    setShowForm(false);
    setFormMode('add');
  };

  // Handle Delete button click
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setProductToDelete(null);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setProductToDelete(null);
  };

  // Handle search clear
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-bold">"{productToDelete.name}"</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Manager</h1>
        <p className="text-gray-600">Day 4 - Edit/Delete Functionality</p>
      </header>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-black">🔍</span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products... Try 'iphne', 'macbok', or 'samung'"
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-black hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        <div className="mt-2 text-sm text-black">
          <span className="font-medium">Fuzzy search active:</span> Finds products even with typos
          {searchTerm && (
            <span className="ml-2 text-black">
              • Showing {filteredProducts.length} of {products.length} products
            </span>
          )}
        </div>
      </div>

      {/* Stats Summary and Add Button */}
      <div className="w-full mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm text-gray-900">Total Products</h3>
              <p className="text-2xl font-bold  text-gray-900">{totalProducts}</p>
              <p className="text-xs text-black mt-1">
                
                {filteredProducts.length === products.length 
                  ? 'Showing all products' 
                  : `Filtered: ${filteredProducts.length} products`}
              </p>
            </div>
            <button
              onClick={handleAddClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <span className="mr-2">+</span> Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Product Form (Add/Edit) */}
      {showForm && (
        <div className="bg-white text-black rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {formMode === 'add' ? 'Add New Product' : 'Edit Product'}
          </h2>
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
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
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
                  value={formData.buyingPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
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
                  value={formData.sellingPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
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
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
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
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
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
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
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
                {formMode === 'add' ? 'Add Product' : 'Update Product'}
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
                        <button
                          onClick={() => handleEditClick(product)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-black text-6xl mb-4">📦</div>
                    <h3 className="text-lg font-medium text-gray-700">No products found</h3>
                    <p className="text-gray-500 mt-2">
                      {searchTerm 
                        ? `No results for "${searchTerm}"` 
                        : 'Click "Add Product" to get started'}
                    </p>
                    {searchTerm && (
                      <button
                        onClick={handleClearSearch}
                        className="mt-4 text-blue-600 hover:text-blue-800"
                      >
                        Clear search
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center text-gray-500 text-sm">
          <p>
            ✅ Day 4 Complete - Full CRUD Operations in React State
          </p>
          <div className="mt-2 bg-green-50 p-3 rounded-lg inline-block">
            <p className="font-medium text-green-800">Now Working:</p>
            <p className="text-green-700">
              Create • Read • Update • Delete • Search
            </p>
          </div>
          <p className="mt-2">
            <span className="text-blue-600">Next:</span> Day 5 - MongoDB Integration
          </p>
          <p className="text-xs text-black mt-1">
            Note: Data is still in React state. Will persist after Day 5 MongoDB integration.
          </p>
        </div>
      </footer>
    </div>
  );
}