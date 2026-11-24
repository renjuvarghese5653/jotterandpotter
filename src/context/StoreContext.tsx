import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import rawCatalog from '../data/catalog.json';
import {
  CartItem,
  CatalogData,
  CollectionPack,
  ComboPack,
  OrderRecord,
  PageName,
  ReviewItem,
  RouteState,
} from '../types/catalog';

const catalog = rawCatalog as CatalogData;

interface StoreContextValue {
  catalog: CatalogData;
  route: RouteState;
  navigate: (page: PageName, slug?: string) => void;
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>, openDrawer?: boolean) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  hasStarterKitInCart: boolean;
  addStarterKitToCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isPrintableOpen: boolean;
  setIsPrintableOpen: (open: boolean) => void;
  customReviews: Record<string, ReviewItem[]>;
  addReview: (collectionId: string, review: Omit<ReviewItem, 'id' | 'date'>) => void;
  getReviewsForCollection: (collection: CollectionPack) => ReviewItem[];
  lastOrder: OrderRecord | null;
  setLastOrder: (order: OrderRecord | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  getCollectionBySlug: (slug: string) => CollectionPack | undefined;
  getComboBySlug: (slug: string) => ComboPack | undefined;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_CART = 'jp_cart_v1';
const STORAGE_WISHLIST = 'jp_wishlist_v1';
const STORAGE_REVIEWS = 'jp_reviews_v1';

const SEO_MAP: Record<PageName, { title: string; description: string }> = {
  home: {
    title: 'Jotter & Potter – Hands-On Design Kits for Kids Aged 6–12',
    description:
      'Screen-free 12-month design missions for children aged 6–12, made in India. Imagine, design, build, and earn client-signed badges.',
  },
  shop: {
    title: 'Shop Monthly Packs & Combos – Jotter & Potter',
    description:
      'Browse all 12 Little Designer monthly craft folders, 3-month Explorer, 6-month Designer, and 12-month Master Designer Box.',
  },
  product: {
    title: 'Collection Details – Jotter & Potter',
    description:
      'Explore mission steps, client letter brief, 24 word-and-colouring cards, week-by-week plan, and safety guide.',
  },
  combos: {
    title: 'Compare Combo Boxes – Explorer, Designer & Master | Jotter & Potter',
    description:
      'Compare the 3-month Explorer, 6-month Designer, and 12-month Master Designer Box with free Starter Kit and gift wrapping.',
  },
  'how-it-works': {
    title: 'How It Works for Parents – Jotter & Potter',
    description:
      'See the 4-week rhythm, Colour-Match-Build learning method, optional Monday WhatsApp prompts, and safety guidance.',
  },
  checkout: {
    title: 'Cart & Checkout – Jotter & Potter',
    description:
      'Complete your Jotter & Potter order with delivery across India, custom gift tag message, Razorpay, or Cash on Delivery.',
  },
  about: {
    title: 'About Us – Made in India Craft Learning | Jotter & Potter',
    description:
      'Discover why Jotter & Potter designs screen-free, culturally rooted creative kits celebrating Indian homes and heritage crafts.',
  },
  resources: {
    title: 'Free Printables & Parent Guides – Jotter & Potter',
    description:
      'Download our free Meet the Architect activity sheet and read screen-free parenting guides for curious kids aged 6–12.',
  },
  contact: {
    title: 'Contact & FAQ – Jotter & Potter',
    description:
      'Questions on shipping across India, age suitability, returns, or combo gifts? Reach our Bengaluru studio or read FAQs.',
  },
};

function parseHashRoute(): RouteState {
  if (typeof window === 'undefined') return { page: 'home' };
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!hash) return { page: 'home' };
  const [segment, slug] = hash.split('/');
  const validPages: PageName[] = [
    'home',
    'shop',
    'product',
    'combos',
    'how-it-works',
    'checkout',
    'about',
    'resources',
    'contact',
  ];
  if (validPages.includes(segment as PageName)) {
    return { page: segment as PageName, slug };
  }
  return { page: 'home' };
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(() => parseHashRoute());
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [customReviews, setCustomReviews] = useState<Record<string, ReviewItem[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_REVIEWS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isPrintableOpen, setIsPrintableOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
    } catch {
      // ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WISHLIST, JSON.stringify(wishlist));
    } catch {
      // ignore storage quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_REVIEWS, JSON.stringify(customReviews));
    } catch {
      // ignore storage quota errors
    }
  }, [customReviews]);

  useEffect(() => {
    let title = SEO_MAP[route.page].title;
    let description = SEO_MAP[route.page].description;

    if (route.page === 'product' && route.slug) {
      const col = catalog.collections.find((c) => c.slug === route.slug);
      if (col) {
        title = `Month ${col.monthCode}: ${col.title} – Jotter & Potter`;
        description = `${col.tagline}. ${col.missionGoal}`;
      }
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
  }, [route]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const t = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(t);
  }, [toastMessage]);

  const navigate = (page: PageName, slug?: string) => {
    const targetHash = page === 'home' ? '#/' : slug ? `#/${page}/${slug}` : `#/${page}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setRoute({ page, slug });
    setIsCartOpen(false);
    setIsSearchOpen(false);
    setIsWishlistOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>, openDrawer = true) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.productId === item.productId);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + 1,
          giftMessage: item.giftMessage ?? next[idx].giftMessage,
        };
        return next;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    if (openDrawer) {
      setIsCartOpen(true);
    } else {
      showToast(`Added "${item.title}" to your bag`);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const hasStarterKitInCart = useMemo(() => {
    return cart.some(
      (item) => item.productId === catalog.starterKit.id || item.kind === 'combo'
    );
  }, [cart]);

  const addStarterKitToCart = () => {
    addToCart(
      {
        productId: catalog.starterKit.id,
        slug: catalog.starterKit.slug,
        kind: 'starter',
        title: catalog.starterKit.name,
        subtitle: 'Safety scissors, pencils, wooden ruler, glue & binder strap',
        accentHex: '#9B7149',
        priceInr: catalog.starterKit.priceInr,
        pricePlaceholder: catalog.starterKit.pricePlaceholder,
      },
      true
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from saved list' : 'Saved to wishlist');
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const addReview = (collectionId: string, review: Omit<ReviewItem, 'id' | 'date'>) => {
    const newItem: ReviewItem = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'November 2026',
    };
    setCustomReviews((prev) => ({
      ...prev,
      [collectionId]: [newItem, ...(prev[collectionId] ?? [])],
    }));
    showToast('Thank you for sharing your review!');
  };

  const getReviewsForCollection = (collection: CollectionPack): ReviewItem[] => {
    return [...(customReviews[collection.id] ?? []), ...collection.reviews];
  };

  const getCollectionBySlug = (slug: string) =>
    catalog.collections.find((c) => c.slug === slug);

  const getComboBySlug = (slug: string) => catalog.combos.find((c) => c.slug === slug);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  return (
    <StoreContext.Provider
      value={{
        catalog,
        route,
        navigate,
        cart,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        hasStarterKitInCart,
        addStarterKitToCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isPrintableOpen,
        setIsPrintableOpen,
        customReviews,
        addReview,
        getReviewsForCollection,
        lastOrder,
        setLastOrder,
        toastMessage,
        showToast,
        getCollectionBySlug,
        getComboBySlug,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
