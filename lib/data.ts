import type { Category, Color, Product, Size } from "@/types";

export const categories: Category[] = [
  { id: "cat-men", name: "Hombre", slug: "hombre" },
  { id: "cat-women", name: "Mujer", slug: "mujer" },
  { id: "cat-boys", name: "Niño", slug: "nino" },
  { id: "cat-girls", name: "Niña", slug: "nina" }
];

export const colors: Color[] = [
  { id: "black", name: "Negro", hex: "#111111" },
  { id: "white", name: "Blanco", hex: "#f4f4f1" },
  { id: "blue", name: "Azul", hex: "#274c77" },
  { id: "beige", name: "Beige", hex: "#c9b79c" },
  { id: "red", name: "Rojo", hex: "#9b2c2c" },
  { id: "pink", name: "Rosa", hex: "#d8a0aa" }
];

export const sizes: Size[] = [36,37,38,39,40,41,42,43,44,45].map((n) => ({
  id: String(n),
  label: String(n)
}));

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

const baseImages = [
  img("photo-1542291026-7eec264c27ff"),
  img("photo-1551488831-00ddcb6c6bd3"),
  img("photo-1543508282-6319a3e2621f")
];

const makeVariants = (colorIds: string[], sizeIds = sizes.map((s) => s.id)) =>
  colorIds.flatMap((colorId, ci) =>
    sizeIds.map((sizeId, si) => ({
      id: `${colorId}-${sizeId}`,
      colorId,
      sizeId,
      stock: (ci + si) % 5 === 0 ? 0 : 2 + ((ci * 3 + si) % 7)
    }))
  );

export const products: Product[] = [
  {
    id: "p-001",
    sku: "LUM-MX-001",
    slug: "metro-runner",
    name: "Metro Runner",
    brand: "Lúmina",
    category: "hombre",
    subcategory: "Tenis",
    price: 299900,
    previousPrice: 359900,
    description: "Tenis urbanos de perfil limpio, pensados para jornadas largas y un estilo contemporáneo.",
    material: "Malla técnica y caucho",
    status: "active",
    rating: 4.8,
    reviewCount: 124,
    images: baseImages,
    colorIds: ["black", "white", "blue"],
    sizeIds: sizes.map((s) => s.id),
    variants: makeVariants(["black", "white", "blue"]),
    featured: true,
    isNew: true,
    soldCount: 890,
    tags: ["urbano", "running", "premium"],
    reviews: [
      { id: "r1", author: "Daniel M.", rating: 5, title: "Muy cómodos", body: "Se sienten ligeros y la talla coincide perfectamente.", date: "2026-07-18" },
      { id: "r2", author: "Carlos R.", rating: 5, title: "Excelente acabado", body: "El material se ve premium y combinan con todo.", date: "2026-07-10" }
    ]
  },
  {
    id: "p-002",
    sku: "LUM-CT-002",
    slug: "costa-casual",
    name: "Costa Casual",
    brand: "Lúmina",
    category: "hombre",
    subcategory: "Zapatos casuales",
    price: 239900,
    previousPrice: 289900,
    description: "Silueta casual con acabado minimalista para oficina, viajes y fines de semana.",
    material: "Cuero vegano y goma",
    status: "active",
    rating: 4.6,
    reviewCount: 78,
    images: [img("photo-1549298916-b41d501d3772"), img("photo-1495555961986-6d4c1ecb7be3")],
    colorIds: ["beige", "black"],
    sizeIds: ["38","39","40","41","42","43","44"],
    variants: makeVariants(["beige", "black"], ["38","39","40","41","42","43","44"]),
    featured: true,
    soldCount: 540,
    tags: ["casual", "oficina"]
  },
  {
    id: "p-003",
    sku: "LUM-WA-003",
    slug: "atelier-sling",
    name: "Atelier Sling",
    brand: "Lúmina",
    category: "mujer",
    subcategory: "Tacones",
    price: 319900,
    previousPrice: 399900,
    description: "Tacón elegante con líneas refinadas y plantilla acolchada para mayor comodidad.",
    material: "Microfibra premium y cuero vegano",
    status: "active",
    rating: 4.9,
    reviewCount: 96,
    images: [img("photo-1543163521-1bf539c55dd2"), img("photo-1515347619252-60a4bf4fff4f")],
    colorIds: ["black", "red"],
    sizeIds: ["36","37","38","39","40"],
    variants: makeVariants(["black", "red"], ["36","37","38","39","40"]),
    featured: true,
    isNew: true,
    soldCount: 670,
    tags: ["elegante", "fiesta"]
  },
  {
    id: "p-004",
    sku: "LUM-WR-004",
    slug: "aura-sandal",
    name: "Aura Sandal",
    brand: "Lúmina",
    category: "mujer",
    subcategory: "Sandalias",
    price: 189900,
    description: "Sandalia ligera con diseño limpio y acabado mate.",
    material: "Sintético premium",
    status: "active",
    rating: 4.7,
    reviewCount: 51,
    images: [img("photo-1603487742131-4160ec999306"), img("photo-1562273138-f46be4ebdf33")],
    colorIds: ["beige", "pink", "white"],
    sizeIds: ["36","37","38","39","40"],
    variants: makeVariants(["beige","pink","white"], ["36","37","38","39","40"]),
    isNew: true,
    soldCount: 330,
    tags: ["verano", "ligero"]
  },
  {
    id: "p-005",
    sku: "LUM-KB-005",
    slug: "mini-track",
    name: "Mini Track",
    brand: "Lúmina Kids",
    category: "nina",
    subcategory: "Tenis",
    price: 159900,
    previousPrice: 199900,
    description: "Tenis resistentes y fáciles de combinar para el día a día de los pequeños.",
    material: "Malla reforzada y goma",
    status: "active",
    rating: 4.8,
    reviewCount: 42,
    images: [img("photo-1551107696-a4b0c5a0d9a2"), img("photo-1525966222134-fcfa99b8ae77")],
    colorIds: ["blue", "black"],
    sizeIds: ["28","29","30","31","32","33","34"],
    variants: makeVariants(["blue","black"], ["28","29","30","31","32","33","34"]),
    featured: true,
    soldCount: 410,
    tags: ["kids", "cole"]
  },
  {
    id: "p-006",
    sku: "LUM-KG-006",
    slug: "mini-star",
    name: "Mini Star",
    brand: "Lúmina Kids",
    category: "nino",
    subcategory: "Tenis",
    price: 149900,
    description: "Tenis suaves y cómodos con un detalle divertido y moderno.",
    material: "Textil y goma",
    status: "active",
    rating: 4.7,
    reviewCount: 37,
    images: [img("photo-1514989940723-e8e51635b782"), img("photo-1518002171953-a080ee817e1f")],
    colorIds: ["pink", "white"],
    sizeIds: ["28","29","30","31","32","33","34"],
    variants: makeVariants(["pink","white"], ["28","29","30","31","32","33","34"]),
    isNew: true,
    soldCount: 290,
    tags: ["kids", "casual"]
  }
];

export const subcategories: Record<string, string[]> = {
  hombre: ["Tenis", "Zapatos casuales", "Zapatos deportivos", "Botas", "Sandalias", "Mocasines"],
  mujer: ["Tenis", "Tacones", "Sandalias", "Botines", "Botas", "Zapatos casuales"],
  nino: ["Tenis", "Zapatos escolares", "Sandalias", "Botas"],
  nina: ["Tenis", "Zapatos escolares", "Sandalias", "Botas", "Zapatos casuales"]
};
