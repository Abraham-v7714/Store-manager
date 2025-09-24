import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import ProductList from "./productList.jsx";

export default function ProductCatalog() {
    const inventory = useInventory();
    const [searchQuery, setSearchQuery] = useState("");

    // Only show products that have stock > 0 and match search query
    const filteredProducts = inventory.filter(
        (item) =>
            item.stock > 0 &&
            item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
                Product Catalog
            </h1>

            {/* Search Bar */}
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-96 border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Product List */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <ProductList products={filteredProducts} />
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-6">No products found.</p>
            )}
        </div>
    );
}
