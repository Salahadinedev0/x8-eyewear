'use client';

import { CreditCard } from 'lucide-react';
import { formatPrice } from '@/lib/utils/helpers';
import { Button } from '@/components/ui';

interface CartSummaryProps {
  subtotal: number;
  totalItems: number;
  shopPayAmount: number;
  onClose: () => void;
  onClearCart: () => void;
}

export function CartSummary({
  subtotal,
  totalItems,
  shopPayAmount,
  onClose,
  onClearCart,
}: CartSummaryProps) {
  return (
    <div className="border-t border-card-border pt-6 space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted">Subtotal ({totalItems} items)</span>
        <span className="text-fg font-mono">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted">Shipping</span>
        <span className="text-fg font-mono">Calculated at checkout</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted">Tax</span>
        <span className="text-fg font-mono">Calculated at checkout</span>
      </div>
      <div className="border-t border-card-border pt-4 flex justify-between text-base font-medium">
        <span className="text-fg">Total</span>
        <span className="text-fg font-display">{formatPrice(subtotal)}</span>
      </div>

      <p className="text-xs text-muted text-center flex items-center justify-center gap-1.5">
        <CreditCard className="w-3.5 h-3.5" />
        <span>or 4 interest-free payments of {formatPrice(shopPayAmount)} with Shop Pay</span>
      </p>

      <Button variant="primary" className="w-full py-4 text-lg" onClick={onClose}>
        Proceed to Checkout
      </Button>

      <Button variant="ghost" className="w-full" onClick={onClearCart}>
        Clear Cart
      </Button>
    </div>
  );
}