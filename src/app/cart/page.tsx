'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ArrowLeft, CreditCard, Shield, Truck, RotateCcw } from 'lucide-react';
import { cn, formatPrice, generateProductId } from '@/lib/utils/helpers';
import { useCartStore } from '@/store';
import { Button } from '@/components/ui';
import type { CartItem } from '@/lib/data/collections';

export default function CartPage() {
  const {
    items,
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
    document.body.style.overflow = 'unset';
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bg pt-header flex items-center justify-center px-6">
        <div className="container-custom text-center py-20">
          <svg className="w-24 h-24 mx-auto text-muted/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-fg mb-4">
            Your cart is empty
          </h1>
          <p className="text-muted text-lg font-body mb-8 max-w-md mx-auto">
            Looks like you haven't added any eyewear yet. Explore our collections to find your perfect pair.
          </p>
          <Link href="/collections">
            <Button variant="primary" className="w-full max-w-xs">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-header pb-20 px-6">
      <div className="container-custom max-w-4xl">
        <header className="py-8 md:py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-fg transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-body font-medium">Back to Home</span>
          </Link>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-fg">Shopping Cart</h1>
          <p className="text-muted font-body mt-2">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const productId = generateProductId(item.collectionId, item.model, item.variant);
              const collectionPrefix = item.collectionId.replace('-', '').toUpperCase();
              const modelNum = item.model.padStart(3, '0');
              const imageSrc = `/images/products/${item.collectionId}/${collectionPrefix}-${modelNum}-${item.variant}-1.jpg`;

              return (
                <div
                  key={productId}
                  className="flex gap-6 p-6 bg-bg-elevated border border-card-border rounded-xl hover:border-accent/50 transition-all duration-fast"
                >
                  <Link
                    href={`/product/${item.collectionId}/${item.model}`}
                    className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg"
                    aria-label={`View ${item.name} ${item.variant}`}
                  >
                    <Image
                      src={imageSrc}
                      alt={`${item.name} ${item.variant}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-base"
                      sizes="96px"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.collectionId}/${item.model}`}
                      className="font-display font-semibold text-lg text-fg hover:text-accent transition-colors block mb-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted font-body mb-2">
                      Variant {item.variant} · Size {item.size}
                    </p>
                    <p className="font-mono text-accent font-medium">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-3 border border-card-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(productId, item.quantity - 1)}
                        className="p-3 text-muted hover:text-fg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="font-mono text-lg text-fg w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(productId, item.quantity + 1)}
                        className="p-3 text-muted hover:text-fg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-display font-semibold text-xl text-fg">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(productId)}
                        className="text-xs text-muted hover:text-accent transition-colors flex items-center gap-1 mt-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-bg-elevated border border-card-border rounded-xl p-6 space-y-4">
                <h2 className="font-display font-semibold text-xl text-fg">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal ({totalItems} items)</span>
                    <span className="text-fg font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Shipping</span>
                    <span className="text-fg font-mono">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Tax</span>
                    <span className="text-fg font-mono">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-card-border pt-4">
                  <div className="flex justify-between text-base font-medium">
                    <span className="text-fg">Total</span>
                    <span className="text-fg font-display">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <p className="text-xs text-muted text-center flex items-center justify-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>or 4 interest-free payments of {formatPrice(shopPayAmount)} with Shop Pay</span>
                </p>

                <Button variant="primary" className="w-full py-4 text-lg">
                  Proceed to Checkout
                </Button>

                <Button variant="ghost" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>

              <div className="bg-bg-elevated border border-card-border rounded-xl p-6 space-y-4">
                <h3 className="font-display font-semibold text-lg text-fg">Benefits</h3>
                <ul className="space-y-3 text-sm font-body">
                  <li className="flex items-center gap-3 text-muted">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-accent" aria-hidden="true" />
                    </div>
                    Lifetime warranty
                  </li>
                  <li className="flex items-center gap-3 text-muted">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Truck className="w-4 h-4 text-accent" aria-hidden="true" />
                    </div>
                    Free global shipping
                  </li>
                  <li className="flex items-center gap-3 text-muted">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <RotateCcw className="w-4 h-4 text-accent" aria-hidden="true" />
                    </div>
                    30-day returns
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}