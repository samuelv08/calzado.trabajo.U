import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CreditCard, RotateCcw, Truck } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export default function HomePage() {
  const featured = products.filter((p) => p.featured);
  const newest = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.previousPrice);

  return (
    <main>
      <section className="relative min-h-[76vh] overflow-hidden bg-neutral-100">
        <Image src={products[0].images[0]} alt="Colección de zapatos Lúmina" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
        <div className="relative mx-auto flex min-h-[76vh] max-w-7xl items-center px-5 lg:px-8">
          <div className="max-w-xl text-white">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.28em]">Nueva colección · 2026</p>
            <h1 className="text-5xl font-black leading-[.95] tracking-tight md:text-7xl">Camina a tu manera.</h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/80 md:text-lg">Diseños contemporáneos, materiales seleccionados y comodidad para cada paso.</p>
            <Link href="/buscar" className="button-primary mt-8 bg-white text-black">Comprar ahora <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between"><div><p className="eyebrow">Explora</p><h2 className="mt-2 text-3xl font-bold">Compra por categoría</h2></div></div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[["Hombre","/categoria/hombre",products[1].images[0]],["Mujer","/categoria/mujer",products[2].images[0]],["Niño","/categoria/nino",products[4].images[0]],["Niña","/categoria/nina",products[5].images[0]]].map(([name, href, image]) => (
            <Link key={name} href={href} className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100">
              <Image src={image} alt={name} fill sizes="25vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white bg-gradient-to-t from-black/60 to-transparent"><span className="text-lg font-bold">{name}</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">Selección Lúmina</p><h2 className="mt-2 text-3xl font-bold">Productos destacados</h2></div><Link href="/buscar" className="text-sm font-semibold">Ver todos →</Link></div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">Lo último</p><h2 className="mt-3 text-4xl font-black">Nuevos productos</h2><p className="mt-4 max-w-md leading-7 text-neutral-500">Descubre las siluetas que acabamos de incorporar a nuestra colección.</p><Link href="/buscar" className="button-secondary mt-7">Descubrir novedades</Link></div>
          <div className="grid grid-cols-2 gap-4">{newest.slice(0, 2).map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>

      <section className="bg-neutral-100 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">Oportunidades</p><h2 className="mt-2 text-3xl font-bold">Ofertas seleccionadas</h2></div></div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">{offers.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[[Truck,"Envíos rápidos","Despachamos tus pedidos con seguimiento."],[CreditCard,"Compra segura","Pagos procesados de forma protegida."],[Check,"Varios métodos de pago","Elige la opción más conveniente."],[RotateCcw,"Cambios fáciles","Proceso simple para cambios y devoluciones."]].map(([Icon,title,text]) => {
            const I = Icon as typeof Truck;
            return <div key={title as string} className="rounded-3xl border border-black/5 p-6"><I size={22}/><h3 className="mt-5 font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-neutral-500">{text as string}</p></div>
          })}
        </div>
      </section>

      <section className="bg-neutral-950 px-5 py-16 text-white">
        <div className="mx-auto max-w-xl text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-white/50">Newsletter</p><h2 className="mt-3 text-3xl font-black">Un paso adelante.</h2><p className="mt-4 text-white/60">Recibe lanzamientos, ofertas y contenido de estilo.</p><form className="mx-auto mt-7 flex max-w-md gap-2"><input type="email" required placeholder="Tu correo electrónico" className="min-w-0 flex-1 rounded-full bg-white/10 px-5 py-3 outline-none"/><button className="rounded-full bg-white px-5 py-3 font-semibold text-black">Suscribirme</button></form></div>
      </section>
    </main>
  );
}
