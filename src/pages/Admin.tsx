import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { useStore } from "@/lib/store";
import { empresas, prestadores } from "@/lib/mockData";
import { Building2, Users, Briefcase, CheckCircle2, Wallet, TrendingUp, AlertTriangle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export default function Admin() {
  const bicos = useStore((s) => s.bicos);
  return (
    <AppShell role="admin">
      <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Painel admin demonstrativo</h1>
          <p className="text-muted-foreground text-sm">Visão consolidada da operação simulada</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard label="Empresas" value={12} icon={Building2} />
          <MetricCard label="Prestadores" value={86} icon={Users} />
          <MetricCard label="Bicos publicados" value={34} icon={Briefcase} />
          <MetricCard label="Concluídos" value={21} icon={CheckCircle2} />
          <MetricCard label="GMV demo" value="R$ 4.820" icon={Wallet} />
          <MetricCard label="Receita Bicou" value="R$ 482" icon={TrendingUp} />
        </div>

        <Card className="p-5 shadow-card">
          <h3 className="font-bold mb-3 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Alertas operacionais</h3>
          <ul className="text-sm space-y-2">
            <Alert>Bico sem prestador confirmado · HortiMais</Alert>
            <Alert>Prestador atrasado · Bruno L. (15 min)</Alert>
            <Alert>Pagamento pendente · Mercadinho São José</Alert>
            <Alert>Divergência de horas · Apoio em evento</Alert>
          </ul>
        </Card>

        <Card className="shadow-card overflow-hidden">
          <div className="px-5 py-3 border-b font-bold">Empresas</div>
          <div className="divide-y text-sm">
            {empresas.map((e) => (
              <div key={e.id} className="grid grid-cols-2 md:grid-cols-5 gap-2 px-5 py-3">
                <span className="font-medium">{e.nome}</span>
                <span className="text-muted-foreground">{e.cidade}</span>
                <span>{e.bicosPublicados} bicos</span>
                <span className={e.status === "ativa" ? "text-success" : "text-warning"}>{e.status}</span>
                <span className="text-xs">Risco: <strong>{e.risco}</strong></span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="shadow-card overflow-hidden">
          <div className="px-5 py-3 border-b font-bold">Prestadores</div>
          <div className="divide-y text-sm">
            {prestadores.map((p) => (
              <div key={p.id} className="grid grid-cols-2 md:grid-cols-5 gap-2 px-5 py-3">
                <span className="font-medium">{p.nome}</span>
                <span className="text-muted-foreground">{p.bairro}</span>
                <span>{p.servicosConcluidos} serviços</span>
                <span>⭐ {p.avaliacao}</span>
                <span className={p.disponivel ? "text-success" : "text-muted-foreground"}>{p.disponivel ? "Disponível" : "Indisponível"}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="shadow-card overflow-hidden">
          <div className="px-5 py-3 border-b font-bold">Bicos</div>
          <div className="divide-y text-sm">
            {bicos.map((b) => (
              <div key={b.id} className="grid grid-cols-2 md:grid-cols-5 gap-2 px-5 py-3 items-center">
                <span className="font-medium truncate">{b.titulo}</span>
                <span className="text-muted-foreground truncate">{b.empresa}</span>
                <span>{b.data}</span>
                <span>R$ {b.valorHora * b.duracaoHoras}</span>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
function Alert({ children }: { children: React.ReactNode }) {
  return <li className="flex items-center gap-2 p-2 rounded-lg bg-warning/5"><span className="h-1.5 w-1.5 rounded-full bg-warning" />{children}</li>;
}
