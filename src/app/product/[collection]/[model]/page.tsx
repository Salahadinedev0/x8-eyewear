import { collections, getCollectionById, PRICE, SIZES, SHOP_PAY_INSTALLMENTS } from '@/lib/data/collections';
import { FwaRibbon } from '@/components/shared/FwaRibbon';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Badge } from '@/components/ui';
import { formatPrice } from '@/lib/utils/helpers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ArrowLeft, CreditCard, Truck, Shield, RotateCcw, Star } from 'lucide-react';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { RelatedProducts } from './RelatedProducts';

interface ProductPageProps {
  params: Promise<{ collection: string; model: string }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const collection of collections) {
    for (const model of collection.models) {
      params.push({ collection: collection.id, model });
    }
  }
  return params;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { collection: collectionId, model } = await params;
  const collection = getCollectionById(collectionId);

  if (!collection) {
    notFound();
  }

  const collectionPrefix = collection.id.replace('-', '').toUpperCase();
  const modelNum = model.padStart(3, '0');
  const variant = '001';

  const images = [
    `/images/products/${collectionId}/${collectionPrefix}-${modelNum}-${variant}-1.jpg`,
    `/images/products/${collectionId}/${collectionPrefix}-${modelNum}-${variant}-2.jpg`,
    `/images/products/${collectionId}/${collectionPrefix}-${modelNum}-${variant}-3.jpg`,
    `/images/products/${collectionId}/${collectionPrefix}-${modelNum}-${variant}-4.jpg`,
  ];

  return (
    <>
      <FwaRibbon />
      <div className="min-h-screen bg-bg pt-header">
        <section className="py-12 md:py-16 px-6" aria-labelledby="product-title">
          <div className="container-custom">
            <ScrollReveal y={40} stagger={0} duration={0.6} once>
              <nav className="flex items-center gap-2 text-sm text-muted font-body mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-fg transition-colors">Home</Link>
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <Link href="/collections" className="hover:text-fg transition-colors">Collections</Link>
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <Link
                  href={`/collections?series=${collection.series}`}
                  className="hover:text-fg transition-colors"
                >
                  {collection.series}
                </Link>
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span className="text-fg" aria-current="page">
                  {collection.label} {model}
                </span>
              </nav>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
              <ScrollReveal y={40} stagger={0} duration={0.8} once>
                <div className="sticky top-24 lg:top-32">
                  <ProductGallery images={images} alt={`${collection.label} ${model}`} />
                </div>
              </ScrollReveal>

              <ScrollReveal y={40} stagger={0.08} duration={0.8} delay={0.1} once>
                <ProductInfo
                  collection={collection}
                  model={model}
                  variant={variant}
                  images={images}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <RelatedProducts collection={collection} currentModel={model} variant={variant} />
      </div>
    </>
  );
}