import { createContext, useContext, useReducer, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const InventoryContext = createContext(null);
const InventoryDispatchContext = createContext(null);

export function InventoryProvider({ children }) {
  const [inventoryInLS, setInventoryInLS] = useLocalStorage("inventory", []);
  const [inventory, dispatch] = useReducer(inventoryReducer, inventoryInLS);

  useEffect(() => {
    setInventoryInLS(inventory);
  }, [inventory, setInventoryInLS]);

  return (
    <InventoryContext.Provider value={inventory}>
      <InventoryDispatchContext.Provider value={dispatch}>
        {children}
      </InventoryDispatchContext.Provider>
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}

export function useInventoryDispatch() {
  return useContext(InventoryDispatchContext);
}

function inventoryReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.product];

    case "STOCK_ADDED":
      return state.map((item) =>
        item.productName === action.productName
          ? { ...item, stock: item.stock + action.stock }
          : item
      );

    case "STOCK_REMOVED":
      return state.map((item) =>
        item.productName === action.productName
          ? { ...item, stock: Math.max(item.stock - action.stock, 0) }
          : item
      );

    case "REMOVE_PRODUCT":
      return state.filter((item) => item.productName !== action.productName);

    default:
      console.warn("Unknown action type:", action.type);
      return state;
  }
}
