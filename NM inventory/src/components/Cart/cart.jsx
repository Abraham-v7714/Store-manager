import React from "react";
import { useCart, useCartDispatch } from "../../context/CartContext";
import { useInventoryDispatch, useInventory } from "../../context/InventoryContext";
import { useSalesDispatch } from "../../context/SalesContext";

const Cart = () => {
  const cart = useCart();
  const cartDispatch = useCartDispatch();
  const inventory = useInventory();
  const inventoryDispatch = useInventoryDispatch();
  const salesDispatch = useSalesDispatch();

  const handleIncrease = (item) => {
    const productInInventory = inventory.find(p => p.productName === item.productName);
    if (!productInInventory || item.quantity >= productInInventory.stock) {
      alert("Cannot exceed available stock");
      return;
    }
    cartDispatch({ type: "INCREASE_QUANTITY", productName: item.productName });
  };

  const handleDecrease = (item) => {
    cartDispatch({ type: "DECREASE_QUANTITY", productName: item.productName });
  };

  const handleRemove = (item) => {
    cartDispatch({ type: "REMOVE_ITEM", productName: item.productName });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // 1. Add sale record
    const saleItems = cart.map(item => ({ ...item }));
    const totalValue = saleItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    salesDispatch({
      type: "NEW_SALE",
      sale: {
        items: saleItems,
        saleValue: totalValue,
        datetime: new Date(),
      },
    });

    // 2. Reduce stock in inventory
    cart.forEach(item => {
      inventoryDispatch({
        type: "STOCK_REMOVED",
        productName: item.productName,
        stock: item.quantity,
      });
    });

    // 3. Clear cart
    cartDispatch({ type: "CLEAR_CART" });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.productName} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.productName}</h2>
                    <p className="text-gray-600">₹{item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-bold"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-semibold text-gray-700">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="font-semibold text-xl">Total: ₹{totalAmount.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
