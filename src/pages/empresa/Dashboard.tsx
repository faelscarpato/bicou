import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { MetricCard } from "@/components/MetricCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { BicoCard } from "@/components/BicoCard";
import { Briefcase, CheckCircle2, Clock, Star, Wallet, PlusCircle, Lightbulb } from "lucide-react";

export default function EmpresaDashboard() {
  const bicos = useStore((s) => s.bicos);
  const ativos = bicos.filter((b) => !["concluido", "pago"].includes(b.status));
  return (
    <AppShell role="empresa">
      <div className="p-4 md:p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Painel da empresa</h1>
            <p className="text-muted-foreground text-sm">Mercado Boa Compra · São Paulo</p>
          </div>
          <Button asChild><Link to="/empresa/novo"><PlusCircle className="h-4 w-4 mr-1" /> Novo bico</Link></Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <MetricCard label="Publicados" value={8} icon={Briefcase} />
          <MetricCard label="Concluídos" value={5} icon={CheckCircle2} />
          <MetricCard label="Em andamento" value={1} icon={Clock} />
          <MetricCard label="Favoritos" value={4} icon={Star} />
          <MetricCard label="Gasto demo" value="R$ 1.240" icon={Wallet} hint="no mês" />
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Bicos ativos</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {ativos.map((b) => <BicoCard key={b.id} bico={b} baseUrl="/empresa/bico" />)}
          </div>
        </div>

        <Card className="p-5 shadow-card border-primary/20 bg-primary/5">
          <div className="flex gap-3 items-start">
            <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Sugestão Bicou</p>
              <p className="text-sm text-muted-foreground mt-1">Você costuma publicar bicos pela manhã. Crie um modelo recorrente para economizar tempo.</p>
              <Button size="sm" variant="outline" className="mt-3">Criar modelo de bico</Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
