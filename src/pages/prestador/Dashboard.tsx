import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { MetricCard } from "@/components/MetricCard";
import { useStore } from "@/lib/store";
import { BicoCard } from "@/components/BicoCard";
import { Wallet, CheckCircle2, Star, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PrestadorDashboard() {
  const bicos = useStore((s) => s.bicos);
  const [raio, setRaio] = useState(5);
  const proximos = bicos.filter((b) => b.distanciaKm <= raio && ["publicado", "aguardando"].includes(b.status));
  return (
    <AppShell role="prestador">
      <div className="p-4 md:p-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Olá, Lucas 👋</h1>
          <p className="text-muted-foreground text-sm">Bicos próximos no seu raio de busca</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard label="Ganhos demo" value="R$ 420" icon={Wallet} hint="no mês" />
          <MetricCard label="Concluídos" value={6} icon={CheckCircle2} />
          <MetricCard label="Avaliação" value="4,8" icon={Star} />
          <MetricCard label="Próximo" value="Hoje 14h" icon={Calendar} />
        </div>

        <Card className="p-4 shadow-card">
          <p className="text-sm font-semibold mb-2">Raio de busca</p>
          <div className="flex gap-1">
            {[1, 3, 5, 10].map((k) => (
              <Button key={k} size="sm" variant={raio === k ? "default" : "outline"} onClick={() => setRaio(k)}>{k} km</Button>
            ))}
          </div>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Bicos próximos</h2>
            <Button variant="ghost" size="sm" asChild><Link to="/prestador/bicos">Ver todos</Link></Button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {proximos.map((b) => <BicoCard key={b.id} bico={b} baseUrl="/prestador/bico" />)}
            {proximos.length === 0 && <p className="text-sm text-muted-foreground">Nenhum bico próximo no momento.</p>}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
