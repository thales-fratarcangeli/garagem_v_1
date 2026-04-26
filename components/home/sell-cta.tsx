import Link from "next/link";
import { Tag } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SellCta() {
  return (
    <section className="container py-10 md:py-14">
      <div className="overflow-hidden rounded-2xl bg-brand-600 text-white">
        <div className="grid items-center gap-6 p-6 md:grid-cols-[1fr_auto] md:gap-10 md:p-10">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
              <Tag className="h-3.5 w-3.5" />
              Quer vender seu carro?
            </div>
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">
              Avaliação online em minutos. Pagamento à vista.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/90 md:text-base">
              Sem burocracia, sem visitas perdidas. Receba uma proposta justa e
              feche negócio com segurança.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="w-full bg-white text-brand-700 hover:bg-slate-100 md:w-auto"
          >
            <Link href="#vender">Quero vender</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
