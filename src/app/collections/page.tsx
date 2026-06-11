'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { collections, getAllProducts, collectionOrder, seriesOrder } from '@/lib/data/collections';
import { ProductCard } from '@/components/product';
import { ScrollReveal } from '@/components/shared';
import { Badge } from '@/components/ui';
import { cn, generateProductId } from '@/lib/utils/helpers';

const ITEMS_PER_PAGE = 12;

export default function CollectionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [displayedProducts, setDisplayedProducts] = useState<Array<{ collectionId: string; model: string }>>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const seriesFilter = searchParams.get('series');

  useEffect(() => {
    if (seriesFilter) {
      setActiveFilter(seriesFilter);
    } else {
      setActiveFilter('all');
    }
  }, [seriesFilter]);

  const filteredProducts = useMemo(() => {
    const allProducts = getAllProducts();

    if (activeFilter === 'all') {
      return allProducts;
    }

    if (seriesOrder.includes(activeFilter as 'ANIMA' | 'ANIMUS')) {
      return allProducts.filter((p) => {
        const collection = collections.find((c) => c.id === p.collectionId);
        return collection?.series === activeFilter;
      });
    }

    return allProducts.filter((p) => p.collectionId === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, ITEMS_PER_PAGE));
  }, [filteredProducts]);

  const loadMore = useCallback(() => {
    if (isLoading || displayedProducts.length >= filteredProducts.length) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextItems = filteredProducts.slice(
        displayedProducts.length,
        displayedProducts.length + ITEMS_PER_PAGE
      );
      setDisplayedProducts((prev) => [...prev, ...nextItems]);
      setIsLoading(false);
    }, 300);
  }, [displayedProducts.length, filteredProducts.length, isLoading, filteredProducts]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      router.push('/collections');
    } else if (seriesOrder.includes(filter as 'ANIMA' | 'ANIMUS')) {
      router.push(`/collections?series=${filter}`);
    } else {
      router.push(`/collections?collection=${filter}`);
    }
  };

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'ANIMA', label: 'ANIMA' },
    { id: 'ANIMUS', label: 'ANIMUS' },
    ...collectionOrder.map((id) => {
      const c = collections.find((col) => col.id === id);
      return { id, label: c?.label || id };
    }),
  ];

  return (
    <div className="min-h-screen bg-bg pt-header">
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 px-6">
        <div className="container-custom">
          <ScrollReveal y={60} stagger={0} duration={0.8} once>
            <h1 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-fg text-balance">
              Collections
            </h1>
            <p className="mt-4 text-lg text-muted font-body max-w-xl">
              Discover our complete range of aerospace-grade titanium eyewear.
              Six collections, twenty-four models, infinite possibilities.
            </p>
          </ScrollReveal>

          <ScrollReveal y={40} stagger={0.08} duration={0.6} delay={0.2} once>
            <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Collection filters">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleFilterChange(option.id)}
                  className={cn(
                    'px-4 py-2 text-sm font-body font-medium rounded-full transition-all duration-fast ease-out-expo',
                    activeFilter === option.id
                      ? 'bg-accent text-bg shadow-[0_0_20px_rgba(212,168,83,0.3)]'
                      : 'bg-bg-elevated text-fg/80 border border-card-border hover:border-accent/50 hover:bg-accent/5'
                  )}
                  aria-pressed={activeFilter === option.id}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28 px-6" aria-label="Products grid">
        <div className="container-custom">
          <ScrollReveal y={60} stagger={0.06} duration={0.8} once as="div">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8" role="list">
              {displayedProducts.map((product, index) => {
                const collection = collections.find((c) => c.id === product.collectionId);
                if (!collection) return null;

                return (
                  <ScrollReveal
                    key={generateProductId(product.collectionId, product.model, '001')}
                    y={40}
                    stagger={0}
                    duration={0.6}
                    delay={index * 0.03}
                    once
                    as="div"
                  >
                    <ProductCard
                      collection={collection}
                      model={product.model}
                      variant="001"
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>

          {displayedProducts.length < filteredProducts.length && (
            <ScrollReveal y={40} stagger={0} duration={0.6} delay={0.2} once>
              <div className="mt-12 md:mt-16 text-center">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-10 py-4 bg-bg-elevated text-fg border border-card-border hover:border-accent/50 hover:bg-accent/5 font-body font-semibold text-base rounded-full transition-all duration-fast ease-out-expo disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    `Load More (${displayedProducts.length} / ${filteredProducts.length})`
                  )}
                </button>
              </div>
            </ScrollReveal>
          )}

          {displayedProducts.length === 0 && (
            <ScrollReveal y={40} stagger={0} duration={0.6} once>
              <div className="py-20 text-center">
                <p className="text-muted font-body">No products found for this filter.</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}