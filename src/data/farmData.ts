export type ProductCategory =
  | 'all'
  | 'dressed'
  | 'live'
  | 'cuts'
  | 'guinea-fowl'
  | 'marinades'
  | 'eggs';

export interface ProductVariant {
  id: string;
  name: string;
  spec: string;
  priceNgn: number;
  unitLabel: string;
}

export interface ProductGroup {
  id: string;
  category: Exclude<ProductCategory, 'all'>;
  extraCategories?: Exclude<ProductCategory, 'all'>[];
  featuredWide?: boolean;
  kicker: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  variants: ProductVariant[];
}

export const MARINADE_CUT_OPTIONS = [
  'Mixed Grill Cuts',
  'Drumsticks',
  'Chicken Wings',
  'Boneless Breast',
] as const;

export type MarinadeCutOption = (typeof MARINADE_CUT_OPTIONS)[number];

export interface DeliveryZone {
  id: string;
  name: string;
  axis: string;
  feeNgn: number;
  eta: string;
}

export interface FarmStandard {
  index: string;
  title: string;
  summary: string;
  detail: string;
}

export const FARM_CONTACT = {
  brandName: 'Yola Harvest',
  fullBrandName: 'Yola Harvest Poultry',
  whatsappNumber: '2348035550194',
  displayPhone: '+234 803 555 0194',
  secondaryPhone: '+234 809 442 0180',
  email: 'orders@yolaharvest.ng',
  address: 'Km 12, Numan–Yola Road, Bajabure Axis, Yola, Adamawa State',
  hoursRetail: 'Mon – Sat: 7:00 AM – 6:30 PM',
  hoursSunday: 'Sun: Pre-ordered Wholesale Dispatch Only',
  freeDeliveryThresholdNgn: 50000,
};

export const HERO_MEDIA = {
  src: '/src/assets/images/hero_yola_poultry_farm_1795520061583.jpg',
  alt: 'Yola Harvest Poultry modern ventilated poultry houses in Yola, Adamawa State at morning light',
};

export const STANDARDS_MEDIA = {
  src: '/src/assets/images/standards_cold_chain_1795520064892.jpg',
  alt: 'Workers in hygienic coats and food-safe gloves inspecting vacuum-sealed poultry inside Yola Harvest cold-chain facility',
};

