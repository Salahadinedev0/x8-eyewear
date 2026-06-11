'use client';

import { SheetProvider } from '@/components/ui/Sheet';
import { CartSheet } from '@/components/product/CartSheet';
import { useCartStore } from '@/store';

export function CartProviders({ children }: { children: React.ReactNode }) {
  return (
    <SheetProvider>
      {children}
      <CartSheet />
    </SheetProvider>
  );
}