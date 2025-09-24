import { NavLink} from "react-router-dom";

const NavBar = () => {


  return (
    <nav className="bg-blue-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Title */}
        <div className="flex items-center gap-2">
          <img
            src="/inventoryLogo.png"
            alt="Logo"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-bold text-lg">Inventory Management</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "underline font-semibold"
                : "hover:underline hover:text-blue-200 transition-colors"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/add-product"
            className={({ isActive }) =>
              isActive
                ? "underline font-semibold"
                : "hover:underline hover:text-blue-200 transition-colors"
            }
          >
            Add Product
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive
                ? "underline font-semibold"
                : "hover:underline hover:text-blue-200 transition-colors"
            }
          >
            Inventory
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "underline font-semibold"
                : "hover:underline hover:text-blue-200 transition-colors"
            }
          >
            Cart
          </NavLink>

          <NavLink
            to="/sales"
            className={({ isActive }) =>
              isActive
                ? "underline font-semibold"
                : "hover:underline hover:text-blue-200 transition-colors"
            }
          >
            Sales
          </NavLink>

         
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
