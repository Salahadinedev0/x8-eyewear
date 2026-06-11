'use client';

export function FwaRibbon() {
  return (
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
  );
}