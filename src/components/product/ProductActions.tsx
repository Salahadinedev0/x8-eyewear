'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn, formatPrice } from '@/lib/utils/helpers';
import { useCartStore } from '@/store';
import { Button, Badge } from '@/components/ui';
import { Plus, Minus, CreditCard, ShoppingBag } from 'lucide-react';
import type { Collection } from '@/lib/data/collections';

interface VariantPickerProps {
  collection: Collection;
  model: string;
  selectedVariant: string;
  onVariantChange: (variant: string) => void;
}

export function VariantPicker({
  collection,
  model,
  selectedVariant,
  onVariantChange,
}: VariantPickerProps) {
  const variants = ['001', '002', '003', '004'];
  const collectionPrefix = collection.id.replace('-', '').toUpperCase();
  const modelNum = model.padStart(3, '0');

  return (
    <div className="space-y-3">
      <label className="text-sm font-body font-medium text-fg block">
        Color
      </label>
      <div className="flex gap-2" role="radiogroup" aria-label="Select color variant">
        {variants.map((variant) => {
          const thumbSrc = `/images/products/${collection.id}/${collectionPrefix}-${modelNum}-${variant}-1.jpg`;
          const isSelected = variant === selectedVariant;

          return (
            <button
              key={variant}
              onClick={() => onVariantChange(variant)}
              className={cn(
                'relative aspect-square w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-fast flex-shrink-0',
                isSelected
                  ? 'border-accent ring-2 ring-accent/20'
                  : 'border-card-border hover:border-accent/50'
              )}
              aria-label={`Variant ${variant}`}
              aria-pressed={isSelected}
              role="radio"
            >
              <Image
                src={thumbSrc}
                alt={`${collection.label} ${model} variant ${variant}`}
                fill
                className="object-cover"
                sizes="56px"
              />
              {isSelected && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface SizePickerProps {
  selectedSize: number | null;
  onSizeChange: (size: number) => void;
}

export function SizePicker({
  selectedSize,
  onSizeChange,
}: SizePickerProps) {
  const sizes = [41, 42, 43, 44];

  return (
    <div className="space-y-3">
      <label className="text-sm font-body font-medium text-fg block">
        Size
      </label>
      <div className="flex gap-2" role="radiogroup" aria-label="Select size">
        {sizes.map((size) => {
          const isSelected = size === selectedSize;

          return (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={cn(
                'w-14 h-14 rounded-lg border-2 font-body font-semibold text-sm transition-all duration-fast flex-shrink-0',
                isSelected
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-card-border text-fg/80 hover:border-accent/50 hover:bg-accent/5'
              )}
              aria-label={`Size ${size}`}
              aria-pressed={isSelected}
              role="radio"
            >
              {size}
            </button>
          );
        })}
      </div>
      {selectedSize === null && (
        <p className="text-xs text-accent font-body">Please select a size</p>
      )}
    </div>
  );
}

interface AddToCartProps {
  collection: Collection;
  model: string;
  variant: string;
  size: number | null;
  disabled?: boolean;
}

export function AddToCart({
  collection,
  model,
  variant,
  size,
  disabled = false,
}: AddToCartProps) {
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = async () => {
    if (!size || disabled) return;
    setIsAdding(true);
    addItem({
      collectionId: collection.id,
      model,
      variant,
      size,
      price: 245,
      name: `${collection.label} ${model}`,
      description: `Meticulously crafted ${collection.series} series eyewear`,
      images: {
        primary: `/images/products/${collection.id}/${collection.id.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-1.jpg`,
        alternate: `/images/products/${collection.id}/${collection.id.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-2.jpg`,
        angles: [
          `/images/products/${collection.id}/${collection.id.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-1.jpg`,
          `/images/products/${collection.id}/${collection.id.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-2.jpg`,
          `/images/products/${collection.id}/${collection.id.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-3.jpg`,
          `/images/products/${collection.id}/${collection.id.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-4.jpg`,
        ],
        detail: `/images/products/${collection.id}/${collection.id.replace('-', '').toUpperCase()}-${model.padStart(3, '0')}-${variant}-6.jpg`,
      },
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="space-y-4">
      <Button
        variant="primary"
        className="w-full py-4 text-lg"
        onClick={handleClick}
        disabled={!size || disabled || isAdding}
      >
        {isAdding ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Adding...
          </span>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted font-body flex items-center justify-center gap-1.5">
        <CreditCard className="w-4 h-4" />
        <span>or 4 interest-free payments of $61.25 with Shop Pay</span>
      </p>
    </div>
  );
}