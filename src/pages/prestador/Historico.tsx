import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { Wallet, TrendingUp, Award, Building2 } from "lucide-react";

const itens = [
  { servico: "Organização de gôndolas", valor: 80, status: "Pago demo" },
  { servico: "Apoio em estoque", valor: 72, status: "Pago demo" },
  { servico: "Conferência de validade", valor: 60, status: "Pago demo" },
  { servico: "Reposição de produtos", valor: 100, status: "Pago demo" },
  { servico: "Apoio em evento", valor: 108, status: "Pago demo" },
];

export default function Historico() {
  const total = itens.reduce((a, b) => a + b.valor, 0);
  const media = total / itens.length;
  return (
    <AppShell role="prestador">
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold">Histórico de ganhos</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard label="Total recebido demo" value={`R$ ${total}`} icon={Wallet} />
          <MetricCard label="Média por bico" value={`R$ ${media.toFixed(0)}`} icon={TrendingUp} />
          <MetricCard label="Melhor categoria" value="Eventos" icon={Award} />
          <MetricCard label="Empresa frequente" value="Boa Compra" icon={Building2} />
        </div>
        <Card className="p-2 shadow-card">
          <ul className="divide-y">
            {itens.map((i, k) => (
              <li key={k} className="flex items-center justify-between p-3">
                <div>
                  <p className="font-medium">{i.servico}</p>
                  <p className="text-xs text-success">{i.status}</p>
                </div>
                <p className="font-bold text-primary">R$ {i.valor},00</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
