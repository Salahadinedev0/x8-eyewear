'use client';

import { CartProviders } from './CartProvider';
import { UIProviders } from './UIProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProviders>
      <CartProviders>
        {children}
      </CartProviders>
    </UIProviders>
  );
}