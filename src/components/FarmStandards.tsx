import { FARM_STANDARDS, STANDARDS_MEDIA } from '../data/farmData';
import { ResilientImage } from './ResilientImage';

export function FarmStandards() {
  return (
    <section
      id="standards"
      className="py-14 lg:py-20 bg-white border-b border-[#E5E1D8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top split intro + facility image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-sm font-medium text-[#D97706] mb-2">
              Biosecurity &amp; Hygiene Standards
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2937] tracking-tight text-balance">
              Why Homes &amp; Kitchens Across Yola Trust Our Poultry
            </h2>
            <p className="mt-4 text-base text-[#4B5563] leading-relaxed">
              From day-old chick brooding to cold-chain dispatch, every flock is raised under strict veterinary supervision and processed in a spotless stainless-steel facility—never open-market slaughtering.
            </p>

            <dl className="mt-8 pt-6 border-t border-[#E5E1D8] grid grid-cols-2 gap-6">
              <div>
                <dt className="text-xs font-medium text-[#4B5563]">
                  Abattoir Chill Temp
                </dt>
                <dd className="font-display text-2xl font-bold text-[#1B4332] tabular-nums mt-1">
                  2°C – 4°C
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#4B5563]">
                  Vet Inspection Cycle
                </dt>
                <dd className="font-display text-2xl font-bold text-[#1B4332] mt-1">
                  Every Flock
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#E5E1D8] bg-[#F3F0E8] lg:h-full">
              <ResilientImage
                src={STANDARDS_MEDIA.src}
                alt={STANDARDS_MEDIA.alt}
                fallbackTitle="Cold-Chain Poultry Processing Room — Yola Harvest"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5">
                <p className="text-xs sm:text-sm font-medium text-[#FAF9F6]">
                  Food-grade stainless steel processing line &amp; vacuum-sealed chilled packs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Biosecurity & Hygiene Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FARM_STANDARDS.map((item) => (
            <article
              key={item.index}
              className="bg-[#FAF9F6] border border-[#E5E1D8] rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-xs font-semibold text-[#D97706] tabular-nums mb-2">
                  {item.index}.
                </p>
                <h3 className="font-display text-lg font-bold text-[#1F2937] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-[#1B4332] mt-1">
                  {item.summary}
                </p>
                <p className="text-sm text-[#4B5563] mt-3 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
