import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === item.id && i.variant === item.variant
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += (item.quantity || 1);
            return { items: newItems };
          }

          return { items: [...state.items, { ...item, quantity: item.quantity || 1 }] };
        });
      },
      
      removeItem: (id, variant) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.variant === variant))
        }));
      },
      
      updateQuantity: (id, quantity, variant) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((i) => 
            (i.id === id && i.variant === variant) ? { ...i, quantity } : i
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      
      getTotalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
    }),
    {
      name: 'ask-shop-cart',
    }
  )
);
