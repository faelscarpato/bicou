import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { MetricCard } from "@/components/MetricCard";
import { useStore } from "@/lib/store";
import { BicoCard } from "@/components/BicoCard";
import { Wallet, CheckCircle2, Star, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { criarResumoCarteira } from "@/lib/wallet";

const categoriasFiltro = ["Todos", "Reposição", "Limpeza", "Caixa", "Estoque"];
const filtrosRapidos = ["Hoje", "Até 2 km", "Até 5 km", "Todos"];

export default function PrestadorDashboard() {
  const bicos = useStore((s) => s.bicos);
  const saques = useStore((s) => s.saques);
  const saldoCarteiraDemo = useStore((s) => s.saldoCarteiraDemo);
  const resumoCarteira = criarResumoCarteira(bicos, saques, saldoCarteiraDemo);
  const [categoria, setCategoria] = useState("Todos");
  const [filtroRapido, setFiltroRapido] = useState("Até 5 km");
  const proximos = bicos
    .filter((b) => ["publicado", "aguardando"].includes(b.status))
    .filter((b) => categoria === "Todos" || b.categoria.toLowerCase().includes(categoria.toLowerCase()))
    .filter((b) => {
      if (filtroRapido === "Hoje") return b.data === "Hoje";
      if (filtroRapido === "Até 2 km") return b.distanciaKm <= 2;
      if (filtroRapido === "Até 5 km") return b.distanciaKm <= 5;
      return true;
    });
  return (
    <AppShell role="prestador">
      <div className="p-4 md:p-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Olá, Lucas</h1>
          <p className="text-muted-foreground text-sm">Bicos próximos no seu raio de busca</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard label="Saldo disponível" value={`R$ ${resumoCarteira.saldoDisponivel.toFixed(0)}`} icon={Wallet} hint="carteira" />
          <MetricCard label="Concluídos" value={6} icon={CheckCircle2} />
          <MetricCard label="Avaliação" value="4,8" icon={Star} />
          <MetricCard label="Próximo" value="Hoje 14h" icon={Calendar} />
        </div>

        <Card className="p-4 shadow-card space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">Categoria</p>
            <div className="flex flex-wrap gap-2">
              {categoriasFiltro.map((item) => (
                <Button key={item} size="sm" variant={categoria === item ? "default" : "secondary"} onClick={() => setCategoria(item)}>
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Data e distância</p>
            <div className="flex flex-wrap gap-2">
              {filtrosRapidos.map((item) => (
                <Button key={item} size="sm" variant={filtroRapido === item ? "default" : "outline"} onClick={() => setFiltroRapido(item)}>
                  {item}
                </Button>
              ))}
            </div>
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
