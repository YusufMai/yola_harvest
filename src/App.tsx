import { useMemo, useRef, useState } from 'react';
import { ArrowDown, ShoppingBag } from 'lucide-react';
import { FarmStandards } from './components/FarmStandards';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { CartItem } from './components/OrderCalculator';
import { ProductCatalog } from './components/ProductCatalog';
import { WholesaleSection } from './components/WholesaleSection';
import {
  DELIVERY_ZONES,
  FARM_CONTACT,
  MARINADE_CUT_OPTIONS,
  MarinadeCutOption,
  PRODUCT_GROUPS,
  ProductVariant,
  buildWhatsAppUrl,
  formatNaira,
} from './data/farmData';

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedMarinadeCut, setSelectedMarinadeCut] = useState<MarinadeCutOption>(
    MARINADE_CUT_OPTIONS[0]
  );
  const [selectedZoneId, setSelectedZoneId] = useState<string>(DELIVERY_ZONES[0].id);
  const [deliveryWindow, setDeliveryWindow] = useState<string>(
    'Morning (8:00 AM – 12:00 PM)'
  );
  const [customerName, setCustomerName] = useState('');
  const [landmark, setLandmark] = useState('');

  const businessInputRef = useRef<HTMLInputElement | null>(null);

  const selectedZone = useMemo(
    () => DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || DELIVERY_ZONES[0],
    [selectedZoneId]
  );

  const variantLookup = useMemo(() => {
    const map = new Map<string, { variant: ProductVariant; groupTitle: string }>();
    for (const group of PRODUCT_GROUPS) {
      for (const variant of group.variants) {
        map.set(variant.id, { variant, groupTitle: group.title });
      }
    }
    return map;
  }, []);

  const cartItems: CartItem[] = useMemo(() => {
    const items: CartItem[] = [];
    for (const [itemKey, qty] of Object.entries(quantities)) {
      if (qty <= 0) continue;
      const [variantId, cutLabel] = itemKey.split('__');
      const entry = variantLookup.get(variantId);
      if (!entry) continue;
      items.push({
        itemKey,
        variant: entry.variant,
        groupTitle: entry.groupTitle,
        cutLabel,
        quantity: qty,
      });
    }
    return items;
  }, [quantities, variantLookup]);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.variant.priceNgn * item.quantity,
        0
      ),
    [cartItems]
  );

  const qualifiesFreeDelivery =
    subtotal >= FARM_CONTACT.freeDeliveryThresholdNgn && selectedZone.feeNgn > 0;
  const effectiveDeliveryFee =
    cartItems.length === 0 ? 0 : qualifiesFreeDelivery ? 0 : selectedZone.feeNgn;
  const total = subtotal + effectiveDeliveryFee;

  const whatsappMessage = useMemo(() => {
    if (cartItems.length === 0) {
      return 'Hello Yola Harvest Poultry, I would like to order fresh dressed chicken / eggs for delivery in Yola.';
    }

    const itemLines = cartItems.map(
      (item) =>
        `• ${item.quantity}x ${item.variant.name} (${
          item.cutLabel ? `${item.cutLabel} · ` : ''
        }${item.variant.spec}) — ${formatNaira(item.variant.priceNgn * item.quantity)}`
    );

    const lines = [
      'Hello Yola Harvest Poultry, I would like to place an order:',
      '',
      ...itemLines,
      '',
      `Items Subtotal: ${formatNaira(subtotal)}`,
      `Delivery Location: ${selectedZone.name}`,
      `Delivery Fee: ${
        effectiveDeliveryFee === 0 ? 'Free' : formatNaira(effectiveDeliveryFee)
      }`,
      `Estimated Total: ${formatNaira(total)}`,
      `Preferred Window: ${deliveryWindow}`,
      customerName.trim() ? `Customer Name: ${customerName.trim()}` : null,
      landmark.trim() ? `Street / Landmark: ${landmark.trim()}` : null,
      '',
      'Please confirm availability and dispatch time.',
    ].filter((line): line is string => line !== null);

    return lines.join('\n');
  }, [
    cartItems,
    subtotal,
    selectedZone.name,
    effectiveDeliveryFee,
    total,
    deliveryWindow,
    customerName,
    landmark,
  ]);

  const navbarWhatsappUrl = useMemo(
    () => buildWhatsAppUrl(whatsappMessage),
    [whatsappMessage]
  );

  function handleUpdateQuantity(itemKey: string, delta: number) {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[itemKey] || 0) + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemKey];
        return copy;
      }
      return { ...prev, [itemKey]: next };
    });
  }

  function handleClearCart() {
    setQuantities({});
  }

  function handleAddStarterPack() {
    setQuantities({
      'dressed-large': 1,
      'eggs-large': 1,
    });
  }

  function handleFocusWholesaleForm() {
    window.setTimeout(() => {
      businessInputRef.current?.focus();
    }, 350);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1F2937]">
      <Navbar whatsappOrderUrl={navbarWhatsappUrl} totalItems={totalItems} />

      <main className="flex-1">
        <Hero onFocusWholesaleForm={handleFocusWholesaleForm} />

        <ProductCatalog
          quantities={quantities}
          selectedMarinadeCut={selectedMarinadeCut}
          onSelectMarinadeCut={setSelectedMarinadeCut}
          onUpdateQuantity={handleUpdateQuantity}
          onClearCart={handleClearCart}
          onAddStarterPack={handleAddStarterPack}
          cartItems={cartItems}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZoneId}
          deliveryWindow={deliveryWindow}
          onSelectWindow={setDeliveryWindow}
          customerName={customerName}
          onChangeCustomerName={setCustomerName}
          landmark={landmark}
          onChangeLandmark={setLandmark}
          whatsappMessage={whatsappMessage}
        />

        <FarmStandards />

        <WholesaleSection businessInputRef={businessInputRef} />
      </main>

      <Footer />

      {/* Mobile-only compact jump-to-basket bar when items are selected */}
      {totalItems > 0 && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#1B4332] text-[#FAF9F6] border-t border-white/15 px-4 py-2">
          <a
            href="#order-calculator"
            className="flex items-center justify-between gap-3 max-w-lg mx-auto min-h-[32px]"
          >
            <div className="flex items-center gap-2 text-xs font-semibold">
              <ShoppingBag className="w-4 h-4 text-[#FBBF24]" aria-hidden="true" />
              <span className="tabular-nums">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} · {formatNaira(total)}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FBBF24] whitespace-nowrap">
              <span>Checkout</span>
              <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
