import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categorias } from "@/lib/mockData";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { LegalAlert } from "@/components/LegalAlert";

export interface SimData {
  categoria: string;
  empresa: string;
  bairro: string;
  cidade: string;
  data: string;
  horaInicio: string;
  duracao: number;
  vagas: number;
  valorHora: number;
  observacoes: string;
  experiencia: boolean;
  esforco: boolean;
  material: string;
  epi: string;
  instrucoes: string;
}

const initial: SimData = {
  categoria: "Organização de gôndolas",
  empresa: "Mercado Boa Compra",
  bairro: "Centro", cidade: "São Paulo",
  data: "Hoje", horaInicio: "14:00", duracao: 4, vagas: 1, valorHora: 20,
  observacoes: "", experiencia: false, esforco: true, material: "sim", epi: "na", instrucoes: "Entrada pelo portão lateral.",
};

export default function Simulador() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [d, setD] = useState<SimData>(initial);
  const set = <K extends keyof SimData>(k: K, v: SimData[K]) => setD((s) => ({ ...s, [k]: v }));

  const total = d.valorHora * d.duracao * d.vagas;
  const taxa = total * 0.1;

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm">B</div>
            <span className="font-bold">Bicou</span>
          </Link>
          <span className="text-xs text-muted-foreground">Simulação pública</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-6">
          {["Serviço", "Dados", "Requisitos", "Resumo"].map((l, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div>
              {i < 3 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <Card className="p-6 shadow-card">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold mb-1">Que tipo de bico você precisa?</h2>
              <p className="text-sm text-muted-foreground mb-4">Escolha a categoria que melhor descreve o serviço.</p>
              <div className="grid grid-cols-2 gap-2">
                {categorias.map((c) => (
                  <button key={c} onClick={() => set("categoria", c)}
                    className={`text-left p-3 rounded-lg border-2 text-sm font-medium transition ${d.categoria === c ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <h2 className="text-xl font-bold">Dados do serviço</h2>
              <div><Label>Nome da empresa</Label><Input value={d.empresa} onChange={(e) => set("empresa", e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Bairro</Label><Input value={d.bairro} onChange={(e) => set("bairro", e.target.value)} /></div>
                <div><Label>Cidade</Label><Input value={d.cidade} onChange={(e) => set("cidade", e.target.value)} /></div>
                <div><Label>Data</Label><Input value={d.data} onChange={(e) => set("data", e.target.value)} /></div>
                <div><Label>Início</Label><Input type="time" value={d.horaInicio} onChange={(e) => set("horaInicio", e.target.value)} /></div>
                <div><Label>Duração (h)</Label><Input type="number" value={d.duracao} onChange={(e) => set("duracao", +e.target.value)} /></div>
                <div><Label>Vagas</Label><Input type="number" value={d.vagas} onChange={(e) => set("vagas", +e.target.value)} /></div>
                <div className="col-span-2"><Label>Valor por hora (R$)</Label><Input type="number" value={d.valorHora} onChange={(e) => set("valorHora", +e.target.value)} /></div>
              </div>
              <div><Label>Observações</Label><Textarea value={d.observacoes} onChange={(e) => set("observacoes", e.target.value)} placeholder="Detalhes úteis para o prestador" /></div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Requisitos</h2>
              <ToggleRow label="Precisa de experiência prévia?" value={d.experiencia} onChange={(v) => set("experiencia", v)} />
              <ToggleRow label="Exige esforço físico?" value={d.esforco} onChange={(v) => set("esforco", v)} />
              <SelectRow label="Empresa fornece material?" value={d.material} onChange={(v) => set("material", v)} />
              <SelectRow label="Precisa de EPI?" value={d.epi} onChange={(v) => set("epi", v)} />
              <div><Label>Instruções para chegada no local</Label><Textarea value={d.instrucoes} onChange={(e) => set("instrucoes", e.target.value)} /></div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-3">Resumo</h2>
              <div className="space-y-2 text-sm">
                <Row k="Tipo de serviço" v={d.categoria} />
                <Row k="Data e horário" v={`${d.data} · ${d.horaInicio}`} />
                <Row k="Duração" v={`${d.duracao}h`} />
                <Row k="Valor por hora" v={`R$ ${d.valorHora},00`} />
                <Row k="Quantidade de prestadores" v={d.vagas} />
              </div>
              <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-1.5 text-sm">
                <Row k="Total para prestadores" v={`R$ ${total.toFixed(2)}`} />
                <Row k="Taxa Bicou (10%)" v={`R$ ${taxa.toFixed(2)}`} />
                <div className="border-t border-primary/20 pt-2 mt-2">
                  <Row k="Total estimado da empresa" v={<strong className="text-primary text-lg">R$ {(total + taxa).toFixed(2)}</strong>} />
                </div>
              </div>
              <div className="mt-4">
                <LegalAlert>Cálculo demonstrativo. Em uma operação real, valide regras fiscais, trabalhistas e contratuais com profissionais habilitados.</LegalAlert>
              </div>
            </div>
          )}

          <div className="flex justify-between gap-2 mt-6">
            <Button variant="outline" onClick={() => (step === 0 ? nav("/") : setStep(step - 1))}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)}>Próximo <ArrowRight className="h-4 w-4 ml-1" /></Button>
            ) : (
              <Button onClick={() => { sessionStorage.setItem("bicou-sim", JSON.stringify(d)); nav("/simular/resultado"); }}>
                Ver resultado da simulação <CheckCircle2 className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>;
}
function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      <div className="flex gap-1">
        <Button size="sm" variant={value ? "default" : "outline"} onClick={() => onChange(true)}>Sim</Button>
        <Button size="sm" variant={!value ? "default" : "outline"} onClick={() => onChange(false)}>Não</Button>
      </div>
    </div>
  );
}
function SelectRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <Label>{label}</Label>
      <div className="flex gap-1">
        {[["sim", "Sim"], ["nao", "Não"], ["na", "N/A"]].map(([k, l]) => (
          <Button key={k} size="sm" variant={value === k ? "default" : "outline"} onClick={() => onChange(k)}>{l}</Button>
        ))}
      </div>
    </div>
  );
}
