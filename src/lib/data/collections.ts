export interface Collection {
  id: string;
  label: string;
  series: 'ANIMA' | 'ANIMUS';
  models: string[];
}

export interface Product {
  collectionId: string;
  model: string;
  variant: string;
  size: number;
  price: number;
  name: string;
  description: string;
  images: {
    primary: string;
    alternate: string;
    angles: string[];
    detail: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export const collections: readonly Collection[] = [
  { id: 'anima-x1', label: 'ANIMA X1', series: 'ANIMA', models: ['001', '002', '003', '004'] },
  { id: 'anima-x2', label: 'ANIMA X2', series: 'ANIMA', models: ['001', '002', '003', '004'] },
  { id: 'anima-x3', label: 'ANIMA X3', series: 'ANIMA', models: ['001', '002', '003', '004'] },
  { id: 'animus-y1', label: 'ANIMUS Y1', series: 'ANIMUS', models: ['001', '002', '003', '004'] },
  { id: 'animus-y2', label: 'ANIMUS Y2', series: 'ANIMUS', models: ['001', '002', '003', '004'] },
  { id: 'animus-y3', label: 'ANIMUS Y3', series: 'ANIMUS', models: ['001', '002', '003', '004'] },
] as const;

export const PRICE = 245;
export const SIZES = [41, 42, 43, 44] as const;
export const SHOP_PAY_INSTALLMENTS = 4;

export const seriesOrder = ['ANIMA', 'ANIMUS'] as const;
export const collectionOrder = [
  'anima-x1', 'anima-x2', 'anima-x3',
  'animus-y1', 'animus-y2', 'animus-y3',
] as const;

export function getCollectionById(id: string): Collection | undefined {
  return collections.find(c => c.id === id);
}

export function getAllProducts(): Array<{ collectionId: string; model: string }> {
  const products: Array<{ collectionId: string; model: string }> = [];
  for (const collection of collections) {
    for (const model of collection.models) {
      products.push({ collectionId: collection.id, model });
    }
  }
  return products;
}

export function getProductImagePath(collectionId: string, model: string, variant: string, angle: 1 | 2 | 3 | 4 | 6): string {
  const prefix = collectionId.replace('-', '').toUpperCase();
  const modelNum = model.padStart(3, '0');
  return `/images/products/${collectionId}/${prefix}-${modelNum}-${variant}-${angle}.jpg`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}

export function getShopPayAmount(price: number, installments: number = SHOP_PAY_INSTALLMENTS): number {
  return price / installments;
}