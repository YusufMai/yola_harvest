import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { DELIVERY_ZONES, FARM_CONTACT, buildWhatsAppUrl } from '../data/farmData';

export function Footer() {
  const generalWhatsapp = buildWhatsAppUrl(
    'Hello Yola Harvest Poultry, I would like to make an inquiry about fresh chicken / eggs in Yola.'
  );

  return (
    <footer id="contact" className="bg-[#FAF9F6] border-t border-[#E5E1D8] text-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Farm Identity & Address */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#1B4332]">
              {FARM_CONTACT.fullBrandName}
            </h2>
            <p className="text-sm text-[#4B5563] leading-relaxed max-w-sm">
              Commercial poultry production, hygienic cold-chain dressing, and daily table egg supply serving households and hospitality businesses across Adamawa State.
            </p>
            <div className="space-y-2.5 pt-1 text-sm text-[#4B5563]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{FARM_CONTACT.address}</span>
              </p>
              <p className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {FARM_CONTACT.hoursRetail}
                  <br />
                  {FARM_CONTACT.hoursSunday}
                </span>
              </p>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-bold text-[#1F2937]">
              Orders &amp; Dispatch Desk
            </h3>
            <ul className="space-y-2.5 text-sm text-[#4B5563]">
              <li>
                <a
                  href={generalWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-[#1B4332] hover:underline underline-offset-4"
                >
                  <MessageCircle className="w-4 h-4 text-[#D97706]" aria-hidden="true" />
                  <span>WhatsApp: {FARM_CONTACT.displayPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${FARM_CONTACT.whatsappNumber}`}
                  className="inline-flex items-center gap-2 hover:text-[#1B4332]"
                >
                  <Phone className="w-4 h-4 text-[#4B5563]" aria-hidden="true" />
                  <span className="tabular-nums">Call: {FARM_CONTACT.secondaryPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${FARM_CONTACT.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#1B4332]"
                >
                  <Mail className="w-4 h-4 text-[#4B5563]" aria-hidden="true" />
                  <span>{FARM_CONTACT.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery Coverage */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-bold text-[#1F2937]">
              Yola &amp; Jimeta Delivery Axes
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-[#4B5563]">
              {DELIVERY_ZONES.slice(0, 8).map((zone) => (
                <li key={zone.id} className="truncate">
                  {zone.name.split(' (')[0]}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Social */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-sm font-bold text-[#1F2937]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-[#4B5563]">
              <li>
                <a href="#products" className="hover:text-[#1B4332]">
                  Order Calculator
                </a>
              </li>
              <li>
                <a href="#wholesale" className="hover:text-[#1B4332]">
                  Wholesale / B2B
                </a>
              </li>
              <li>
                <a href="#standards" className="hover:text-[#1B4332]">
                  Biosecurity Standards
                </a>
              </li>
              <li className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#1B4332]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E5E1D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#4B5563]">
          <p>© {new Date().getFullYear()} {FARM_CONTACT.fullBrandName}. Yola, Adamawa State, Nigeria.</p>
          <p>Vet-inspected cold-chain poultry &amp; table egg distribution.</p>
        </div>
      </div>
    </footer>
  );
}
