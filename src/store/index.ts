import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Collection } from '@/lib/data/collections';
import { PRICE, SIZES, collections } from '@/lib/data/collections';
import { generateProductId } from '@/lib/utils/helpers';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

const createDefaultProduct = (collectionId: string, model: string, variant: string, size: number): CartItem => {
  const collection = collections.find(c => c.id === collectionId);
  return {
    collectionId,
    model,
    variant,
    size,
    price: PRICE,
    name: `${collection?.label} ${model}`,
    description: `Meticulously crafted ${collection?.series} series eyewear`,
    images: {
      primary: `/images/products/${collectionId}/${collectionId.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-1.jpg`,
      alternate: `/images/products/${collectionId}/${collectionId.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-2.jpg`,
      angles: [
        `/images/products/${collectionId}/${collectionId.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-1.jpg`,
        `/images/products/${collectionId}/${collectionId.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-2.jpg`,
        `/images/products/${collectionId}/${collectionId.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-3.jpg`,
        `/images/products/${collectionId}/${collectionId.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-4.jpg`,
      ],
      detail: `/images/products/${collectionId}/${collectionId.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-6.jpg`,
    },
    quantity: 1,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        const productId = generateProductId(product.collectionId, product.model, product.variant);
        const existingItem = get().items.find(item => generateProductId(item.collectionId, item.model, item.variant) === productId);

        if (existingItem) {
          set(state => ({
            items: state.items.map(item =>
              generateProductId(item.collectionId, item.model, item.variant) === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          set(state => ({ items: [...state.items, { ...product, quantity: 1 }] }));
        }
        get().openCart();
      },

      removeItem: (productId) => {
        set(state => ({
          items: state.items.filter(item => generateProductId(item.collectionId, item.model, item.variant) !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(item =>
            generateProductId(item.collectionId, item.model, item.variant) === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getSubtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'x8-cart',
      partialize: state => ({ items: state.items }),
    }
  )
);

interface UIState {
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      reducedMotion: false,
      setReducedMotion: (value) => set({ reducedMotion: value }),
      isLoading: false,
      setIsLoading: (value) => set({ isLoading: value }),
    }),
    { name: 'x8-ui' }
  )
);

interface FilterState {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      activeFilter: 'all',
      setActiveFilter: (filter) => set({ activeFilter: filter }),
    }),
    { name: 'x8-filter' }
  )
);