export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    id: 'whole-dressed-broiler',
    category: 'dressed',
    kicker: 'Chilled Vacuum Pack · Hormone-Free',
    title: 'Whole Dressed Broiler Chicken',
    description:
      'Cleanly plucked, eviscerated with filtered water, and chilled below 4°C before dispatch. Ready for the pot or freezer.',
    image: '/src/assets/images/product_dressed_broiler_1795520061315.jpg',
    imageAlt: 'Fresh hygienically dressed whole broiler chicken on clean stone surface',
    variants: [
      {
        id: 'dressed-medium',
        name: 'Medium Dressed Bird',
        spec: '1.5 – 1.8 kg',
        priceNgn: 6800,
        unitLabel: 'bird',
      },
      {
        id: 'dressed-large',
        name: 'Large Dressed Bird',
        spec: '2.0 – 2.4 kg',
        priceNgn: 8500,
        unitLabel: 'bird',
      },
      {
        id: 'dressed-jumbo',
        name: 'Jumbo Dressed Bird',
        spec: '2.5 kg+',
        priceNgn: 10200,
        unitLabel: 'bird',
      },
    ],
  },
  {
    id: 'live-broiler-birds',
    category: 'live',
    kicker: 'Events & Festive Orders · Farm Gate',
    title: 'Live Broiler Birds',
    description:
      'Active, plump, vet-cleared live broilers raised on natural maize-soy feed for weddings, Sallah, Christmas, and family celebrations.',
    image: '/src/assets/images/product_live_broilers_1795520062655.jpg',
    imageAlt: 'Healthy white broiler chickens inside clean ventilated Yola poultry house',
    variants: [
      {
        id: 'live-standard',
        name: 'Standard Live Broiler',
        spec: '2.0 – 2.4 kg live weight',
        priceNgn: 8000,
        unitLabel: 'bird',
      },
      {
        id: 'live-festive',
        name: 'Heavy Festive Broiler',
        spec: '2.6 kg+ live weight',
        priceNgn: 9800,
        unitLabel: 'bird',
      },
    ],
  },
  {
    id: 'hygienic-cut-parts',
    category: 'cuts',
    kicker: 'Portioned 1kg Packs · Kitchen & Grill Ready',
    title: 'Fresh Cut Parts',
    description:
      'Precision-cut portions packed in food-grade sealed trays for homes, shawarma stands, suya spots, and restaurant kitchens.',
    image: '/src/assets/images/product_chicken_cuts_1795520063147.jpg',
    imageAlt: 'Portioned fresh raw chicken breast, wings, drumsticks, and cleaned gizzards',
    variants: [
      {
        id: 'cut-breast',
        name: 'Skinless Chicken Breast',
        spec: '1 kg pack · Boneless option',
        priceNgn: 5800,
        unitLabel: 'pack',
      },
      {
        id: 'cut-wings',
        name: 'Fresh Chicken Wings',
        spec: '1 kg pack · Grill & suya cut',
        priceNgn: 4900,
        unitLabel: 'pack',
      },
      {
        id: 'cut-drumsticks',
        name: 'Meaty Drumsticks',
        spec: '1 kg pack · Trimmed',
        priceNgn: 5200,
        unitLabel: 'pack',
      },
      {
        id: 'cut-gizzards',
        name: 'Cleaned Chicken Gizzards',
        spec: '1 kg pack · Peeled & washed',
        priceNgn: 4600,
        unitLabel: 'pack',
      },
    ],
  },
  {
    id: 'farm-fresh-eggs',
    category: 'eggs',
    kicker: 'Daily Lay · 30-Egg Fiber Crates',
    title: 'Farm Fresh Table Eggs',
    description:
      'Thick-shelled brown table eggs gathered every morning, graded for size, and cushioned in clean 30-egg pulp trays.',
    image: '/src/assets/images/product_fresh_eggs_1795520065923.jpg',
    imageAlt: 'Farm-fresh brown table eggs packed in a 30-egg fiber crate',
    variants: [
      {
        id: 'eggs-large',
        name: 'Large Table Eggs',
        spec: '1 Crate (30 eggs)',
        priceNgn: 5200,
        unitLabel: 'crate',
      },
      {
        id: 'eggs-jumbo',
        name: 'Jumbo Table Eggs',
        spec: '1 Crate (30 eggs)',
        priceNgn: 5800,
        unitLabel: 'crate',
      },
      {
        id: 'eggs-bulk-6',
        name: 'Family & Cafe Pack',
        spec: '6 Crates (180 eggs)',
        priceNgn: 30600,
        unitLabel: 'bundle',
      },
    ],
  },
  {
    id: 'guinea-fowl-birds',
    category: 'guinea-fowl',
    kicker: 'Dressed & Live · Yola Raised',
    title: 'Guinea Fowl Birds',
    description:
      'Lean, flavorful helmeted guinea fowl raised in our ventilated Yola houses—available hygienically dressed or live for pepper soup, grills, and special occasions.',
    image: '/src/assets/images/product_guinea_fowl_1795521210130.jpg',
    imageAlt: 'Healthy speckled pearl-grey helmeted guinea fowl inside clean Yola poultry house',
    variants: [
      {
        id: 'guinea-dressed-standard',
        name: 'Dressed Guinea Fowl',
        spec: '1.2 – 1.5 kg · Cleaned & chilled',
        priceNgn: 9500,
        unitLabel: 'bird',
      },
      {
        id: 'guinea-live-standard',
        name: 'Live Guinea Fowl',
        spec: '1.3 – 1.6 kg · Farm gate / events',
        priceNgn: 8800,
        unitLabel: 'bird',
      },
      {
        id: 'guinea-dressed-jumbo',
        name: 'Jumbo Dressed Guinea Fowl',
        spec: '1.6 kg+ · Mature bird',
        priceNgn: 11200,
        unitLabel: 'bird',
      },
    ],
  },
  {
    id: 'guinea-fowl-eggs',
    category: 'guinea-fowl',
    extraCategories: ['eggs'],
    kicker: 'Rich Golden Yolk · Hard-Shelled',
    title: 'Guinea Fowl Eggs',
    description:
      'Nutrient-dense speckled guinea fowl eggs with thick protective shells and rich golden yolks—gathered fresh daily and packed in cushioned trays.',
    image: '/src/assets/images/product_guinea_fowl_eggs_1795521209402.jpg',
    imageAlt: 'Fresh speckled guinea fowl eggs neatly packed in a 30-egg pulp crate',
    variants: [
      {
        id: 'guinea-eggs-half',
        name: 'Half Crate Guinea Fowl Eggs',
        spec: '15 eggs · Speckled fresh lay',
        priceNgn: 3400,
        unitLabel: 'half crate',
      },
      {
        id: 'guinea-eggs-crate',
        name: 'Full Crate Guinea Fowl Eggs',
        spec: '1 Crate (30 eggs)',
        priceNgn: 6500,
        unitLabel: 'crate',
      },
      {
        id: 'guinea-eggs-bulk-3',
        name: 'Hospitality & Family Pack',
        spec: '3 Crates (90 eggs)',
        priceNgn: 18900,
        unitLabel: 'bundle',
      },
    ],
  },
  {
    id: 'marinated-chicken-packs',
    category: 'marinades',
    featuredWide: true,
    kicker: 'Vacuum-Marinated 1kg Packs · Oven, Grill & Air-Fryer Ready',
    title: 'Plain & Marinated Chicken Packs',
    description:
      'Choose unseasoned plain cuts or chef-marinated 1kg packs steeped in food-grade marinades for 12 hours in our cold room—ready straight for the grill, oven, or pan.',
    image: '/src/assets/images/product_marinated_chicken_1795520752363.jpg',
    imageAlt:
      'Four bowls of plain chicken, hot sauce chili marinated chicken, honey glazed wings, and creamy yoghurt-herb chicken',
    variants: [
      {
        id: 'marinade-plain',
        name: 'Plain Natural Chicken',
        spec: '1 kg · Unseasoned & trimmed',
        priceNgn: 5200,
        unitLabel: 'pack',
      },
      {
        id: 'marinade-hot-sauce',
        name: 'Hot Sauce Chicken Marinade',
        spec: '1 kg · Scotch bonnet, ginger & garlic',
        priceNgn: 5800,
        unitLabel: 'pack',
      },
      {
        id: 'marinade-honey',
        name: 'Honey Glaze Marinade',
        spec: '1 kg · Northern wild honey & thyme',
        priceNgn: 6000,
        unitLabel: 'pack',
      },
      {
        id: 'marinade-yoghurt',
        name: 'Yoghurt & Spice Marinade',
        spec: '1 kg · Cultured yoghurt, garlic & herbs',
        priceNgn: 5900,
        unitLabel: 'pack',
      },
      {
        id: 'marinade-suya-yaji',
        name: 'Yaji & Suya Marinade',
        spec: '1 kg · Roasted groundnut spice & paprika',
        priceNgn: 5800,
        unitLabel: 'pack',
      },
      {
        id: 'marinade-lemon-herb',
        name: 'Lemon, Garlic & Rosemary',
        spec: '1 kg · Citrus zest & crushed herbs',
        priceNgn: 5800,
        unitLabel: 'pack',
      },
    ],
  },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: 'jimeta', name: 'Jimeta (Main Town & Market Axis)', axis: 'Jimeta', feeNgn: 1000, eta: 'Same-day · 2–4 hrs' },
  { id: 'karewa', name: 'Karewa / GRA', axis: 'Jimeta', feeNgn: 1000, eta: 'Same-day · 2–4 hrs' },
  { id: 'bekaji', name: 'Bekaji Estate', axis: 'Jimeta', feeNgn: 1000, eta: 'Same-day · 2–4 hrs' },
  { id: 'doubeli', name: 'Doubeli', axis: 'Jimeta', feeNgn: 1200, eta: 'Same-day · 2–4 hrs' },
  { id: 'damilu', name: 'Damilu / Jambutu', axis: 'Jimeta North', feeNgn: 1200, eta: 'Same-day · 2–4 hrs' },
  { id: 'nassarawo', name: 'Nassarawo / Bachure', axis: 'Jimeta West', feeNgn: 1200, eta: 'Same-day · 3–5 hrs' },
  { id: 'yola-town', name: 'Yola Town (Lamido Palace & Environs)', axis: 'Yola Town', feeNgn: 1500, eta: 'Same-day · 3–5 hrs' },
  { id: 'bajabure', name: 'Bajabure / Modibbo Adama Axis', axis: 'Yola-Numan Rd', feeNgn: 1000, eta: 'Same-day · 1–3 hrs' },
  { id: 'sangere', name: 'Sangere / Girei Road', axis: 'Girei Axis', feeNgn: 1500, eta: 'Same-day · 3–5 hrs' },
  { id: 'pickup', name: 'Farm Gate Pickup (Bajabure Axis)', axis: 'On-Farm Cold Room', feeNgn: 0, eta: 'Ready in 45 mins' },
];

