'use client';

import Image from 'next/image';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { cn, formatPrice, generateProductId } from '@/lib/utils/helpers';
import type { CartItem } from '@/lib/data/collections';

interface CartItemsProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function CartItems({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemsProps) {
  return (
    <div className="space-y-4 mb-6">
      {items.map((item) => {
        const productId = generateProductId(item.collectionId, item.model, item.variant);
        const collectionPrefix = item.collectionId.replace('-', '').toUpperCase();
        const modelNum = item.model.padStart(3, '0');
        const imageSrc = `/images/products/${item.collectionId}/${collectionPrefix}-${modelNum}-${item.variant}-1.jpg`;

        return (
          <div
            key={productId}
            className="flex gap-4 p-3 bg-bg/50 rounded-lg border border-card-border"
          >
            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded">
              <Image
                src={imageSrc}
                alt={`${item.name} ${item.variant}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-medium text-fg truncate">
                {item.name}
              </h4>
              <p className="text-xs text-muted font-mono mt-0.5">
                Variant {item.variant} · Size {item.size}
              </p>
              <p className="text-sm font-medium text-accent mt-1">
                {formatPrice(item.price)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 border border-card-border rounded">
                <button
                  onClick={() => onUpdateQuantity(productId, item.quantity - 1)}
                  className="p-1.5 text-muted hover:text-fg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono text-sm text-fg w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(productId, item.quantity + 1)}
                  className="p-1.5 text-muted hover:text-fg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => onRemoveItem(productId)}
                className="p-1.5 text-muted hover:text-accent transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}