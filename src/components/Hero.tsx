import { ArrowDownRight, Building2 } from 'lucide-react';
import { HERO_MEDIA, HERO_METRICS } from '../data/farmData';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onFocusWholesaleForm: () => void;
}

export function Hero({ onFocusWholesaleForm }: HeroProps) {
  return (
    <section id="home" className="border-b border-[#E5E1D8] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 lg:pt-12 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#D97706] tracking-wide mb-3">
                Yola, Adamawa State · Vet-Supervised Agribusiness
              </p>

              <h1
                className="font-display font-extrabold text-[#1F2937] tracking-tight leading-[1.08] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.6rem)' }}
              >
                Farm-fresh, hygienically dressed poultry raised right in Yola.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl">
                100% hormone-free broiler chicken, portioned cuts, live birds, and daily farm eggs—processed in our cold-chain abattoir with fast same-day delivery across Jimeta &amp; Yola Town.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg bg-[#1B4332] hover:bg-[#133124] text-[#FAF9F6] text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
              >
                <span>Order Fresh Chicken</span>
                <ArrowDownRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href="#wholesale"
                onClick={onFocusWholesaleForm}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-lg border border-[#1B4332]/25 bg-white hover:bg-[#F3F0E8] text-[#1B4332] text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
              >
                <Building2 className="w-4 h-4 shrink-0 text-[#D97706]" aria-hidden="true" />
                <span>Partner for Wholesale Supply</span>
              </a>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:min-h-[400px] rounded-xl overflow-hidden border border-[#E5E1D8] bg-[#F3F0E8]">
              <ResilientImage
                src={HERO_MEDIA.src}
                alt={HERO_MEDIA.alt}
                loading="eager"
                fallbackTitle="Yola Harvest Poultry Farm — Bajabure Axis, Yola"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 sm:p-6">
                <p className="text-xs sm:text-sm font-medium text-[#FAF9F6]/90">
                  Bajabure–Numan Road Facility · Daily Dispatch at 9:00 AM, 1:00 PM &amp; 4:30 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column Proof / KPI Strip directly below Hero */}
        <div className="mt-10 pt-8 border-t border-[#E5E1D8] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HERO_METRICS.map((metric) => (
            <div key={metric.value} className="space-y-1">
              <p className="font-display text-xl sm:text-2xl font-bold text-[#1B4332] tabular-nums">
                {metric.value}
              </p>
              <p className="text-sm text-[#4B5563] leading-snug">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
