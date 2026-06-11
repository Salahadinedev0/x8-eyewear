'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { Button } from '@/components/ui';
import { ShoppingBag, Menu, X } from 'lucide-react';

export function Header() {
  const { isOpen: cartOpen, openCart, closeCart, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = getTotalItems();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-header transition-all duration-base ease-out-expo ${
        scrolled ? 'bg-bg/95 backdrop-blur-sm border-b border-card-border' : 'bg-transparent'
      }`}
    >
      <div className="container-custom h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-semibold text-xl md:text-2xl text-fg" aria-label="X8 Eyewear Home">
          X8
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/collections" className="text-sm font-medium text-fg/80 hover:text-fg transition-colors duration-fast">
            Collections
          </Link>
          <Link href="/collections?series=ANIMA" className="text-sm font-medium text-fg/80 hover:text-fg transition-colors duration-fast">
            ANIMA
          </Link>
          <Link href="/collections?series=ANIMUS" className="text-sm font-medium text-fg/80 hover:text-fg transition-colors duration-fast">
            ANIMUS
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <button
            onClick={cartOpen ? closeCart : openCart}
            className="relative p-2 rounded-full hover:bg-accent/10 text-muted hover:text-fg transition-colors duration-fast focus-ring"
            aria-label={cartOpen ? 'Close cart' : `Open cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-bg text-xs font-medium rounded-full flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-accent/10 text-muted hover:text-fg transition-colors duration-fast focus-ring"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-card-border bg-bg-elevated animate-slide-down">
          <nav className="container-custom py-4 flex flex-col gap-2">
            <Link
              href="/collections"
              className="px-4 py-3 text-base font-medium text-fg/80 hover:text-fg hover:bg-accent/5 rounded-lg transition-colors duration-fast"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/collections?series=ANIMA"
              className="px-4 py-3 text-base font-medium text-fg/80 hover:text-fg hover:bg-accent/5 rounded-lg transition-colors duration-fast"
              onClick={() => setMobileMenuOpen(false)}
            >
              ANIMA Series
            </Link>
            <Link
              href="/collections?series=ANIMUS"
              className="px-4 py-3 text-base font-medium text-fg/80 hover:text-fg hover:bg-accent/5 rounded-lg transition-colors duration-fast"
              onClick={() => setMobileMenuOpen(false)}
            >
              ANIMUS Series
            </Link>
          </nav>
        </div>
      )}

      {/* FWA Ribbon */}
      <a
        href="https://thefwa.com/cases/x8-eyewear"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 animate-pulse-glow"
        aria-label="FWA Site of the Day Award"
      >
        <img
          src="/images/fwa-ribbon.png"
          alt="FWA Site of the Day"
          className="w-16 h-16 md:w-20 md:h-20"
        />
      </a>
    </header>
  );
}

import { useState } from 'react';

function animateSlideDown() {
  return 'animation: slideDown 0.3s ease-out-expo forwards';
}