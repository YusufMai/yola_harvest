import { useState } from 'react';
import {
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import {
  DELIVERY_ZONES,
  DeliveryZone,
  FARM_CONTACT,
  ProductVariant,
  buildWhatsAppUrl,
  formatNaira,
} from '../data/farmData';

export interface CartItem {
  itemKey: string;
  variant: ProductVariant;
  groupTitle: string;
  cutLabel?: string;
  quantity: number;
}

interface OrderCalculatorProps {
  items: CartItem[];
  selectedZone: DeliveryZone;
  onSelectZone: (zoneId: string) => void;
  deliveryWindow: string;
  onSelectWindow: (windowLabel: string) => void;
  customerName: string;
  onChangeCustomerName: (value: string) => void;
  landmark: string;
  onChangeLandmark: (value: string) => void;
  onUpdateQuantity: (variantId: string, delta: number) => void;
  onClearCart: () => void;
  onAddStarterPack: () => void;
  whatsappMessage: string;
}

const DELIVERY_WINDOWS = [
  'Morning (8:00 AM – 12:00 PM)',
  'Afternoon (12:00 PM – 4:00 PM)',
  'Evening (4:00 PM – 6:30 PM)',
];

export function OrderCalculator({
  items,
  selectedZone,
  onSelectZone,
  deliveryWindow,
  onSelectWindow,
  customerName,
  onChangeCustomerName,
  landmark,
  onChangeLandmark,
  onUpdateQuantity,
  onClearCart,
  onAddStarterPack,
  whatsappMessage,
}: OrderCalculatorProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.priceNgn * item.quantity,
    0
  );
  const qualifiesFreeDelivery =
    subtotal >= FARM_CONTACT.freeDeliveryThresholdNgn && selectedZone.feeNgn > 0;
  const effectiveDeliveryFee =
    items.length === 0 ? 0 : qualifiesFreeDelivery ? 0 : selectedZone.feeNgn;
  const total = subtotal + effectiveDeliveryFee;
  const remainingForFreeDelivery = Math.max(
    0,
    FARM_CONTACT.freeDeliveryThresholdNgn - subtotal
  );

  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  async function handleCopySummary() {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setShowPreview(true);
    }
  }

  return (
    <aside
      aria-label="Order calculator and WhatsApp checkout"
      className="bg-white border border-[#E5E1D8] rounded-xl p-5 sm:p-6 lg:sticky lg:top-24"
    >
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E5E1D8]">
        <div>
          <h3 className="font-display text-lg font-bold text-[#1F2937]">
            Order Calculator
          </h3>
          <p className="text-xs text-[#4B5563] mt-0.5">
            Direct WhatsApp dispatch · Pay on delivery or transfer
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={onClearCart}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4B5563] hover:text-[#B45309] transition-colors py-1.5 px-2 rounded focus-visible:outline-2 focus-visible:outline-[#1B4332]"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Itemized list or empty state */}
      {items.length === 0 ? (
        <div className="py-8 text-center border-b border-[#E5E1D8]">
          <ShoppingBag
            className="w-8 h-8 text-[#1B4332]/40 mx-auto mb-3"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-[#1F2937]">
            Your order basket is empty
          </p>
          <p className="text-xs text-[#4B5563] mt-1 max-w-xs mx-auto leading-relaxed">
            Use the + buttons on any poultry cut, dressed bird, live bird, or egg crate to calculate your total.
          </p>
          <button
            type="button"
            onClick={onAddStarterPack}
            className="mt-4 inline-flex items-center justify-center px-3.5 py-2 min-h-[40px] rounded-lg border border-[#1B4332]/25 bg-[#FAF9F6] hover:bg-[#F3F0E8] text-xs font-semibold text-[#1B4332] transition-colors focus-visible:outline-2 focus-visible:outline-[#1B4332]"
          >
            + Add 1 Large Bird &amp; 1 Crate of Eggs
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-[#E5E1D8] max-h-72 overflow-y-auto pr-1">
          {items.map((item) => (
            <li
              key={item.itemKey}
              className="py-3.5 flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1F2937] leading-snug">
                  {item.variant.name}
                </p>
                <p className="text-xs text-[#4B5563] mt-0.5">
                  {item.cutLabel ? `${item.cutLabel} · ` : ''}
                  {item.variant.spec} · {formatNaira(item.variant.priceNgn)}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-sm font-semibold text-[#1F2937] tabular-nums">
                  {formatNaira(item.variant.priceNgn * item.quantity)}
                </span>

                <div className="inline-flex items-center border border-[#E5E1D8] rounded-md bg-[#FAF9F6]">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.itemKey, -1)}
                    aria-label={`Decrease ${item.variant.name}`}
                    className="w-8 h-8 flex items-center justify-center text-[#1F2937] hover:bg-[#F3F0E8] rounded-l-md transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#1F2937]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.itemKey, 1)}
                    aria-label={`Increase ${item.variant.name}`}
                    className="w-8 h-8 flex items-center justify-center text-[#1F2937] hover:bg-[#F3F0E8] rounded-r-md transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delivery Details */}
      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="delivery-zone"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1F2937] mb-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D97706]" aria-hidden="true" />
            <span>Delivery Location (Yola &amp; Jimeta)</span>
          </label>
          <select
            id="delivery-zone"
            value={selectedZone.id}
            onChange={(e) => onSelectZone(e.target.value)}
            className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-[#E5E1D8] bg-[#FAF9F6] text-sm text-[#1F2937] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
          >
            {DELIVERY_ZONES.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name} — {zone.feeNgn === 0 ? 'Free' : formatNaira(zone.feeNgn)}
              </option>
            ))}
          </select>
          <p className="text-xs text-[#4B5563] mt-1">
            Estimated arrival: {selectedZone.eta}
          </p>
        </div>

        <div>
          <label
            htmlFor="delivery-window"
            className="block text-xs font-semibold text-[#1F2937] mb-1.5"
          >
            Preferred Dispatch Window
          </label>
          <select
            id="delivery-window"
            value={deliveryWindow}
            onChange={(e) => onSelectWindow(e.target.value)}
            className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-[#E5E1D8] bg-[#FAF9F6] text-sm text-[#1F2937] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
          >
            {DELIVERY_WINDOWS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          <div>
            <label
              htmlFor="customer-name"
              className="block text-xs font-semibold text-[#1F2937] mb-1"
            >
              Your Name (Optional)
            </label>
            <input
              id="customer-name"
              type="text"
              value={customerName}
              onChange={(e) => onChangeCustomerName(e.target.value)}
              placeholder="e.g. Amina Bello"
              className="w-full min-h-[42px] px-3 py-2 rounded-lg border border-[#E5E1D8] bg-[#FAF9F6] text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B4332]"
            />
          </div>

          <div>
            <label
              htmlFor="delivery-landmark"
              className="block text-xs font-semibold text-[#1F2937] mb-1"
            >
              Street / Landmark (Optional)
            </label>
            <input
              id="delivery-landmark"
              type="text"
              value={landmark}
              onChange={(e) => onChangeLandmark(e.target.value)}
              placeholder="e.g. Off Galadima Aminu Way, near mosque"
              className="w-full min-h-[42px] px-3 py-2 rounded-lg border border-[#E5E1D8] bg-[#FAF9F6] text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B4332]"
            />
          </div>
        </div>
      </div>

      {/* Totals Breakdown */}
      <div className="mt-5 pt-4 border-t border-[#E5E1D8] space-y-2 text-sm">
        <div className="flex items-center justify-between text-[#4B5563]">
          <span>Items Subtotal</span>
          <span className="font-medium text-[#1F2937] tabular-nums">
            {formatNaira(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-[#4B5563]">
          <span>Delivery ({selectedZone.axis})</span>
          <span className="font-medium text-[#1F2937] tabular-nums">
            {items.length === 0
              ? '₦0'
              : qualifiesFreeDelivery
                ? 'Free'
                : effectiveDeliveryFee === 0
                  ? 'Free'
                  : formatNaira(effectiveDeliveryFee)}
          </span>
        </div>

        {items.length > 0 && remainingForFreeDelivery > 0 && selectedZone.feeNgn > 0 && (
          <p className="text-xs text-[#D97706] font-medium">
            Add {formatNaira(remainingForFreeDelivery)} more for free Jimeta &amp; Yola delivery.
          </p>
        )}

        <div className="pt-2 border-t border-[#E5E1D8] flex items-center justify-between">
          <span className="font-display font-bold text-base text-[#1F2937]">
            Estimated Total
          </span>
          <span className="font-display font-bold text-xl text-[#1B4332] tabular-nums">
            {formatNaira(total)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 space-y-2.5">
        {items.length > 0 ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-lg bg-[#1B4332] hover:bg-[#133124] text-[#FAF9F6] text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Send Order via WhatsApp</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-lg bg-[#E5E1D8] text-[#6B7280] text-sm font-semibold cursor-not-allowed"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Select Items to Order</span>
          </button>
        )}

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[40px] rounded-lg border border-[#E5E1D8] bg-[#FAF9F6] hover:bg-[#F3F0E8] text-xs font-semibold text-[#1F2937] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#1B4332]" aria-hidden="true" />
                  <span>Copied Order</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowPreview((prev) => !prev)}
              className="px-3 py-2.5 min-h-[40px] rounded-lg border border-[#E5E1D8] bg-white hover:bg-[#F3F0E8] text-xs font-semibold text-[#4B5563] transition-colors"
            >
              {showPreview ? 'Hide Message' : 'Preview Text'}
            </button>
          </div>
        )}
      </div>

      {showPreview && items.length > 0 && (
        <pre className="mt-3 p-3 rounded-lg bg-[#FAF9F6] border border-[#E5E1D8] text-xs text-[#1F2937] whitespace-pre-wrap font-sans leading-relaxed">
          {whatsappMessage}
        </pre>
      )}
    </aside>
  );
}
