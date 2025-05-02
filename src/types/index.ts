// User related types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'operator';
  createdAt: string;
}

// Area related types
export interface Area {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  size: number; // in hectares
  plantingDate: string;
  treeCount: number;
  pineType: string;
  notes?: string;
  status: 'plantio' | 'crescimento' | 'extracao' | 'colheita';
  createdAt: string;
}

// Extraction related types
export interface Extraction {
  id: string;
  areaId: string;
  date: string;
  quantity: number;
  team: string;
  notes?: string;
  attachment?: string;
  createdAt: string;
}

// Financial related types
export interface Expense {
  id: string;
  userId: string;
  areaId?: string;
  type: string;
  amount: number;
  date: string;
  description: string;
  attachment?: string;
  createdAt: string;
}

export interface Sale {
  id: string;
  userId: string;
  product: string;
  quantity: number;
  amount: number;
  date: string;
  client: string;
  attachment?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  unit: 'kg' | 'liter';
  basePrice: number;
}

export interface Category {
  id: string;
  name: string;
  type: 'expense' | 'sale';
}

export interface AreaMarker {
  id: string;
  name: string;
  position: [number, number];
  size: number;
  status: string;
  treeCount?: number;
  pineType?: string;
  plantingDate?: string;
  productivity?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DashboardStats {
  totalAreas: number;
  totalTrees: number;
  totalExtraction: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
}

// Report related types
export interface FinancialReport {
  period: string;
  expenses: number;
  sales: number;
  profit: number;
}

export interface ProductivityReport {
  areaId: string;
  areaName: string;
  extractionQuantity: number;
  hectares: number;
  productivity: number; // kg/hectare
}
