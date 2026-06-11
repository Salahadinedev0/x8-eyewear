'use client';

import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui';

interface CartEmptyProps {
  onClose: () => void;
}

export function CartEmpty({ onClose }: CartEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
      <ShoppingBag className="w-16 h-16 text-muted/30 mb-4" />
      <h3 className="font-display font-semibold text-xl text-fg mb-2">
        Your cart is empty
      </h3>
      <p className="text-muted text-sm mb-6 max-w-xs">
        Looks like you haven't added any eyewear yet.
      </p>
      <Button variant="primary" onClick={onClose} className="w-full max-w-xs">
        Continue Shopping
      </Button>
    </div>
  );
}