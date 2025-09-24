import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InventoryProvider } from "./context/InventoryContext";
import { CartProvider } from "./context/CartContext";
import { SalesProvider } from "./context/SalesContext";

import NavBar from "./components/NavBar";
import ProductCatalog from "./components/Product/productcatalog";
import AddProduct from "./components/Product/addProduct";
import Inventory from "./components/Inventory/inventory";
import Cart from "./components/Cart/cart";
import Sales from "./components/Sales/sales";
import "./App.css";

function App() {
  const appStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <InventoryProvider>
      <CartProvider>
        <SalesProvider>
          <Router>
            <div style={appStyle}>
              <NavBar />
              <Routes>
                <Route path="/" element={<ProductCatalog />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/sales" element={<Sales />} />

              </Routes>
            </div>
          </Router>
        </SalesProvider>
      </CartProvider>
    </InventoryProvider>
  );
}

export default App;
