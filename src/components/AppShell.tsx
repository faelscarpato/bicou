import { Link, NavLink, useLocation } from "react-router-dom";
import { Building2, Hammer, ShieldCheck, LayoutDashboard, PlusCircle, ListChecks, Wallet, Home, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const empresaNav = [
  { to: "/empresa", icon: LayoutDashboard, label: "Painel" },
  { to: "/empresa/novo", icon: PlusCircle, label: "Novo bico" },
];
const prestadorNav = [
  { to: "/prestador", icon: LayoutDashboard, label: "Painel" },
  { to: "/prestador/bicos", icon: ListChecks, label: "Bicos" },
  { to: "/prestador/historico", icon: Wallet, label: "Histórico" },
  { to: "/prestador/perfil", icon: UserCircle, label: "Perfil" },
];
const adminNav = [{ to: "/admin", icon: ShieldCheck, label: "Admin" }];

export function AppShell({ role, children }: { role: "empresa" | "prestador" | "admin"; children: React.ReactNode }) {
  const nav = role === "empresa" ? empresaNav : role === "prestador" ? prestadorNav : adminNav;
  const roleLabel = role === "empresa" ? "Mercado Boa Compra" : role === "prestador" ? "Lucas M." : "Admin demo";
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <Link to="/" className="px-6 py-5 border-b border-sidebar-border" aria-label="Ir para a página inicial do Bicou">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold">B</div>
            <span className="font-bold text-lg text-white">Bicou</span>
          </div>
        </Link>
        <div className="px-4 py-3 border-b border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 uppercase tracking-wider">{role === "admin" ? "Admin" : role === "empresa" ? "Empresa demo" : "Prestador demo"}</p>
          <p className="text-sm font-medium text-white mt-0.5">{roleLabel}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1" aria-label={`Navegação ${role}`}>
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to.split("/").length === 2}
              className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white")}>
              <n.icon className="h-4 w-4" aria-hidden="true" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <ThemeToggle showLabel className="border-sidebar-border bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent hover:text-white" />
          <RoleSwitch current={role} />
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-xs text-sidebar-foreground/70 hover:text-white">
            <Home className="h-3.5 w-3.5" aria-hidden="true" /> Sair da demo
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-40 bg-card border-b px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="Ir para a página inicial do Bicou">
            <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm">B</div>
            <span className="font-bold">Bicou</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">{roleLabel}</span>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0" key={location.pathname}>{children}</main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur border-t flex px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]" aria-label={`Navegação inferior ${role}`}>
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to.split("/").length === 2}
              className={({ isActive }) => cn("flex-1 flex flex-col items-center justify-center gap-1 rounded-md py-2 text-[11px] font-medium min-h-14",
                isActive ? "text-primary" : "text-muted-foreground")}>
              <n.icon className="h-5 w-5" aria-hidden="true" />
              <span className="leading-none">{n.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

function RoleSwitch({ current }: { current: string }) {
  const items = [
    { to: "/empresa", label: "Empresa", icon: Building2 },
    { to: "/prestador", label: "Prestador", icon: Hammer },
    { to: "/admin", label: "Admin", icon: ShieldCheck },
  ].filter((i) => !i.to.includes(current));
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50 px-3">Trocar visão</p>
      {items.map((i) => (
        <Link key={i.to} to={i.to} className="flex items-center gap-2 px-3 py-1.5 text-xs text-sidebar-foreground/80 hover:text-white rounded-md hover:bg-sidebar-accent">
          <i.icon className="h-3.5 w-3.5" aria-hidden="true" /> {i.label}
        </Link>
      ))}
    </div>
  );
}
