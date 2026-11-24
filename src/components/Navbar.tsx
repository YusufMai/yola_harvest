import { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { FARM_CONTACT } from '../data/farmData';

interface NavbarProps {
  whatsappOrderUrl: string;
  totalItems: number;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Wholesale/B2B', href: '#wholesale' },
  { label: 'Our Farm Standards', href: '#standards' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ whatsappOrderUrl, totalItems }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#1B4332] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4332]"
        >
          {FARM_CONTACT.brandName}
        </a>

        {/* Zone 2: 5 concise single-line text links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4B5563]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#1B4332] hover:underline underline-offset-4 decoration-[#D97706] decoration-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4332]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (+ mobile menu toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={whatsappOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] rounded-lg bg-[#1B4332] hover:bg-[#133124] text-[#FAF9F6] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              Order via WhatsApp{totalItems > 0 ? ` (${totalItems})` : ''}
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E5E1D8] bg-white text-[#1F2937] hover:bg-[#F3F0E8] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-[#E5E1D8] bg-[#FAF9F6] px-4 py-3"
        >
          <ul className="divide-y divide-[#E5E1D8]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-base font-medium text-[#1F2937] hover:text-[#1B4332]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
