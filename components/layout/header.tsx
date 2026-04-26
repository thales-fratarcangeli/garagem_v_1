"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ShoppingCart, Tag, Wrench, LogIn, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/carros", label: "Comprar", icon: ShoppingCart },
  { href: "#vender", label: "Vender", icon: Tag },
  { href: "#servicos", label: "Serviços", icon: Wrench },
  { href: "#contato", label: "Contato", icon: Phone },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Início">
          <Logo />
          <span className="hidden text-base font-semibold tracking-tight text-ink sm:inline">
            Concessionária
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm" className="gap-2">
            <Link href="#login">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-500 text-xs font-bold text-white"
      aria-hidden
    >
      LOGO
    </div>
  );
}

function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-slate-100 hover:text-ink",
        className
      )}
    >
      {children}
    </Link>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menu"
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[85%] max-w-xs flex-col">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-ink hover:bg-slate-100"
                >
                  <Icon className="h-5 w-5 text-brand-600" />
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
        <div className="border-t p-4">
          <SheetClose asChild>
            <Button asChild className="w-full gap-2">
              <Link href="#login">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
