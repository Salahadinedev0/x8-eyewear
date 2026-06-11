import { collections, collectionOrder, getCollectionById } from '@/lib/data/collections';
import { HeroVideo } from '@/components/shared/HeroVideo';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Marquee, MarqueeItem } from '@/components/shared/Marquee';
import { FwaRibbon } from '@/components/shared/FwaRibbon';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <FwaRibbon />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0 z-0">
          <HeroVideo
            src="/video/hero.mp4"
            poster="/images/hero-poster.jpg"
            alt="X8 Eyewear hero video - futuristic titanium eyewear"
          />
          <div className="absolute inset-0 bg-video-overlay" />
        </div>

        <div className="relative z-10 container-custom px-6">
          <ScrollReveal y={0} stagger={0.03} duration={1.2} once>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] text-balance">
              <span className="block">the future</span>
              <span className="block">will define us.</span>
              <span className="block text-accent">beyond reality,</span>
              <span className="block text-accent">as a virtual fantasy</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal y={40} stagger={0} duration={0.8} delay={0.6} once>
            <Link
              href="/collections"
              className="inline-flex items-center gap-3 mt-10 md:mt-12 px-8 py-4 bg-accent text-bg font-body font-semibold text-lg hover:bg-accent-hover transition-colors duration-fast"
            >
              Explore Collections
            </Link>
          </ScrollReveal>
        </div>

        <ScrollReveal y={60} stagger={0} duration={1} delay={1} once>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow">
            <svg
              className="w-6 h-6 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-20 md:py-32 bg-bg" aria-labelledby="collections-heading">
        <div className="container-custom px-6">
          <ScrollReveal y={60} stagger={0} duration={0.8} once>
            <h2 id="collections-heading" className="font-display font-semibold text-3xl md:text-4xl text-fg text-center mb-16">
              Our Collections
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionOrder.map((collectionId, index) => {
              const collection = getCollectionById(collectionId);
              if (!collection) return null;

              return (
                <ScrollReveal
                  key={collectionId}
                  y={60}
                  stagger={0}
                  duration={0.8}
                  delay={index * 0.1}
                  once
                >
                  <Link
                    href={`/collections?series=${collection.series}`}
                    className="group relative aspect-[4/5] overflow-hidden bg-bg-elevated border border-card-border hover:border-accent/50 transition-all duration-base ease-out-expo"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent z-10" />
                    <div className="relative h-full">
                      <img
                        src={`/images/collections/${collectionId}-hero.jpg`}
                        alt={`${collection.label} collection`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow ease-out-expo"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                      <span className="text-xs font-body font-medium text-accent uppercase tracking-wider block mb-2">
                        {collection.series} Series
                      </span>
                      <h3 className="font-display font-semibold text-2xl md:text-3xl text-fg mb-2">
                        {collection.label}
                      </h3>
                      <p className="text-sm text-muted font-body">
                        {collection.models.length} models · 4 variants each
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <Marquee className="py-12 border-y border-card-border bg-bg-elevated" duration={30}>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMA X1
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMA X2
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMA X3
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMUS Y1
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMUS Y2
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMUS Y3
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMA X1
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMA X2
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMA X3
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMUS Y1
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMUS Y2
          </span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="font-display font-semibold text-2xl md:text-3xl text-fg">
            ANIMUS Y3
          </span>
        </MarqueeItem>
      </Marquee>

      <section className="py-20 md:py-32 bg-bg" aria-labelledby="craft-heading">
        <div className="container-custom px-6 max-w-4xl mx-auto text-center">
          <ScrollReveal y={60} stagger={0} duration={0.8} once>
            <h2 id="craft-heading" className="font-display font-semibold text-3xl md:text-4xl text-fg mb-8">
              Meticulously Crafted
            </h2>
          </ScrollReveal>
          <ScrollReveal y={40} stagger={0.08} duration={0.8} delay={0.2} once>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-xl text-fg mb-2">Aerospace Titanium</h3>
                <p className="text-muted text-sm font-body">Grade 5 titanium frames — lightweight, hypoallergenic, virtually indestructible</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-xl text-fg mb-2">Precision Optics</h3>
                <p className="text-muted text-sm font-body">Carl Zeiss Vision lenses with anti-reflective, hydrophobic, and oleophobic coatings</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-xl text-fg mb-2">Hand Finished</h3>
                <p className="text-muted text-sm font-body">Each frame undergoes 200+ manual steps by master artisans in our Italian atelier</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}