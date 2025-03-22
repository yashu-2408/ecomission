
export type WasteCategory = 'e-waste' | 'metal' | 'plastic' | 'paper' | 'glass' | 'organic';

export interface WasteType {
  id: WasteCategory;
  name: string;
  description: string;
  points: number;
  marketValue: string;
  icon: string;
}

export const wasteCategories: WasteType[] = [
  {
    id: 'e-waste',
    name: 'E-Waste',
    description: 'Mobile phones, laptops, batteries, wires',
    points: 30,
    marketValue: '₹50-₹300 per kg',
    icon: 'Cpu',
  },
  {
    id: 'metal',
    name: 'Metal',
    description: 'Aluminum, copper, steel, iron',
    points: 25,
    marketValue: '₹40-₹100 per kg',
    icon: 'Cog',
  },
  {
    id: 'plastic',
    name: 'Plastic',
    description: 'PET bottles, HDPE, LDPE',
    points: 15,
    marketValue: '₹20-₹50 per kg',
    icon: 'Trash2',
  },
  {
    id: 'paper',
    name: 'Paper',
    description: 'Newspapers, books, cardboard',
    points: 10,
    marketValue: '₹10-₹25 per kg',
    icon: 'FileText',
  },
  {
    id: 'glass',
    name: 'Glass',
    description: 'Bottles, windows, mirrors',
    points: 8,
    marketValue: '₹5-₹15 per kg',
    icon: 'Wine',
  },
  {
    id: 'organic',
    name: 'Organic',
    description: 'Food and garden waste',
    points: 5,
    marketValue: '₹2-₹5 per kg',
    icon: 'Apple',
  },
];

export const getWasteCategory = (id: WasteCategory): WasteType => {
  return wasteCategories.find(category => category.id === id) || wasteCategories[0];
};

export const calculateEcoPoints = (wasteType: WasteCategory, quantity: number): number => {
  const category = getWasteCategory(wasteType);
  return category.points * quantity;
};
