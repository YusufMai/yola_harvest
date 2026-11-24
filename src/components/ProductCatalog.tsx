import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import {
  DeliveryZone,
  MARINADE_CUT_OPTIONS,
  MarinadeCutOption,
  PRODUCT_GROUPS,
  ProductCategory,
  formatNaira,
} from '../data/farmData';
import { CartItem, OrderCalculator } from './OrderCalculator';
import { ResilientImage } from './ResilientImage';

interface ProductCatalogProps {
  quantities: Record<string, number>;
  selectedMarinadeCut: MarinadeCutOption;
  onSelectMarinadeCut: (cut: MarinadeCutOption) => void;
  onUpdateQuantity: (itemKey: string, delta: number) => void;
  onClearCart: () => void;
  onAddStarterPack: () => void;
  cartItems: CartItem[];
  selectedZone: DeliveryZone;
  onSelectZone: (zoneId: string) => void;
  deliveryWindow: string;
  onSelectWindow: (windowLabel: string) => void;
  customerName: string;
  onChangeCustomerName: (value: string) => void;
  landmark: string;
  onChangeLandmark: (value: string) => void;
  whatsappMessage: string;
}

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'dressed', label: 'Whole Dressed' },
  { id: 'live', label: 'Live Broilers' },
  { id: 'guinea-fowl', label: 'Guinea Fowl' },
  { id: 'cuts', label: 'Cut Parts' },
  { id: 'marinades', label: 'Marinades' },
  { id: 'eggs', label: 'Table Eggs' },
];

