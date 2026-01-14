import ProductList from '@/components/ProductList';
import fakeProducts from '@/utils/data';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Manager</h1>
        <p className="text-gray-600">Manage your inventory and track profits</p>
      </header>

      <main>
        <ProductList products={fakeProducts} />
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Day 1 Complete! Showing {fakeProducts.length} products</p>
      </footer>
    </div>
  );
}