import { TabContent } from "./tab";

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice: number;
  images: string[];
  variants: Variant[];
  color: string;
  size: string;
  availableSizes: string[];
  sizes: string[];
  tabs: TabContent[];
  currency: currency;
}

export interface Variant {
  colorLabel: string;
  colorHEX: string;
  id: number;
  image: string;
}

export interface currency {
  label: string;
  symbol: string;
}

export { TabContent };
