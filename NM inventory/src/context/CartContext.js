import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.find(item => item.productName === action.product.productName);
      if (existing) {
        return state.map(item =>
          item.productName === action.product.productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }

    case "INCREASE_QUANTITY": {
      return state.map(item =>
        item.productName === action.productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case "DECREASE_QUANTITY": {
      return state.map(item =>
        item.productName === action.productName
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );
    }

    case "REMOVE_ITEM":
      return state.filter(item => item.productName !== action.productName);

    case "CLEAR_CART":
      return [];

    default:
      console.warn("Unknown cart action type:", action.type);
      return state;
  }
}
    