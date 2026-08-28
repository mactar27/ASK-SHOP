import { create } from 'zustand';

export interface Category {
  id: string;
  name: string;
  count: number;
  status: 'Actif' | 'Inactif';
}

export interface Coupon {
  id: string;
  code: string;
  type: 'Pourcentage' | 'Montant fixe' | 'Frais de port';
  value: string;
  limit: number;
  used: number;
  status: 'Actif' | 'Expiré';
}

export interface ShippingZone {
  id: string;
  zone: string;
  price: number;
  estimatedTime: string;
  status: 'Actif' | 'Inactif';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  variants: string[];
}

export interface Order {
  id: string;
  client: string;
  email: string;
  phone: string;
  date: string;
  amount: number;
  items: number;
  status: string;
  color: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
}

export interface Settings {
  id: string;
  shopName: string;
  slogan: string;
  email: string;
  phone: string;
  address: string;
  instagram: string;
  tiktok: string;
}

interface AdminState {
  categories: Category[];
  coupons: Coupon[];
  shippingZones: ShippingZone[];
  products: Product[];
  orders: Order[];
  customers: Customer[];
  settings: Settings | null;
  isLoading: boolean;
  
  // Init
  fetchData: () => Promise<void>;

  // Actions
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  addCoupon: (coupon: Omit<Coupon, 'id'>) => Promise<void>;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => Promise<void>;
  deleteCoupon: (id: string) => Promise<void>;

  addShippingZone: (zone: Omit<ShippingZone, 'id'>) => Promise<void>;
  updateShippingZone: (id: string, zone: Partial<ShippingZone>) => Promise<void>;
  deleteShippingZone: (id: string) => Promise<void>;

  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  addOrder: (order: Omit<Order, 'id'>) => Promise<void>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;

  addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;

  updateSettings: (settings: Partial<Settings>) => Promise<void>;
}

const API_URL = 'http://localhost:3000/api';

export const useAdminStore = create<AdminState>()((set, get) => ({
  categories: [],
  coupons: [],
  shippingZones: [],
  products: [],
  orders: [],
  customers: [],
  settings: null,
  isLoading: false,

  fetchData: async () => {
    set({ isLoading: true });
    try {
      const [catRes, coupRes, shipRes, prodRes, ordRes, custRes, setRes] = await Promise.all([
        fetch(`${API_URL}/categories`),
        fetch(`${API_URL}/coupons`),
        fetch(`${API_URL}/shipping-zones`),
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/orders`),
        fetch(`${API_URL}/customers`),
        fetch(`${API_URL}/settings`)
      ]);
      const categories = await catRes.json();
      const coupons = await coupRes.json();
      const shippingZones = await shipRes.json();
      const products = await prodRes.json();
      const orders = await ordRes.json();
      const customers = await custRes.json();
      const settings = await setRes.json();
      set({ categories, coupons, shippingZones, products, orders, customers, settings, isLoading: false });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      set({ isLoading: false });
    }
  },

  addCategory: async (category) => {
    const newCategory = { ...category, id: Math.random().toString(36).substr(2, 9) };
    await fetch(`${API_URL}/categories`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCategory) });
    set((state) => ({ categories: [...state.categories, newCategory] }));
  },
  updateCategory: async (id, category) => {
    await fetch(`${API_URL}/categories/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(category) });
    set((state) => ({ categories: state.categories.map((c) => (c.id === id ? { ...c, ...category } : c)) }));
  },
  deleteCategory: async (id) => {
    await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
    set((state) => ({ categories: state.categories.filter((c) => c.id !== id) }));
  },

  addCoupon: async (coupon) => {
    const newCoupon = { ...coupon, id: Math.random().toString(36).substr(2, 9) };
    await fetch(`${API_URL}/coupons`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCoupon) });
    set((state) => ({ coupons: [...state.coupons, newCoupon] }));
  },
  updateCoupon: async (id, coupon) => {
    await fetch(`${API_URL}/coupons/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(coupon) });
    set((state) => ({ coupons: state.coupons.map((c) => (c.id === id ? { ...c, ...coupon } : c)) }));
  },
  deleteCoupon: async (id) => {
    await fetch(`${API_URL}/coupons/${id}`, { method: 'DELETE' });
    set((state) => ({ coupons: state.coupons.filter((c) => c.id !== id) }));
  },

  addShippingZone: async (zone) => {
    const newZone = { ...zone, id: Math.random().toString(36).substr(2, 9) };
    await fetch(`${API_URL}/shipping-zones`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newZone) });
    set((state) => ({ shippingZones: [...state.shippingZones, newZone] }));
  },
  updateShippingZone: async (id, zone) => {
    await fetch(`${API_URL}/shipping-zones/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(zone) });
    set((state) => ({ shippingZones: state.shippingZones.map((z) => (z.id === id ? { ...z, ...zone } : z)) }));
  },
  deleteShippingZone: async (id) => {
    await fetch(`${API_URL}/shipping-zones/${id}`, { method: 'DELETE' });
    set((state) => ({ shippingZones: state.shippingZones.filter((z) => z.id !== id) }));
  },

  addProduct: async (product) => {
    const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
    await fetch(`${API_URL}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProduct) });
    set((state) => ({ products: [...state.products, newProduct] }));
  },
  updateProduct: async (id, product) => {
    await fetch(`${API_URL}/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
    set((state) => ({ products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p)) }));
  },
  deleteProduct: async (id) => {
    await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
    set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
  },

  addOrder: async (order) => {
    // Usually DB assigns ID, but we mock it here if needed
    await fetch(`${API_URL}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
    set((state) => ({ orders: [...state.orders, order as Order] }));
  },
  updateOrder: async (id, order) => {
    await fetch(`${API_URL}/orders/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
    set((state) => ({ orders: state.orders.map((o) => (o.id === id ? { ...o, ...order } : o)) }));
  },
  deleteOrder: async (id) => {
    await fetch(`${API_URL}/orders/${id}`, { method: 'DELETE' });
    set((state) => ({ orders: state.orders.filter((o) => o.id !== id) }));
  },

  addCustomer: async (customer) => {
    await fetch(`${API_URL}/customers`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(customer) });
    set((state) => ({ customers: [...state.customers, customer as Customer] }));
  },
  deleteCustomer: async (id) => {
    await fetch(`${API_URL}/customers/${id}`, { method: 'DELETE' });
    set((state) => ({ customers: state.customers.filter((c) => c.id !== id) }));
  },

  updateSettings: async (settings) => {
    await fetch(`${API_URL}/settings`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
    set((state) => ({ settings: { ...state.settings!, ...settings } }));
  }
}));
