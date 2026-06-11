'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import type { Collection } from '@/lib/data/collections';

interface ProductCardProps {
  collection: Collection;
  model: string;
  variant?: string;
  className?: string;
}

export function ProductCard({
  collection,
  model,
  variant = '001',
  className,
}: ProductCardProps) {
  const collectionPrefix = collection.id.replace('-', '').toUpperCase();
  const modelNum = model.padStart(3, '0');

  const primaryImage = `/images/products/${collection.id}/${collectionPrefix}-${modelNum}-${variant}-1.jpg`;
  const alternateImage = `/images/products/${collection.id}/${collectionPrefix}-${modelNum}-${variant}-2.jpg`;

  return (
    <Link
      href={`/product/${collection.id}/${model}`}
      className={cn(
        'group relative block overflow-hidden bg-bg-elevated border border-card-border',
        'transition-all duration-base ease-out-expo hover:border-accent/50',
        className
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={primaryImage}
          alt={`${collection.label} ${model} - ${variant}`}
          fill
          className="object-cover transition-opacity duration-base ease-out-expo group-hover:opacity-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          placeholder="blur"
          loading="lazy"
        />
        <Image
          src={alternateImage}
          alt={`${collection.label} ${model} - ${variant} alternate`}
          fill
          className="absolute inset-0 object-cover opacity-0 transition-opacity duration-base ease-out-expo group-hover:opacity-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          placeholder="blur"
          loading="lazy"
        />

        <div className="absolute top-3 left-3">
          <span className="text-xs font-body font-medium px-2 py-1 bg-bg/90 backdrop-blur-sm text-fg rounded">
            {collection.series}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
          <span className="text-xs font-mono text-accent px-2 py-1 bg-bg/90 backdrop-blur-sm rounded">
            View Details
          </span>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-semibold text-lg md:text-xl text-fg">
            {collection.label} {model}
          </h3>
          <span className="text-sm font-mono text-accent">
            $245
          </span>
        </div>
        <p className="text-sm text-muted font-body">
          {collection.series} Series — Variant {variant}
        </p>
      </div>
    </Link>
  );
}