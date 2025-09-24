import { useSales, useSalesDispatch } from "../../context/SalesContext";
import SaleRecord from "./saleRecord.jsx";

const Sales = () => {
  const sales = useSales() || [];
  const salesDispatch = useSalesDispatch();

  // Calculate total sales value safely
  const totalSalesValue = sales.reduce(
    (acc, sale) => acc + (sale.saleValue || 0),
    0
  );

  // Handler to clear all sales records
  const handleClearSales = () => {
    if (sales.length === 0) return;
    if (window.confirm("Are you sure you want to clear all sales records?")) {
      salesDispatch({ type: "CLEAR_SALES" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Sticky Header with Summary */}
      <div className="sticky top-0 bg-white z-10 py-4 mb-6 shadow-md rounded-xl px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Sales Dashboard
        </h1>

        <div className="flex gap-4 items-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 min-w-[200px] text-center">
            <p className="text-gray-700 font-medium">
              Total Sales: <span className="font-bold">{sales.length}</span>
            </p>
            <p className="text-gray-700 font-medium mt-1">
              Total Value:{" "}
              <span className="font-bold">₹{totalSalesValue.toFixed(2)}</span>
            </p>
          </div>

          <button
            onClick={handleClearSales}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Clear Records
          </button>
        </div>
      </div>

      {/* Sales Grid */}
      {sales.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sales.map((sale, index) => (
            <SaleRecord key={index} sale={sale} saleId={index} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-6">
          No sales recorded yet.
        </p>
      )}
    </div>
  );
};

export default Sales;
