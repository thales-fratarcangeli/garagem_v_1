"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn, withBasePath } from "@/lib/utils";

type Slide = {
  id: number;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Os melhores carros novos da temporada",
    description:
      "Confira nosso line-up com condições especiais de financiamento.",
    ctaLabel: "Ver ofertas",
    ctaHref: "/carros",
    imageSrc: "/img/banner1.jpg",
    imageAlt: "Carro em destaque no banner principal",
  },
  {
    id: 2,
    title: "Seminovos com garantia de fábrica",
    description: "Carros revisados, com procedência e laudo cautelar.",
    ctaLabel: "Comprar usados",
    ctaHref: "/carros",
    imageSrc: "/img/banner2.jpg",
    imageAlt: "Seminovo em destaque no banner principal",
  },
  {
    id: 3,
    title: "Venda seu carro em até 24 horas",
    description: "Avaliação online, pagamento à vista e burocracia zero.",
    ctaLabel: "Quero vender",
    ctaHref: "#vender",
    imageSrc: "/img/banner3.jpg",
    imageAlt: "Atendimento para venda de veículo",
  },
];

const AUTOPLAY_MS = 5000;

export function HeroCarousel() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const total = SLIDES.length;

  React.useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const goTo = (i: number) => setIndex(((i % total) + total) % total);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  return (
    <section
      className="relative overflow-hidden bg-slate-100"
      aria-roledescription="carrossel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px]">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="relative h-full w-full shrink-0"
              aria-roledescription="slide"
            >
              <Image
                src={withBasePath(slide.imageSrc)}
                alt={slide.imageAlt}
                fill
                priority={slide.id === 1}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container">
                  <div className="max-w-xl text-white">
                    <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                      {slide.title}
                    </h1>
                    <p className="mt-3 text-sm text-white/90 sm:text-base md:text-lg">
                      {slide.description}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="mt-5 bg-white text-brand-700 hover:bg-slate-100"
                    >
                      <Link href={slide.ctaHref}>{slide.ctaLabel}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md transition hover:bg-white sm:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Próximo slide"
        className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md transition hover:bg-white sm:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-2 rounded-full bg-white/60 transition-all",
              i === index ? "w-8 bg-white" : "w-2 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </section>
  );
}
