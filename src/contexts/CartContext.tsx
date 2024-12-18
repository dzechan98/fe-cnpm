import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

export interface CartItem {
  MaSanPham: string;
  TenSanPham: string;
  Gia: string;
  PhanTramGiam: string;
  MaSize: string;
  MaMau: string;
  HinhAnh: string;
  SoLuong: string;
  TenSize: string;
  TenMau: string;
}

interface CartState {
  items: CartItem[];
}

interface CartContextProps {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateItemQuantity: (item: CartItem, SoLuong: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: CartItem }
  | { type: "UPDATE_QUANTITY"; payload: { item: CartItem; SoLuong: string } }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) =>
          item.MaSanPham === action.payload.MaSanPham &&
          item.MaSize === action.payload.MaSize &&
          item.MaMau === action.payload.MaMau
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.MaSanPham === action.payload.MaSanPham &&
            item.MaSize === action.payload.MaSize &&
            item.MaMau === action.payload.MaMau
              ? {
                  ...item,
                  SoLuong: String(
                    Number(item.SoLuong) + Number(action.payload.SoLuong)
                  ),
                }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.MaSanPham === action.payload.MaSanPham &&
              item.MaSize === action.payload.MaSize
            )
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.MaSanPham === action.payload.item.MaSanPham &&
          item.MaSize === action.payload.item.MaSize &&
          item.MaMau === action.payload.item.MaMau
            ? { ...item, SoLuong: action.payload.SoLuong }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: CartItem) =>
    dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (item: CartItem) =>
    dispatch({ type: "REMOVE_ITEM", payload: item });
  const updateItemQuantity = (item: CartItem, SoLuong: string) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { item, SoLuong } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateItemQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
