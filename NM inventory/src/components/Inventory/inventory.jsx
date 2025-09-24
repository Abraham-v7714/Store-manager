import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import Product from './product.jsx';

const Inventory = () => {
    const inventory = useInventory();
    const [alertValue, setAlertValue] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [showOnlyDepleted, setShowOnlyDepleted] = useState(false);

    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const filteredInventory = inventory.filter((product) => {
        const matchesSearchQuery = product.productName.toLowerCase().includes(lowerCaseSearchQuery);
        const isDepleted = product.stock < alertValue;
        return showOnlyDepleted ? (matchesSearchQuery && isDepleted) : matchesSearchQuery;
    });

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Inventory</h1>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search inventory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-1/2 p-2 sm:p-3 border border-gray-300 rounded-lg shadow-inner text-gray-700 placeholder-gray-400"
                />

                <div className="flex flex-wrap items-center gap-4">
                    <label htmlFor="alert-value" className="font-medium">Alert Value</label>
                    <input
                        id="alert-value"
                        type="number"
                        value={alertValue}
                        onChange={(e) => setAlertValue(e.target.value)}
                        className="w-20 p-2 border border-gray-300 rounded-lg text-gray-700"
                    />

                    <label htmlFor="show-only-depleted" className="font-medium">Show Only Depleted</label>
                    <input
                        id="show-only-depleted"
                        type="checkbox"
                        checked={showOnlyDepleted}
                        onChange={() => setShowOnlyDepleted(!showOnlyDepleted)}
                        className="w-8 h-8 text-blue-600 rounded"
                    />
                </div>
            </div>

            {/* Inventory Grid */}
            {filteredInventory.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredInventory.map((product) => (
                        <Product key={product.productName} product={product} alertValue={alertValue} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No inventory items found.</p>
            )}
        </div>
    );
};

export default Inventory;
