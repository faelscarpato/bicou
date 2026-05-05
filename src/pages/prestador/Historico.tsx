import { AppShell } from "@/components/AppShell";
import { MetricCard } from "@/components/MetricCard";
import { PrestadorProgressStepper } from "@/components/PrestadorProgressStepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { criarResumoCarteira } from "@/lib/wallet";
import { ArrowDownToLine, Building2, CheckCircle2, Clock3, TrendingUp, Wallet } from "lucide-react";
import { toast } from "sonner";

export default function Historico() {
  const bicos = useStore((s) => s.bicos);
  const saques = useStore((s) => s.saques);
  const saldoCarteiraDemo = useStore((s) => s.saldoCarteiraDemo);
  const registrarSaque = useStore((s) => s.registrarSaque);
  const resumo = criarResumoCarteira(bicos, saques, saldoCarteiraDemo);

  const sacarAgora = () => {
    if (resumo.saldoDisponivel <= 0) {
      toast.info("Não há saldo disponível para saque.");
      return;
    }

    registrarSaque(resumo.saldoDisponivel);
    toast.success("Saque simulado registrado.");
  };

  return (
    <AppShell role="prestador">
      <div className="mx-auto max-w-5xl space-y-5 p-4 md:p-8">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Carteira e histórico</h1>
          <p className="text-sm text-muted-foreground">Acompanhe saldo disponível, próximos recebíveis e pagamentos demo.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <MetricCard label="Saldo disponível" value={formatarMoeda(resumo.saldoDisponivel)} icon={Wallet} />
          <MetricCard label="A receber" value={resumo.proximosRecebiveis.length} icon={Clock3} />
          <MetricCard label="Total recebido" value={formatarMoeda(resumo.totalRecebido)} icon={TrendingUp} />
          <MetricCard label="Saques demo" value={formatarMoeda(resumo.totalSacado)} icon={ArrowDownToLine} />
        </div>

        <Card className="overflow-hidden shadow-card">
          <div className="grid gap-4 p-5 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Disponível para saque</p>
              <p className="mt-1 text-3xl font-bold text-primary md:text-4xl">{formatarMoeda(resumo.saldoDisponivel)}</p>
              <p className="mt-2 text-sm text-muted-foreground">Saque demonstrativo via Pix, sem processamento financeiro real.</p>
            </div>
            <Button size="lg" onClick={sacarAgora} disabled={resumo.saldoDisponivel <= 0}>
              <ArrowDownToLine className="h-4 w-4" />
              Sacar agora
            </Button>
          </div>
        </Card>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Próximos recebimentos</h2>
            <span className="text-sm text-muted-foreground">{resumo.proximosRecebiveis.length} item(ns)</span>
          </div>
          <div className="grid gap-3">
            {resumo.proximosRecebiveis.map((item) => (
              <Card key={item.id} className="p-4 shadow-card">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{item.titulo}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      {item.empresa}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.status} · {item.previsao}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-primary">{formatarMoeda(item.valor)}</p>
                </div>
                <div className="mt-4">
                  <PrestadorProgressStepper bico={item.bico} />
                </div>
              </Card>
            ))}
            {resumo.proximosRecebiveis.length === 0 && (
              <Card className="p-5 text-sm text-muted-foreground shadow-card">Nenhum recebimento pendente no momento.</Card>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold">Pagamentos recebidos</h2>
          <Card className="p-2 shadow-card">
            <ul className="divide-y">
              <li className="flex items-center justify-between p-3">
                <div>
                  <p className="font-medium">Histórico demonstrativo inicial</p>
                  <p className="text-xs text-success">Recebido</p>
                </div>
                <p className="font-bold text-primary">{formatarMoeda(saldoCarteiraDemo)}</p>
              </li>
              {resumo.pagamentosRecebidos.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 p-3">
                  <div>
                    <p className="font-medium">{item.titulo}</p>
                    <p className="flex items-center gap-1 text-xs text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Recebido
                    </p>
                  </div>
                  <p className="font-bold text-primary">{formatarMoeda(item.valor)}</p>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}
