'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Manga } from '@/lib/manga-data';

interface CartItem {
  manga: Manga;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (manga: Manga) => void;
  removeFromCart: (mangaId: string) => void;
  updateQuantity: (mangaId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('manga-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('manga-cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  const addToCart = (manga: Manga) => {
    setItems(prev => {
      const existing = prev.find(item => item.manga.id === manga.id);
      if (existing) {
        return prev.map(item =>
          item.manga.id === manga.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { manga, quantity: 1 }];
    });
  };

  const removeFromCart = (mangaId: string) => {
    setItems(prev => prev.filter(item => item.manga.id !== mangaId));
  };

  const updateQuantity = (mangaId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(mangaId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.manga.id === mangaId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.manga.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
