"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { products, sizes } from "@/lib/data";
import { formatCOP } from "@/lib/utils";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const { cart, subtotal, updateQuantity, removeFromCart } = useStore();
  const shipping = subtotal >= 250000 || subtotal === 0 ? 0 : 14900;
  const total = subtotal + shipping;

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <h1 className="text-4xl font-black">Tu carrito</h1>
      {cart.length === 0 ? <div className="py-24 text-center"><p className="text-neutral-500">Todavía no tienes productos en el carrito.</p><Link href="/buscar" className="button-primary mt-6">Explorar productos</Link></div> : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5">
            {cart.map((item) => {
              const p = products.find((x) => x.id === item.productId)!;
              const variant = p.variants.find((x) => x.id === item.variantId)!;
              const size = sizes.find((x) => x.id === variant.sizeId)?.label;
              return <div key={item.id} className="flex gap-4 border-b border-black/5 pb-5"><div className="relative size-28 overflow-hidden rounded-2xl bg-neutral-100"><Image src={p.images[0]} alt={p.name} fill sizes="112px" className="object-cover"/></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><p className="font-bold">{p.name}</p><p className="mt-1 text-xs text-neutral-500">Talla {size}</p></div><button onClick={() => removeFromCart(item.id)} aria-label="Eliminar"><Trash2 size={18}/></button></div><div className="mt-5 flex items-center justify-between"><div className="flex items-center rounded-full border"><button onClick={() => updateQuantity(item.id, item.quantity-1)} className="px-3 py-2"><Minus size={14}/></button><span className="w-8 text-center text-sm">{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity+1)} className="px-3 py-2"><Plus size={14}/></button></div><b>{formatCOP(p.price * item.quantity)}</b></div></div></div>
            })}
            <Link href="/buscar" className="button-secondary mt-2 w-fit">← Continuar comprando</Link>
          </div>
          <aside className="h-fit rounded-3xl bg-neutral-50 p-6"><h2 className="text-lg font-bold">Resumen</h2><div className="mt-6 grid gap-4 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{formatCOP(subtotal)}</span></div><div className="flex justify-between"><span>Envío</span><span>{shipping === 0 ? "Gratis" : formatCOP(shipping)}</span></div><div className="border-t border-black/10 pt-4 text-base font-bold"><div className="flex justify-between"><span>Total</span><span>{formatCOP(total)}</span></div></div></div><div className="mt-6"><input placeholder="Código de descuento" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none"/><button className="button-secondary mt-2 w-full">Aplicar código</button></div><Link href="/checkout" className="button-primary mt-4 w-full">Proceder al checkout</Link></aside>
        </div>
      )}
    </main>
  );
}
