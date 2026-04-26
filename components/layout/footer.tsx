import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-soft">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-500 text-xs font-bold text-white"
                aria-hidden
              >
                LOGO
              </div>
              <span className="text-base font-semibold text-ink">
                Concessionária
              </span>
            </div>
            <p className="text-sm text-muted">
              O melhor lugar para encontrar, comprar e vender o seu carro com
              segurança e tranquilidade.
            </p>
            <div className="mt-4 flex gap-3">
              <SocialIcon Icon={Instagram} label="Instagram" />
              <SocialIcon Icon={Facebook} label="Facebook" />
              <SocialIcon Icon={Youtube} label="YouTube" />
            </div>
          </div>

          <FooterColumn title="Navegar">
            <FooterLink href="/">Início</FooterLink>
            <FooterLink href="/carros">Comprar</FooterLink>
            <FooterLink href="#vender">Vender</FooterLink>
            <FooterLink href="#servicos">Serviços</FooterLink>
          </FooterColumn>

          <FooterColumn title="Institucional">
            <FooterLink href="#sobre">Sobre nós</FooterLink>
            <FooterLink href="#trabalhe">Trabalhe conosco</FooterLink>
            <FooterLink href="#privacidade">Privacidade</FooterLink>
            <FooterLink href="#termos">Termos de uso</FooterLink>
          </FooterColumn>

          <FooterColumn title="Contato">
            <li className="flex items-start gap-2 text-sm text-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>Endereço da loja, 0000 - Cidade/UF</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>(00) 00000-0000</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>contato@concessionaria.com.br</span>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Concessionária. Todos os direitos reservados.</p>
          <p>CNPJ: 00.000.000/0001-00</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-ink">{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted transition-colors hover:text-brand-600"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Link
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-muted transition-colors hover:border-brand-500 hover:text-brand-600"
    >
      <Icon className="h-4 w-4" />
    </Link>
  );
}
