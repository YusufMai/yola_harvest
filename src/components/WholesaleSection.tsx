import { FormEvent, RefObject, useState } from 'react';
import { CheckCircle2, MessageCircle, Send } from 'lucide-react';
import {
  BUSINESS_TYPES,
  DELIVERY_DAYS,
  buildWhatsAppUrl,
} from '../data/farmData';

interface WholesaleSectionProps {
  businessInputRef: RefObject<HTMLInputElement | null>;
}

interface WholesaleSubmission {
  referenceId: string;
  businessName: string;
  businessType: string;
  weeklyQuantity: string;
  deliveryDays: string[];
  phone: string;
  notes: string;
}

const QUANTITY_PRESETS = [
  '25 – 50 birds / crates weekly',
  '50 – 150 birds / crates weekly',
  '150 – 300 birds / crates weekly',
  '300+ birds / crates (Hotel or Event Contract)',
];

export function WholesaleSection({ businessInputRef }: WholesaleSectionProps) {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<string>(BUSINESS_TYPES[0]);
  const [weeklyQuantity, setWeeklyQuantity] = useState<string>(QUANTITY_PRESETS[0]);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Thu']);
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submission, setSubmission] = useState<WholesaleSubmission | null>(null);

  function toggleDay(day: string) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = businessName.trim();
    const trimmedPhone = phone.trim();
    const digitsOnly = trimmedPhone.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      setErrorMsg('Please enter your business, hotel, restaurant, or event name.');
      return;
    }

    if (selectedDays.length === 0) {
      setErrorMsg('Please select at least one preferred weekly delivery day.');
      return;
    }

    if (digitsOnly.length < 10 || digitsOnly.length > 14) {
      setErrorMsg('Please enter a valid Nigerian phone or WhatsApp number (e.g. 0803 555 0194).');
      return;
    }

    const refCode = `YHP-B2B-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmission({
      referenceId: refCode,
      businessName: trimmedName,
      businessType,
      weeklyQuantity,
      deliveryDays: selectedDays,
      phone: trimmedPhone,
      notes: notes.trim(),
    });
  }

  function buildB2BWhatsAppUrl(data: WholesaleSubmission): string {
    const lines = [
      `Hello Yola Harvest Wholesale Desk,`,
      `I just submitted a B2B Supply Quote Request (${data.referenceId}):`,
      ``,
      `• Business Name: ${data.businessName}`,
      `• Category: ${data.businessType}`,
      `• Weekly Volume: ${data.weeklyQuantity}`,
      `• Preferred Delivery Days: ${data.deliveryDays.join(', ')}`,
      `• Contact Phone: ${data.phone}`,
      data.notes ? `• Specs / Notes: ${data.notes}` : null,
      ``,
      `Please share your current wholesale rate sheet and delivery schedule.`,
    ].filter(Boolean);

    return buildWhatsAppUrl(lines.join('\n'));
  }

  return (
    <section
      id="wholesale"
      className="py-14 lg:py-20 bg-[#1B4332] text-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: B2B Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-medium text-[#FBBF24] mb-2">
                Wholesale &amp; Commercial Procurement
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
                Reliable Bulk Poultry Supply for Hotels, Grills &amp; Events
              </h2>
              <p className="mt-4 text-base text-[#FAF9F6]/85 leading-relaxed">
                Keep your kitchen stocked without last-minute market runs. We supply graded dressed birds, boneless shawarma breast, suya-cut wings, and wholesale egg cartons across Adamawa on fixed weekly schedules.
              </p>
            </div>

            <div className="pt-6 border-t border-white/15 space-y-5">
              <div>
                <h3 className="font-display text-base font-semibold text-[#FAF9F6]">
                  Custom Portioning for Commercial Kitchens
                </h3>
                <p className="text-sm text-[#FAF9F6]/80 mt-1 leading-relaxed">
                  Request pre-trimmed boneless breast strips for shawarma vendors, uniform 4-piece grill cuts for suya spots, or calibrated 2.2kg+ whole birds for hotel banquets.
                </p>
              </div>

              <div>
                <h3 className="font-display text-base font-semibold text-[#FAF9F6]">
                  Standing Weekly Schedules &amp; Event Pre-Booking
                </h3>
                <p className="text-sm text-[#FAF9F6]/80 mt-1 leading-relaxed">
                  Lock in Monday–Saturday morning deliveries before 8:00 AM, plus priority flock reservation for weddings, conferences, and Sallah/Christmas bulk orders.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-[#133124] border border-white/10">
                  <p className="font-display text-xl font-bold text-[#FBBF24] tabular-nums">
                    25+ Birds
                  </p>
                  <p className="text-xs text-[#FAF9F6]/80 mt-0.5">
                    Minimum order for wholesale carton pricing
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#133124] border border-white/10">
                  <p className="font-display text-xl font-bold text-[#FBBF24] tabular-nums">
                    Before 8 AM
                  </p>
                  <p className="text-xs text-[#FAF9F6]/80 mt-0.5">
                    Priority cold-van kitchen drop-offs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF9F6] text-[#1F2937] rounded-xl p-6 sm:p-8 border border-[#E5E1D8]">
              {submission ? (
                <div className="py-4 space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-7 h-7 text-[#1B4332] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-mono font-semibold text-[#D97706] tabular-nums">
                        Reference {submission.referenceId}
                      </p>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1F2937] mt-1">
                        Wholesale Quote Request Ready
                      </h3>
                      <p className="text-sm text-[#4B5563] mt-1">
                        Your supply brief for <strong className="text-[#1F2937]">{submission.businessName}</strong> has been prepared. Send it straight to our Yola Wholesale Desk on WhatsApp for instant rate-card confirmation.
                      </p>
                    </div>
                  </div>

                  <dl className="divide-y divide-[#E5E1D8] border-y border-[#E5E1D8] text-sm">
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#4B5563]">Category</dt>
                      <dd className="font-semibold text-[#1F2937] text-right">
                        {submission.businessType}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#4B5563]">Weekly Quantity</dt>
                      <dd className="font-semibold text-[#1F2937] text-right">
                        {submission.weeklyQuantity}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#4B5563]">Delivery Days</dt>
                      <dd className="font-semibold text-[#1F2937] text-right">
                        {submission.deliveryDays.join(', ')}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#4B5563]">Phone / WhatsApp</dt>
                      <dd className="font-semibold text-[#1F2937] tabular-nums text-right">
                        {submission.phone}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={buildB2BWhatsAppUrl(submission)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] rounded-lg bg-[#1B4332] hover:bg-[#133124] text-[#FAF9F6] text-sm font-semibold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send Brief to Wholesale WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmission(null);
                        setBusinessName('');
                        setPhone('');
                        setNotes('');
                      }}
                      className="inline-flex items-center justify-center px-4 py-3 min-h-[48px] rounded-lg border border-[#E5E1D8] bg-white hover:bg-[#F3F0E8] text-sm font-semibold text-[#1F2937] transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#1F2937]">
                      Quick Wholesale Quote Request
                    </h3>
                    <p className="text-sm text-[#4B5563] mt-1">
                      Tell us your weekly poultry volume and delivery days across Yola or Jimeta.
                    </p>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-lg bg-[#FEF3C7] border border-[#D97706]/40 text-sm font-medium text-[#92400E]"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="b2b-business-name"
                        className="block text-xs font-semibold text-[#1F2937] mb-1.5"
                      >
                        Business or Event Name *
                      </label>
                      <input
                        ref={businessInputRef}
                        id="b2b-business-name"
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Lamido Crescent Grill"
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#E5E1D8] bg-white text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="b2b-business-type"
                        className="block text-xs font-semibold text-[#1F2937] mb-1.5"
                      >
                        Business Category *
                      </label>
                      <select
                        id="b2b-business-type"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#E5E1D8] bg-white text-sm text-[#1F2937] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                      >
                        {BUSINESS_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="b2b-weekly-quantity"
                        className="block text-xs font-semibold text-[#1F2937] mb-1.5"
                      >
                        Weekly Quantity Needed *
                      </label>
                      <select
                        id="b2b-weekly-quantity"
                        value={weeklyQuantity}
                        onChange={(e) => setWeeklyQuantity(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#E5E1D8] bg-white text-sm text-[#1F2937] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                      >
                        {QUANTITY_PRESETS.map((preset) => (
                          <option key={preset} value={preset}>
                            {preset}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="b2b-phone"
                        className="block text-xs font-semibold text-[#1F2937] mb-1.5"
                      >
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        id="b2b-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0803 555 0194"
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#E5E1D8] bg-white text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-[#1F2937] mb-2">
                      Preferred Delivery Days *
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {DELIVERY_DAYS.map((day) => {
                        const active = selectedDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            aria-pressed={active}
                            className={`px-3.5 py-2 min-h-[40px] rounded-lg border text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1B4332] ${
                              active
                                ? 'bg-[#1B4332] border-[#1B4332] text-[#FAF9F6]'
                                : 'bg-white border-[#E5E1D8] text-[#4B5563] hover:text-[#1F2937] hover:bg-[#F3F0E8]'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="b2b-notes"
                      className="block text-xs font-semibold text-[#1F2937] mb-1.5"
                    >
                      Custom Cuts or Event Date (Optional)
                    </label>
                    <input
                      id="b2b-notes"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. 40kg boneless breast + 30 crates eggs every Tuesday"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#E5E1D8] bg-white text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
                  >
                    <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Request Wholesale Quote</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
