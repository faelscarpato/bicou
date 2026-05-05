import { Link, useNavigate, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { StatusBadge } from "@/components/StatusBadge";
import { prestadores } from "@/lib/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Phone, User, Wallet, ArrowRight } from "lucide-react";
import { LegalAlert } from "@/components/LegalAlert";
import { toast } from "sonner";

export default function BicoDetalhes() {
  const { id } = useParams();
  const nav = useNavigate();
  const bico = useStore((s) => s.bicos.find((b) => b.id === id));
  const setStatus = useStore((s) => s.setStatus);
  const update = useStore((s) => s.updateBico);
  if (!bico) return <AppShell role="empresa"><div className="p-8">Bico não encontrado</div></AppShell>;
  const prestador = bico.prestadorConfirmadoId ? prestadores.find((p) => p.id === bico.prestadorConfirmadoId) : null;
  const total = bico.valorHora * bico.duracaoHoras;

  return (
    <AppShell role="empresa">
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <Link to="/empresa" className="text-xs text-muted-foreground hover:text-foreground">← Voltar ao painel</Link>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{bico.titulo}</h1>
            <div className="mt-2"><StatusBadge status={bico.status} /></div>
          </div>
        </div>

        <Card className="p-5 shadow-card grid md:grid-cols-2 gap-3">
          <Info icon={Calendar} k="Data" v={bico.data} />
          <Info icon={Clock} k="Horário" v={`${bico.horaInicio} - ${bico.horaFim} (${bico.duracaoHoras}h)`} />
          <Info icon={MapPin} k="Local" v={`${bico.bairro}, ${bico.cidade}`} />
          <Info icon={Wallet} k="Valor" v={`R$ ${bico.valorHora}/h · Total R$ ${total}`} />
          {bico.responsavel && <Info icon={User} k="Responsável" v={bico.responsavel} />}
          {bico.telefoneResp && <Info icon={Phone} k="Telefone" v={bico.telefoneResp} />}
        </Card>

        {bico.descricao && (
          <Card className="p-5 shadow-card">
            <h3 className="font-bold mb-2">Descrição</h3>
            <p className="text-sm text-muted-foreground">{bico.descricao}</p>
          </Card>
        )}

        {prestador && (
          <Card className="p-5 shadow-card">
            <h3 className="font-bold mb-3">Prestador confirmado</h3>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary/10 text-primary font-semibold">{prestador.avatar}</AvatarFallback></Avatar>
              <div className="flex-1">
                <p className="font-semibold">{prestador.nome}</p>
                <p className="text-xs text-muted-foreground">{prestador.bairro} · {prestador.distanciaKm} km · ⭐ {prestador.avaliacao}</p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-5 shadow-card space-y-2">
          <h3 className="font-bold">Próximas ações</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {(bico.status === "publicado" || bico.status === "aguardando") && (
              <Button asChild><Link to={`/empresa/bico/${bico.id}/prestadores`}>Ver prestadores próximos</Link></Button>
            )}
            {bico.status === "confirmado" && (
              <Button asChild><Link to={`/empresa/bico/${bico.id}/contrato`}>Enviar contrato demo</Link></Button>
            )}
            {(bico.status === "contrato_aceito" || bico.status === "em_execucao" || bico.status === "aguardando_confirmacao") && (
              <Button asChild><Link to={`/empresa/bico/${bico.id}/acompanhar`}>Acompanhar execução</Link></Button>
            )}
            {bico.status === "aguardando_confirmacao" && (
              <Button onClick={() => { setStatus(bico.id, "concluido"); toast.success("Conclusão confirmada"); }}>Confirmar conclusão</Button>
            )}
            {bico.status === "concluido" && (
              <Button asChild><Link to={`/empresa/bico/${bico.id}/pagamento`}>Registrar pagamento simulado <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
            )}
            {bico.status === "pago" && <p className="text-sm text-success font-medium">✓ Bico pago demo · {bico.pagoAt}</p>}
          </div>
        </Card>

        <LegalAlert>Em uma operação real, esta etapa exigiria integração com parceiro financeiro, validações de identidade e validação jurídica.</LegalAlert>
      </div>
    </AppShell>
  );
}
function Info({ icon: I, k, v }: any) {
  return <div className="flex items-center gap-2 text-sm"><I className="h-4 w-4 text-primary" /><span className="text-muted-foreground">{k}:</span><span className="font-medium">{v}</span></div>;
}
