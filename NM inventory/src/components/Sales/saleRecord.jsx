import React from "react";

const SaleRecord = ({ sale, saleId }) => {
  if (!sale || !sale.items) return null;

  return (
    <div className="border border-gray-300 shadow-sm rounded-lg p-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Sale #{saleId + 1}</h2>
        <span className="text-sm text-gray-500">
          {new Date(sale.datetime).toLocaleString()}
        </span>
      </div>

      {/* Total Sale Value */}
      <p className="mb-2">
        <strong>Total Sale Value:</strong> ₹{sale.saleValue.toFixed(2)}
      </p>

      {/* Cart Details */}
      <p className="mb-2">
        <strong>Cart Details:</strong>
      </p>
      <ul className="list-disc list-inside text-gray-700 pl-4">
        {sale.items.map((product) => (
          <li key={product.productName}>
            {product.productName} ({product.quantity}) - ₹
            {(product.price * product.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaleRecord;
