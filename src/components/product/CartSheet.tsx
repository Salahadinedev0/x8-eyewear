'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store';
import { Sheet } from '@/components/ui';
import { CartEmpty } from './CartEmpty';
import { CartItems } from './CartItems';
import { CartSummary } from './CartSummary';

export function CartSheet() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotalItems,
    clearCart,
  } = useCartStore();

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const shopPayAmount = subtotal / 4;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && totalItems === 0) return null;

  return (
    <Sheet side="right" className="max-w-sm md:max-w-md lg:max-w-lg">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {items.length === 0 ? (
          <CartEmpty onClose={closeCart} />
        ) : (
          <>
            <CartItems items={items} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />
            <CartSummary
              subtotal={subtotal}
              totalItems={totalItems}
              shopPayAmount={shopPayAmount}
              onClose={closeCart}
              onClearCart={clearCart}
            />
          </>
        )}
      </div>
    </Sheet>
  );
}