export const FARM_STANDARDS: FarmStandard[] = [
  {
    index: '01',
    title: 'Locally Raised in Yola',
    summary: 'Adapted breeds raised on clean Adamawa grain',
    detail:
      'Every broiler and layer flock is raised right here along the Bajabure–Yola axis on tested maize, soybean, and mineral rations—never growth hormones or residual antibiotics.',
  },
  {
    index: '02',
    title: 'Strict Vet-Supervised Biosecurity',
    summary: 'Daily veterinary oversight & controlled access',
    detail:
      'Restricted perimeter entry, mandatory disinfectant footbaths, all-in/all-out housing cycles, and scheduled checks by licensed Adamawa State veterinary officers.',
  },
  {
    index: '03',
    title: 'Hygienic Cold-Chain Processing',
    summary: 'Stainless-steel line & rapid 2°C–4°C chilling',
    detail:
      'Birds are processed in a tiled, food-grade abattoir using potable borehole water, stainless-steel evisceration tables, and sealed packs chilled immediately to preserve tenderness.',
  },
  {
    index: '04',
    title: 'Reliable Scheduled Delivery',
    summary: 'Insulated dispatch across Jimeta & Yola Town',
    detail:
      'Morning, afternoon, and evening dispatch waves deliver dressed poultry in ice-lined coolers and shock-protected egg crates straight to homes, hotels, and kitchens.',
  },
];

export const HERO_METRICS = [
  { value: 'Same-Day', label: 'Dispatch across Jimeta & Yola Town' },
  { value: '100%', label: 'Hormone-free maize & soy rations' },
  { value: '2°C – 4°C', label: 'Chilled cold-chain processing' },
  { value: '₦50,000+', label: 'Free household delivery threshold' },
];

export const DELIVERY_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const BUSINESS_TYPES = [
  'Hotel / Guest House',
  'Restaurant / Eatery',
  'Shawarma & Suya Vendor',
  'Event Planner / Caterer',
  'Supermarket / Provision Store',
] as const;

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${FARM_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
