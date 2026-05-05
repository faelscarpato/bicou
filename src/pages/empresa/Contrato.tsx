import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "@/lib/store";
import { LegalAlert } from "@/components/LegalAlert";
import { toast } from "sonner";

export default function Contrato() {
  const { id } = useParams();
  const nav = useNavigate();
  const bico = useStore((s) => s.bicos.find((b) => b.id === id));
  const setStatus = useStore((s) => s.setStatus);
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);
  if (!bico) return null;
  const all = c1 && c2 && c3;

  const aceitar = () => {
    setStatus(bico.id, "contrato_aceito");
    toast.success("Contrato demo aceito");
    nav(`/empresa/bico/${bico.id}/acompanhar`);
  };

  return (
    <AppShell role="empresa">
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-4">
        <div>
          <Link to={`/empresa/bico/${id}`} className="text-xs text-muted-foreground">← Voltar</Link>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">Termo demonstrativo de prestação de serviço pontual</h1>
        </div>
        <Card className="p-6 shadow-card space-y-3 text-sm">
          <Section t="Serviço"><p>{bico.titulo} · {bico.categoria}</p></Section>
          <Section t="Data e horário"><p>{bico.data}, das {bico.horaInicio} às {bico.horaFim}</p></Section>
          <Section t="Local"><p>{bico.bairro}, {bico.cidade}</p></Section>
          <Section t="Valor"><p>R$ {bico.valorHora}/hora · duração estimada {bico.duracaoHoras}h</p></Section>
          <Section t="Responsabilidades da empresa"><p>Fornecer instruções claras, ambiente seguro e materiais necessários.</p></Section>
          <Section t="Responsabilidades do prestador"><p>Comparecer no horário, executar o serviço descrito e registrar check-in/out.</p></Section>
          <Section t="Política de cancelamento"><p>Cancelamentos devem ser feitos com no mínimo 2 horas de antecedência (regra demonstrativa).</p></Section>
          <Section t="Natureza demonstrativa"><p>Este termo é uma simulação de serviço pontual. Não substitui contrato real e não estabelece vínculo trabalhista.</p></Section>
        </Card>
        <Card className="p-5 shadow-card space-y-3">
          <Check id="c1" v={c1} setV={setC1}>A empresa declara que as informações do bico estão corretas.</Check>
          <Check id="c2" v={c2} setV={setC2}>O prestador declara que leu as condições do serviço.</Check>
          <Check id="c3" v={c3} setV={setC3}>Ambos entendem que este é um protótipo demonstrativo.</Check>
        </Card>
        <LegalAlert>A operação real exige validação jurídica, fiscal e trabalhista por profissionais habilitados.</LegalAlert>
        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline" disabled={!all} onClick={aceitar}>Aceitar como prestador</Button>
          <Button disabled={!all} onClick={aceitar}>Aceitar contrato demo como empresa</Button>
        </div>
      </div>
    </AppShell>
  );
}
function Section({ t, children }: any) {
  return <div><p className="font-semibold text-foreground">{t}</p><div className="text-muted-foreground">{children}</div></div>;
}
function Check({ id, v, setV, children }: any) {
  return <label htmlFor={id} className="flex gap-2 items-start cursor-pointer"><Checkbox id={id} checked={v} onCheckedChange={(c) => setV(!!c)} /><span className="text-sm">{children}</span></label>;
}
