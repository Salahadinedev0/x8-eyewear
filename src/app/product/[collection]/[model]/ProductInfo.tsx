'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn, formatPrice } from '@/lib/utils/helpers';
import { useCartStore } from '@/store';
import { Button, Badge } from '@/components/ui';
import { Plus, Minus, CreditCard, ShoppingBag, Shield, Truck, RotateCcw, Star } from 'lucide-react';
import type { Collection } from '@/lib/data/collections';

interface ProductInfoProps {
  collection: Collection;
  model: string;
  variant: string;
  images: string[];
}

export function ProductInfo({
  collection,
  model,
  variant: initialVariant,
  images,
}: ProductInfoProps) {
  const { addItem } = useCartStore();
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const collectionPrefix = collection.id.replace('-', '').toUpperCase();
  const modelNum = model.padStart(3, '0');
  const PRICE = 245;
  const SHOP_PAY_INSTALLMENTS = 4;

  const handleAddToCart = async () => {
    if (!selectedSize || isAdding) return;
    setIsAdding(true);
    addItem({
      collectionId: collection.id,
      model,
      variant: selectedVariant,
      size: selectedSize,
      price: PRICE,
      name: `${collection.label} ${model}`,
      description: `Meticulously crafted ${collection.series} series eyewear`,
      images: {
        primary: `/images/products/${collection.id}/${collectionPrefix}-${modelNum}-${selectedVariant}-1.jpg`,
        alternate: `/images/products/${collection.id}/${collectionPrefix}-${modelNum}-${selectedVariant}-2.jpg`,
        angles: [
          `/images/products/${collection.id}/${collectionPrefix}-${modelNum}-${selectedVariant}-1.jpg`,
          `/images/products/${collection.id}/${collectionPrefix}-${modelNum}-${selectedVariant}-2.jpg`,
          `/images/products/${collection.id}/${collectionPrefix}-${modelNum}-${selectedVariant}-3.jpg`,
          `/images/products/${collection.id}/${collectionPrefix}-${modelNum}-${selectedVariant}-4.jpg`,
        ],
        detail: `/images/products/${collection.id}/${collectionPrefix}-${modelNum}-${selectedVariant}-6.jpg`,
      },
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleVariantChange = (variant: string) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {collection.series} Series
        </Badge>
        <Badge variant="ghost" className="text-xs text-accent border-accent">
          Variant {selectedVariant}
        </Badge>
      </div>

      <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-fg leading-tight text-balance">
        {collection.label} {model}
      </h1>

      <p className="text-lg text-muted font-body leading-relaxed">
        Meticulously crafted from aerospace-grade titanium. The {collection.label} {model}
        combines architectural precision with featherweight comfort. Each frame undergoes
        over 200 manual steps in our Italian atelier.
      </p>

      <div className="flex items-baseline gap-4">
        <span className="font-display font-bold text-3xl md:text-4xl text-fg">
          {formatPrice(PRICE)}
        </span>
        <p className="text-sm text-muted font-body flex items-center gap-1.5">
          <CreditCard className="w-4 h-4" />
          or 4 interest-free payments of {formatPrice(PRICE / SHOP_PAY_INSTALLMENTS)} with Shop Pay
        </p>
      </div>

      <VariantPicker
        collection={collection}
        model={model}
        selectedVariant={selectedVariant}
        onVariantChange={handleVariantChange}
      />

      <SizePicker
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      <div className="space-y-4">
        <Button
          variant="primary"
          className="w-full py-4 text-lg"
          onClick={handleAddToCart}
          disabled={!selectedSize || isAdding}
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
          or 4 interest-free payments of {formatPrice(PRICE / SHOP_PAY_INSTALLMENTS)} with Shop Pay
        </p>
      </div>

      <div className="border-t border-card-border pt-8 space-y-4">
        <h3 className="font-body font-medium text-fg">Included</h3>
        <ul className="space-y-2 text-sm text-muted font-body">
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-accent" aria-hidden="true" />
            </div>
            Lifetime warranty on frame defects
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Truck className="w-4 h-4 text-accent" aria-hidden="true" />
            </div>
            Free global shipping & returns
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-4 h-4 text-accent" aria-hidden="true" />
            </div>
            30-day risk-free trial
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-accent" aria-hidden="true" />
            </div>
            Complimentary lens replacement (year 1)
          </li>
        </ul>
      </div>

      <SpecificationTabs collection={collection} model={model} variant={selectedVariant} />
    </div>
  );
}

interface VariantPickerProps {
  collection: Collection;
  model: string;
  selectedVariant: string;
  onVariantChange: (variant: string) => void;
}

function VariantPicker({
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

function SizePicker({
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

function SpecificationTabs({ collection, model, variant }: { collection: Collection; model: string; variant: string }) {
  const [activeTab, setActiveTab] = useState<'frame' | 'lenses' | 'dimensions'>('frame');
  const collectionPrefix = collection.id.replace('-', '').toUpperCase();
  const modelNum = model.padStart(3, '0');

  return (
    <div className="border-t border-card-border pt-8">
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1 mb-6" role="tablist">
        {[
          { id: 'frame', label: 'Frame' },
          { id: 'lenses', label: 'Lenses' },
          { id: 'dimensions', label: 'Dimensions' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 text-sm font-body font-medium rounded-md transition-all duration-fast ${
              activeTab === tab.id
                ? 'bg-accent text-bg'
                : 'text-muted hover:text-fg'
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div id="panel-frame" role="tabpanel" hidden={activeTab !== 'frame'}>
        <dl className="space-y-4 text-sm font-body">
          <div className="flex justify-between"><dt className="text-muted">Material</dt><dd className="text-fg">Grade 5 Aerospace Titanium</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Weight</dt><dd className="text-fg">~18g (without lenses)</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Finish</dt><dd className="text-fg">Hand-brushed / Polished</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Hinges</dt><dd className="text-fg">Beta-titanium flex hinges</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Nose Pads</dt><dd className="text-fg">Adjustable medical-grade silicone</dd></div>
        </dl>
      </div>

      <div id="panel-lenses" role="tabpanel" hidden={activeTab !== 'lenses'}>
        <dl className="space-y-4 text-sm font-body">
          <div className="flex justify-between"><dt className="text-muted">Supplier</dt><dd className="text-fg">Carl Zeiss Vision</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Type</dt><dd className="text-fg">CR-39 / Polycarbonate options</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Coatings</dt><dd className="text-fg">Anti-reflective, hydrophobic, oleophobic</dd></div>
          <div className="flex justify-between"><dt className="text-muted">UV Protection</dt><dd className="text-fg">100% UVA/UVB (UV400)</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Prescription</dt><dd className="text-fg">Available up to ±8.00 sphere</dd></div>
        </dl>
      </div>

      <div id="panel-dimensions" role="tabpanel" hidden={activeTab !== 'dimensions'}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-body">
          <div className="p-4 bg-bg rounded-lg border border-card-border">
            <dt className="text-muted block mb-1">Lens Width</dt>
            <dd className="text-fg font-mono">54</dd>
          </div>
          <div className="p-4 bg-bg rounded-lg border border-card-border">
            <dt className="text-muted block mb-1">Bridge Width</dt>
            <dd className="text-fg font-mono">18</dd>
          </div>
          <div className="p-4 bg-bg rounded-lg border border-card-border">
            <dt className="text-muted block mb-1">Temple Length</dt>
            <dd className="text-fg font-mono">145</dd>
          </div>
          <div className="p-4 bg-bg rounded-lg border border-card-border">
            <dt className="text-muted block mb-1">Lens Height</dt>
            <dd className="text-fg font-mono">38</dd>
          </div>
        </div>
      </div>
    </div>
  );
}