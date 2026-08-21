"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { colors, sizes } from "@/lib/data";
import { discountPercent, formatCOP } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/product-card";

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [colorId, setColorId] = useState(product.colorIds[0]);
  const [sizeId, setSizeId] = useState(product.sizeIds[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isFavorite, toggleFavorite } = useStore();

  const variant = useMemo(() => product.variants.find((v) => v.colorId === colorId && v.sizeId === sizeId), [product, colorId, sizeId]);
  const discount = discountPercent(product.price, product.previousPrice);
  const selectedColor = colors.find((c) => c.id === colorId);
  const reviews = product.reviews ?? [];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div className="grid gap-3 md:grid-cols-[90px_1fr]">
          <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:grid md:auto-rows-max">
            {product.images.map((image, i) => <button key={image} onClick={() => setActiveImage(i)} className={`relative aspect-square overflow-hidden rounded-xl ${i === activeImage ? "ring-2 ring-black" : ""}`}><Image src={image} alt={`${product.name} ${i+1}`} fill sizes="90px" className="object-cover" /></button>)}
          </div>
          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100 md:order-2">
            <Image src={product.images[activeImage]} alt={product.name} fill priority sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">{product.brand} · {product.subcategory}</p><h1 className="mt-2 text-4xl font-black">{product.name}</h1></div>
            <button onClick={() => toggleFavorite(product.id)} aria-label="Favorito"><Heart fill={isFavorite(product.id) ? "currentColor" : "none"} /></button>
          </div>
          <div className="mt-5 flex items-center gap-3"><div className="flex items-center gap-1 text-sm"><Star size={16} fill="currentColor" /> {product.rating}</div><span className="text-sm text-neutral-400">({product.reviewCount} reseñas)</span></div>
          <div className="mt-5 flex items-center gap-3"><span className="text-2xl font-bold">{formatCOP(product.price)}</span>{product.previousPrice && <><span className="text-neutral-400 line-through">{formatCOP(product.previousPrice)}</span><span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold">-{discount}%</span></>}</div>
          <p className="mt-5 leading-7 text-neutral-600">{product.description}</p>

          <div className="mt-8"><div className="flex items-center justify-between"><span className="text-sm font-bold">Color</span><span className="text-sm text-neutral-500">{selectedColor?.name}</span></div><div className="mt-3 flex flex-wrap gap-3">{product.colorIds.map((id) => { const c = colors.find((x) => x.id === id)!; return <button key={id} onClick={() => setColorId(id)} title={c.name} className={`grid size-10 place-items-center rounded-full border-2 ${colorId === id ? "border-black" : "border-transparent"}`}><span className="size-7 rounded-full border border-black/10" style={{ background: c.hex }} /></button> })}</div></div>

          <div className="mt-7"><div className="flex items-center justify-between"><span className="text-sm font-bold">Talla</span><span className="text-xs text-neutral-500">Selecciona tu talla</span></div><div className="mt-3 grid grid-cols-5 gap-2">{product.sizeIds.map((id) => { const v = product.variants.find((x) => x.colorId === colorId && x.sizeId === id); const available = Boolean(v && v.stock > 0); return <button key={id} disabled={!available} onClick={() => setSizeId(id)} className={`rounded-xl border py-3 text-sm font-semibold ${sizeId === id && available ? "border-black bg-black text-white" : "border-neutral-200"} ${!available ? "cursor-not-allowed opacity-35 line-through" : ""}`}>{id}</button> })}</div>{variant && <p className="mt-3 text-xs text-neutral-500">{variant.stock > 0 ? `${variant.stock} unidades disponibles` : "Agotado"}</p>}</div>

          <div className="mt-7 flex gap-3"><div className="flex items-center rounded-full border border-neutral-200"><button onClick={() => setQuantity(Math.max(1, quantity-1))} className="px-4"><Minus size={16}/></button><span className="w-8 text-center text-sm">{quantity}</span><button onClick={() => setQuantity(quantity+1)} className="px-4"><Plus size={16}/></button></div><button disabled={!variant || variant.stock === 0} onClick={() => variant && addToCart({ productId: product.id, variantId: variant.id, quantity })} className="button-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"><ShoppingBag size={18}/> Agregar al carrito</button></div>
          <Link href="/checkout" className="button-secondary mt-3 w-full">Comprar ahora</Link>

          <div className="mt-8 grid gap-4 border-t border-black/5 pt-6 text-sm"><div className="flex gap-3"><Truck size={19}/><span><b>Envío rápido.</b> Seguimiento incluido.</span></div><div className="flex gap-3"><ShieldCheck size={19}/><span><b>Compra segura.</b> Tus datos protegidos.</span></div><div className="flex gap-3"><Check size={19}/><span><b>Cambios fáciles.</b> Consulta nuestra política.</span></div></div>
        </div>
      </div>

      <section className="mt-20 grid gap-12 border-t border-black/5 pt-14 lg:grid-cols-2">
        <div><h2 className="text-2xl font-bold">Detalles</h2><dl className="mt-6 grid gap-4 text-sm"><div className="flex justify-between border-b border-black/5 pb-3"><dt className="text-neutral-500">Material</dt><dd className="font-medium">{product.material}</dd></div><div className="flex justify-between border-b border-black/5 pb-3"><dt className="text-neutral-500">SKU</dt><dd className="font-medium">{product.sku}</dd></div><div className="flex justify-between border-b border-black/5 pb-3"><dt className="text-neutral-500">Categoría</dt><dd className="font-medium">{product.subcategory}</dd></div></dl></div>
        <div>
          <h2 className="text-2xl font-bold">Reseñas de clientes</h2>
          <div className="mt-6 grid gap-5">
            {reviews.length > 0 ? reviews.map((r) => (
              <div key={r.id} className="rounded-2xl bg-neutral-50 p-5">
                <div className="flex justify-between"><b>{r.author}</b><span className="flex gap-1 text-xs"><Star size={13} fill="currentColor"/> {r.rating}</span></div>
                <h3 className="mt-3 font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{r.body}</p>
              </div>
            )) : <p className="text-sm text-neutral-500">Aún no hay reseñas.</p>}
          </div>
        </div>
      </section>

      {related.length > 0 && <section className="mt-20"><div className="mb-8 flex items-end justify-between"><h2 className="text-2xl font-bold">También te puede gustar</h2><Link href={`/categoria/${product.category}`} className="text-sm font-semibold">Ver más →</Link></div><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((p) => <ProductCard key={p.id} product={p}/>)}</div></section>}
    </div>
  );
}
