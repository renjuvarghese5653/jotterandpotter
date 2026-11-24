export type AgeFocus = '6-8' | '9-12' | '6-12';

export interface CardPair {
  id: number;
  word: string;
  concept: string;
}

export interface WeekPlan {
  week: number;
  title: string;
  cardPairs: string;
  missionSteps: string;
  summary: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  childAge: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CollectionPack {
  id: string;
  month: number;
  monthCode: string;
  slug: string;
  title: string;
  shortTitle: string;
  colourName: string;
  heroHex: string;
  heroLightHex: string;
  heroTextOnColor: '#FFFFFF' | '#2B231D';
  motif:
    | 'architect'
    | 'interior'
    | 'landscape'
    | 'urban'
    | 'product'
    | 'engineer'
    | 'graphic'
    | 'fashion'
    | 'eco'
    | 'folk'
    | 'storyteller'
    | 'dreamtown';
  tagline: string;
  missionGoal: string;
  clientRole: string;
  clientLetterTeaser: string;
  ageGroup: AgeFocus;
  skillFocus: string;
  priceInr: number | null;
  pricePlaceholder: string;
  imageUrl?: string;
  monthlyToolItem: string;
  qrVideoTitle: string;
  qrVideoDuration: string;
  safetyNote: string;
  materialsNeeded: string[];
  skillsDeveloped: string[];
  missionSteps: string[];
  cardPairs: CardPair[];
  weeklyPlan: WeekPlan[];
  rating: number;
  reviewCount: number;
  reviews: ReviewItem[];
}

export interface ComboPack {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  monthsLabel: string;
  monthsIncluded: number[];
  shippingRhythm: string;
  includesStarterKit: boolean;
  hasGiftBox: boolean;
  hasMasterCertificate: boolean;
  ageGroup: AgeFocus;
  priceInr: number | null;
  pricePlaceholder: string;
  savingsNote: string;
  description: string;
  highlights: string[];
  rating: number;
  reviewCount: number;
}

export interface StarterKit {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  ageGroup: AgeFocus;
  priceInr: number | null;
  pricePlaceholder: string;
  description: string;
  contents: string[];
  rating: number;
  reviewCount: number;
}

export interface Testimonial {
  id: string;
  parentName: string;
  role: string;
  city: string;
  childInfo: string;
  monthCompleted: string;
  quote: string;
}

export interface FaqItem {
  id: string;
  category: 'Shipping' | 'Returns' | 'Age & Safety' | 'Packs & Combos';
  question: string;
  answer: string;
}

export interface ResourceItem {
  id: string;
  slug: string;
  type: 'Printable Sheet' | 'Parent Guide';
  title: string;
  readTimeOrPages: string;
  summary: string;
  imageUrl?: string;
  isFeaturedPrintable?: boolean;
  content: string[];
}

export interface CatalogData {
  brand: {
    name: string;
    seriesName: string;
    tagline: string;
    currency: string;
    currencySymbol: string;
    whatsappNumber: string;
    supportEmail: string;
  };
  images: {
    heroFolder: string;
    packContents: string;
    comboBoxes: string;
    familyCraft: string;
    meetArchitectSheet: string;
  };
  packStandardContents: {
    title: string;
    detail: string;
  }[];
  starterKit: StarterKit;
  collections: CollectionPack[];
  combos: ComboPack[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  resources: ResourceItem[];
}

export type PageName =
  | 'home'
  | 'shop'
  | 'product'
  | 'combos'
  | 'how-it-works'
  | 'checkout'
  | 'about'
  | 'resources'
  | 'contact';

export interface RouteState {
  page: PageName;
  slug?: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  kind: 'collection' | 'combo' | 'starter';
  title: string;
  subtitle: string;
  accentHex: string;
  priceInr: number | null;
  pricePlaceholder: string;
  quantity: number;
  giftMessage?: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'Razorpay' | 'Cash on Delivery';
  giftTagMessage?: string;
  items: CartItem[];
  totalFormatted: string;
}
