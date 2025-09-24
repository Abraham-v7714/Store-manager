import { createContext, useContext, useReducer, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const SalesContext = createContext(null);
const SalesDispatchContext = createContext(null);

export function SalesProvider({ children }) {
  // Persist sales in localStorage
  const [salesInLS, setSalesInLS] = useLocalStorage("sales", []);
  const [sales, dispatch] = useReducer(salesReducer, salesInLS);

  useEffect(() => {
    setSalesInLS(sales);
  }, [sales, setSalesInLS]);

  return (
    <SalesContext.Provider value={sales}>
      <SalesDispatchContext.Provider value={dispatch}>
        {children}
      </SalesDispatchContext.Provider>
    </SalesContext.Provider>
  );
}

// Hook to access sales data
export function useSales() {
  return useContext(SalesContext);
}

// Hook to dispatch actions
export function useSalesDispatch() {
  return useContext(SalesDispatchContext);
}

// Reducer
function salesReducer(state, action) {
  switch (action.type) {
    case "NEW_SALE":
      // action.sale must contain: { items: [...], saleValue: number, datetime: Date }
      return [...state, action.sale];

    case "CLEAR_SALES":
      return [];

    default:
      console.warn("Unknown action type:", action.type);
      return state;
  }
}
