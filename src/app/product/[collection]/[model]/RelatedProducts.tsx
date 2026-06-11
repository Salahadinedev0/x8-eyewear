'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/helpers';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { ChevronRight } from 'lucide-react';
import type { Collection } from '@/lib/data/collections';

interface RelatedProductsProps {
  collection: Collection;
  currentModel: string;
  variant: string;
}

export function RelatedProducts({ collection, currentModel, variant }: RelatedProductsProps) {
  const collectionPrefix = collection.id.replace('-', '').toUpperCase();
  const relatedModels = collection.models.filter((m) => m !== currentModel).slice(0, 4);
  const PRICE = 245;

  return (
    <section className="py-16 md:py-24 px-6 bg-bg" aria-labelledby="related-heading">
      <div className="container-custom">
        <ScrollReveal y={60} stagger={0} duration={0.8} once>
          <div className="flex items-center justify-between mb-12">
            <h2 id="related-heading" className="font-display font-semibold text-3xl md:text-4xl text-fg">
              You May Also Like
            </h2>
            <Link
              href={`/collections?series=${collection.series}`}
              className="text-sm text-accent font-body font-medium hover:underline flex items-center gap-1"
            >
              View all {collection.series}
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal y={40} stagger={0.06} duration={0.8} once as="div">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedModels.map((relatedModel, index) => (
              <div key={relatedModel}>
                <Link
                  href={`/product/${collection.id}/${relatedModel}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-bg-elevated border border-card-border mb-4 group-hover:border-accent/50 transition-all duration-base">
                    <Image
                      src={`/images/products/${collection.id}/${collectionPrefix}-${relatedModel.padStart(3, '0')}-${variant}-1.jpg`}
                      alt={`${collection.label} ${relatedModel}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-slow ease-out-expo"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      placeholder="blur"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-fg mb-1">
                    {collection.label} {relatedModel}
                  </h3>
                  <p className="text-sm text-muted font-body">
                    {formatPrice(PRICE)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}