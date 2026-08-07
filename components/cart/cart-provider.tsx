"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  emoji: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (
    item: Omit<CartItem, "quantity">,
    quantity?: number
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const STORAGE_KEY = "amruta-dhaanya-cart";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  /*
   * Load cart from localStorage once on the client.
   */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error("Unable to load cart:", error);
      setItems([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  /*
   * Save cart whenever it changes.
   */
  useEffect(() => {
    if (!loaded) {
      return;
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [items, loaded]);

  /*
   * Add product to cart.
   *
   * If the product already exists, increase its quantity.
   */
  function addItem(
    item: Omit<CartItem, "quantity">,
    quantity = 1
  ) {
    const safeQuantity = Math.max(
      1,
      Math.floor(quantity)
    );

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return currentItems.map((cartItem) => {
          if (cartItem.id !== item.id) {
            return cartItem;
          }

          return {
            ...cartItem,
            quantity:
              cartItem.quantity + safeQuantity,
          };
        });
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: safeQuantity,
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  }

  function updateQuantity(
    id: string,
    quantity: number
  ) {
    const safeQuantity = Math.floor(quantity);

    if (safeQuantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: safeQuantity,
            }
          : item
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [items]);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
    }),
    [items, totalItems, subtotal]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}