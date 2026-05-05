import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, CheckCircle2, Clock, MapPin, Package, ClipboardCheck, Boxes, Sparkles, Users, ShieldCheck, Wallet, History, Star } from "lucide-react";

const servicos = [
  { icon: Package, label: "Reposição de produtos" },
  { icon: Sparkles, label: "Organização de gôndolas" },
  { icon: ClipboardCheck, label: "Conferência de validade" },
  { icon: Boxes, label: "Apoio em estoque" },
  { icon: Users, label: "Apoio em eventos" },
  { icon: Sparkles, label: "Limpeza leve" },
];

const passos = [
  "Publique o bico",
  "Prestadores próximos visualizam",
  "A empresa confirma o prestador",
  "O prestador faz check-in e check-out",
  "A empresa confirma a conclusão",
  "O pagamento é registrado no mesmo dia",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold">B</div>
            <span className="font-bold text-lg">Bicou</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#como" className="hover:text-foreground">Como funciona</a>
            <a href="#empresas" className="hover:text-foreground">Para empresas</a>
            <a href="#prestadores" className="hover:text-foreground">Para prestadores</a>
            <a href="#seguranca" className="hover:text-foreground">Segurança</a>
            <Link to="/legal" className="hover:text-foreground">Legal</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm"><Link to="/simular">Testar demonstração</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="h-3 w-3" /> Protótipo demonstrativo
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Precisa de ajuda por algumas horas no seu comércio?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Com o Bicou, sua empresa publica serviços pontuais como reposição, organização de gôndolas,
            conferência de validade e apoio em estoque. Prestadores próximos visualizam o bico e podem aceitar pelo celular.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" asChild><Link to="/simular">Simular meu primeiro bico <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/empresa">Entrar como empresa demo</Link></Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Sem cadastro</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Dados fictícios</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Mobile-first</span>
          </div>
        </div>

        <Card className="p-6 shadow-elegant border-border/60 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full gradient-primary opacity-10" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">Bico ativo</span>
            <span className="text-xs text-muted-foreground">Mercado Boa Compra</span>
          </div>
          <h3 className="mt-3 text-xl font-bold">Organização de gôndolas</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Hoje</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> 14h às 18h</div>
            <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> R$ 20/hora</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 1,8 km</div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-success/10 text-sm text-success font-medium flex items-center gap-2">
            <Users className="h-4 w-4" /> 3 prestadores próximos disponíveis
          </div>
          <div className="mt-2 p-3 rounded-lg bg-primary/5 text-sm flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" /> Pagamento simulado no mesmo dia
          </div>
        </Card>
      </section>

      {/* Como funciona */}
      <section id="como" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Como funciona</h2>
            <p className="text-muted-foreground mt-2">Em 6 passos simples</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {passos.map((p, i) => (
              <Card key={i} className="p-5 shadow-card">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{i + 1}</div>
                <p className="mt-3 font-medium">{p}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="empresas" className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Serviços ideais para começar</h2>
          <p className="text-muted-foreground mt-2">Demandas pontuais e específicas para pequenos comércios</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {servicos.map((s, i) => (
            <Card key={i} className="p-5 shadow-card hover:shadow-elegant transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3"><s.icon className="h-5 w-5" /></div>
              <p className="font-semibold">{s.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Confiança */}
      <section id="seguranca" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">Controle, clareza e registro do início ao fim</h2>
          <div className="grid md:grid-cols-3 gap-3 mt-10">
            {[
              { icon: ClipboardCheck, t: "Contrato demonstrativo", d: "Termo claro de prestação de serviço pontual." },
              { icon: CheckCircle2, t: "Check-in e check-out", d: "Registro de horários no início e fim." },
              { icon: Star, t: "Avaliação dos dois lados", d: "Empresa avalia prestador e vice-versa." },
              { icon: Wallet, t: "Pagamento simulado por Pix", d: "Registro de pagamento no mesmo dia." },
              { icon: History, t: "Histórico completo", d: "Acompanhe todos os bicos realizados." },
              { icon: ShieldCheck, t: "Perfis com reputação", d: "Prestadores com avaliação visível." },
            ].map((it, i) => (
              <Card key={i} className="p-5 shadow-card">
                <it.icon className="h-6 w-6 text-primary" />
                <h3 className="font-semibold mt-3">{it.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{it.d}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-xs text-center text-muted-foreground max-w-2xl mx-auto">
            O Bicou é uma plataforma de demonstração para serviços pontuais. Regras jurídicas, fiscais, trabalhistas e contratuais devem ser validadas por profissionais habilitados antes de uso real.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="prestadores" className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Teste agora como seria publicar um bico</h2>
        <p className="mt-3 text-muted-foreground">Em menos de 1 minuto você simula sua primeira oportunidade.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild><Link to="/simular">Começar simulação</Link></Button>
          <Button size="lg" variant="outline" asChild><Link to="/prestador">Entrar como prestador demo</Link></Button>
          <Button size="lg" variant="ghost" asChild><Link to="/admin">Painel admin demo</Link></Button>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Bicou · Bicos rápidos perto de você</p>
          <p className="mt-2 text-xs"><Link to="/legal" className="underline">Termos, privacidade e aviso legal demonstrativo</Link></p>
        </div>
      </footer>
    </div>
  );
}
