import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-bg-elevated">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-display font-semibold text-2xl md:text-3xl text-fg mb-4 block">
              X8
            </Link>
            <p className="text-muted text-sm md:text-base max-w-xs font-body leading-relaxed">
              the future will define us. beyond reality, as a virtual fantasy
            </p>
            <p className="text-muted text-sm mt-4 max-w-xs font-body">
              Meticulously crafted titanium eyewear. Aerodynamically engineered for style and comfort.
            </p>
          </div>

          {/* Navigation */}
          <nav>
            <h3 className="font-body font-medium text-fg mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/collections" className="text-muted hover:text-fg text-sm transition-colors duration-fast">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/collections?series=ANIMA" className="text-muted hover:text-fg text-sm transition-colors duration-fast">
                  ANIMA Series
                </Link>
              </li>
              <li>
                <Link href="/collections?series=ANIMUS" className="text-muted hover:text-fg text-sm transition-colors duration-fast">
                  ANIMUS Series
                </Link>
              </li>
            </ul>
          </nav>

          {/* Support */}
          <nav>
            <h3 className="font-body font-medium text-fg mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted hover:text-fg text-sm transition-colors duration-fast">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-fg text-sm transition-colors duration-fast">
                  Shop Pay Installments
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-fg text-sm transition-colors duration-fast">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-fg text-sm transition-colors duration-fast">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-card-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm font-body">
            © {new Date().getFullYear()} X8 Eyewear. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://thefwa.com/cases/x8-eyewear"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent text-sm transition-colors duration-fast"
            >
              FWA Site of the Day
            </a>
            <a
              href="#"
              className="text-muted hover:text-accent text-sm transition-colors duration-fast"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted hover:text-accent text-sm transition-colors duration-fast"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}