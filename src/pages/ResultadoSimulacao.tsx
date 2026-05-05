import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, MapPin, ArrowRight } from "lucide-react";
import { prestadores } from "@/lib/mockData";
import { PrestadorCard } from "@/components/PrestadorCard";
import { SimData } from "./Simulador";

export default function ResultadoSimulacao() {
  const raw = sessionStorage.getItem("bicou-sim");
  const d: SimData | null = raw ? JSON.parse(raw) : null;
  const total = d ? d.valorHora * d.duracao * d.vagas : 0;
  const taxa = total * 0.1;

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm">B</div>
            <span className="font-bold">Bicou</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <div className="text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success mb-3">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Seu bico foi simulado com sucesso</h1>
          <p className="text-muted-foreground mt-2">Em uma operação real, prestadores próximos poderiam visualizar essa oportunidade e aceitar conforme disponibilidade.</p>
        </div>

        {d && (
          <Card className="p-6 shadow-card">
            <h3 className="font-bold mb-3">Resumo do bico</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <Row k="Serviço" v={d.categoria} />
              <Row k="Data" v={d.data} />
              <Row k="Horário" v={d.horaInicio} />
              <Row k="Duração" v={`${d.duracao}h`} />
              <Row k="Valor/hora" v={`R$ ${d.valorHora}`} />
              <Row k="Vagas" v={d.vagas} />
              <Row k="Total prestadores" v={`R$ ${total.toFixed(2)}`} />
              <Row k="Taxa Bicou" v={`R$ ${taxa.toFixed(2)}`} />
            </div>
            <div className="mt-3 pt-3 border-t flex justify-between">
              <span className="font-medium">Total estimado da empresa</span>
              <span className="text-primary text-xl font-bold">R$ {(total + taxa).toFixed(2)}</span>
            </div>
          </Card>
        )}

        <Card className="p-6 shadow-card">
          <h3 className="font-bold mb-3 flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Prestadores encontrados na simulação</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
            <Stat n="14" l="em até 5 km" />
            <Stat n="8" l="disponíveis no horário" />
            <Stat n="5" l="com experiência" />
            <Stat n="~12 min" l="tempo médio (demo)" />
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-3">
          {prestadores.slice(0, 3).map((p) => <PrestadorCard key={p.id} p={p} />)}
        </div>

        <Card className="p-6 shadow-card text-center bg-gradient-to-br from-primary/5 to-transparent">
          <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
          <h3 className="font-bold">Quer testar com sua empresa?</h3>
          <p className="text-sm text-muted-foreground mt-1">Continue para o painel demonstrativo da empresa.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button asChild><Link to="/empresa">Entrar no painel empresa demo <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
            <Button variant="outline" asChild><Link to="/simular">Voltar para editar</Link></Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="flex justify-between pr-3"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>;
}
function Stat({ n, l }: { n: string; l: string }) {
  return <div className="p-3 rounded-lg bg-muted/50"><p className="text-xl font-bold text-primary">{n}</p><p className="text-xs text-muted-foreground">{l}</p></div>;
}