export function ProductCatalog({
  quantities,
  selectedMarinadeCut,
  onSelectMarinadeCut,
  onUpdateQuantity,
  onClearCart,
  onAddStarterPack,
  cartItems,
  selectedZone,
  onSelectZone,
  deliveryWindow,
  onSelectWindow,
  customerName,
  onChangeCustomerName,
  landmark,
  onChangeLandmark,
  whatsappMessage,
}: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');

  const visibleGroups =
    activeCategory === 'all'
      ? PRODUCT_GROUPS
      : PRODUCT_GROUPS.filter(
          (group) =>
            group.category === activeCategory ||
            group.extraCategories?.includes(activeCategory)
        );

  return (
    <section id="products" className="py-14 lg:py-20 bg-[#FAF9F6] border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#D97706] mb-2">
              Fresh Daily Harvest · Direct from Yola
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2937] tracking-tight text-balance">
              Order Chicken, Guinea Fowl, Marinades &amp; Fresh Eggs
            </h2>
            <p className="mt-2.5 text-base text-[#4B5563]">
              Select dressed broilers, live birds, guinea fowl, chef-marinated packs, or fresh chicken and guinea fowl eggs below. Your itemized WhatsApp order calculates automatically.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter poultry products"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F3F0E8] border border-[#E5E1D8] rounded-xl self-start md:self-auto"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-2 min-h-[38px] text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1B4332] ${
                    isActive
                      ? 'bg-[#1B4332] text-[#FAF9F6]'
                      : 'text-[#4B5563] hover:text-[#1F2937] hover:bg-white/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Storefront Layout: 8 Cols Catalog + 4 Cols Order Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleGroups.map((group) => {
              const isMarinadeGroup = group.category === 'marinades';
              const isWide = Boolean(group.featuredWide);

              return (
                <article
                  key={group.id}
                  className={`bg-white border border-[#E5E1D8] rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 ${
                    isWide ? 'md:col-span-2' : ''
                  }`}
                >
                  <div
                    className={
                      isWide
                        ? 'grid grid-cols-1 md:grid-cols-12 items-stretch flex-1'
                        : 'flex flex-col flex-1'
                    }
                  >
                    <div
                      className={
                        isWide
                          ? 'md:col-span-5 aspect-[4/3] md:aspect-auto w-full bg-[#F3F0E8] overflow-hidden border-b md:border-b-0 md:border-r border-[#E5E1D8]'
                          : 'aspect-[4/3] w-full bg-[#F3F0E8] overflow-hidden border-b border-[#E5E1D8]'
                      }
                    >
                      <ResilientImage
                        src={group.image}
                        alt={group.imageAlt}
                        fallbackTitle={group.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div
                      className={
                        isWide
                          ? 'md:col-span-7 p-5 sm:p-6 flex flex-col'
                          : 'p-5 sm:p-6 flex-1 flex flex-col'
                      }
                    >
                      <p className="text-xs font-medium text-[#4B5563] tracking-wide">
                        {group.kicker}
                      </p>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#1F2937] mt-1">
                        {group.title}
                      </h3>
                      <p className="text-sm text-[#4B5563] mt-1.5 leading-relaxed">
                        {group.description}
                      </p>

                      {isMarinadeGroup && (
                        <div className="mt-4 pt-3 border-t border-[#E5E1D8]">
                          <span className="block text-xs font-semibold text-[#1F2937] mb-2">
                            Select Cut Style for Marinade Pack:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {MARINADE_CUT_OPTIONS.map((cut) => {
                              const active = selectedMarinadeCut === cut;
                              return (
                                <button
                                  key={cut}
                                  type="button"
                                  onClick={() => onSelectMarinadeCut(cut)}
                                  aria-pressed={active}
                                  className={`px-3 py-1.5 min-h-[36px] rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1B4332] ${
                                    active
                                      ? 'bg-[#D97706] border-[#D97706] text-white'
                                      : 'bg-[#FAF9F6] border-[#E5E1D8] text-[#4B5563] hover:text-[#1F2937] hover:bg-[#F3F0E8]'
                                  }`}
                                >
                                  {cut}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Hairline-divided variants with instant quantity steppers */}
                      <ul
                        className={`mt-4 pt-2 border-t border-[#E5E1D8] divide-y divide-[#E5E1D8] flex-1 ${
                          isWide ? 'grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 sm:divide-y-0' : ''
                        }`}
                      >
                        {group.variants.map((variant) => {
                          const itemKey = isMarinadeGroup
                            ? `${variant.id}__${selectedMarinadeCut}`
                            : variant.id;
                          const qty = quantities[itemKey] || 0;

                          return (
                            <li
                              key={variant.id}
                              className={`py-3 flex items-center justify-between gap-3 ${
                                isWide ? 'border-b border-[#E5E1D8]' : ''
                              }`}
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#1F2937] truncate">
                                  {variant.name}
                                </p>
                                <p className="text-xs text-[#4B5563] truncate">
                                  {variant.spec}
                                </p>
                              </div>

                              <div className="flex items-center gap-2.5 shrink-0">
                                <span className="text-sm font-bold text-[#1B4332] tabular-nums">
                                  {formatNaira(variant.priceNgn)}
                                </span>

                                <div className="inline-flex items-center border border-[#E5E1D8] rounded-lg bg-[#FAF9F6]">
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity(itemKey, -1)}
                                    disabled={qty === 0}
                                    aria-label={`Remove one ${variant.name}${
                                      isMarinadeGroup ? ` (${selectedMarinadeCut})` : ''
                                    }`}
                                    className="w-9 h-9 flex items-center justify-center text-[#1F2937] hover:bg-[#F3F0E8] disabled:opacity-35 disabled:hover:bg-transparent rounded-l-lg transition-colors"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="w-7 text-center text-xs sm:text-sm font-semibold tabular-nums text-[#1F2937]">
                                    {qty}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity(itemKey, 1)}
                                    aria-label={`Add one ${variant.name}${
                                      isMarinadeGroup ? ` (${selectedMarinadeCut})` : ''
                                    }`}
                                    className="w-9 h-9 flex items-center justify-center text-[#1B4332] hover:bg-[#1B4332] hover:text-white rounded-r-lg transition-colors"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div id="order-calculator" className="lg:col-span-4">
            <OrderCalculator
              items={cartItems}
              selectedZone={selectedZone}
              onSelectZone={onSelectZone}
              deliveryWindow={deliveryWindow}
              onSelectWindow={onSelectWindow}
              customerName={customerName}
              onChangeCustomerName={onChangeCustomerName}
              landmark={landmark}
              onChangeLandmark={onChangeLandmark}
              onUpdateQuantity={onUpdateQuantity}
              onClearCart={onClearCart}
              onAddStarterPack={onAddStarterPack}
              whatsappMessage={whatsappMessage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
