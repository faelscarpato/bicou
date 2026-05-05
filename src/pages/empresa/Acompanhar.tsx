import { Link, useNavigate, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { prestadores } from "@/lib/mockData";
import { Timeline, TimelineStep } from "@/components/Timeline";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function Acompanhar() {
  const { id } = useParams();
  const nav = useNavigate();
  const bico = useStore((s) => s.bicos.find((b) => b.id === id));
  const setStatus = useStore((s) => s.setStatus);
  const update = useStore((s) => s.updateBico);
  if (!bico) return null;
  const p = bico.prestadorConfirmadoId ? prestadores.find((x) => x.id === bico.prestadorConfirmadoId) : null;

  const order = ["publicado", "confirmado", "contrato_aceito", "em_execucao", "aguardando_confirmacao", "concluido", "pago"];
  const idx = order.indexOf(bico.status);
  const steps: TimelineStep[] = [
    { label: "Bico publicado", done: idx >= 0 },
    { label: "Prestador confirmado", done: idx >= 1 },
    { label: "Contrato aceito", done: idx >= 2 },
    { label: "Check-in realizado", done: idx >= 3, meta: bico.checkInAt && `às ${bico.checkInAt}` },
    { label: "Serviço em andamento", done: idx >= 3, current: bico.status === "em_execucao" },
    { label: "Check-out realizado", done: idx >= 4, meta: bico.checkOutAt && `às ${bico.checkOutAt}` },
    { label: "Conclusão confirmada", done: idx >= 5 },
    { label: "Pagamento registrado", done: idx >= 6, meta: bico.pagoAt },
  ];

  const checkin = () => { update(bico.id, { checkInAt: agora(), status: "em_execucao" }); toast.success("Check-in registrado"); };
  const checkout = () => { update(bico.id, { checkOutAt: agora(), status: "aguardando_confirmacao" }); toast.success("Check-out registrado"); };
  const confirmar = () => { setStatus(bico.id, "concluido"); toast.success("Conclusão confirmada"); nav(`/empresa/bico/${bico.id}/pagamento`); };

  return (
    <AppShell role="empresa">
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-4">
        <div>
          <Link to={`/empresa/bico/${id}`} className="text-xs text-muted-foreground">← Voltar</Link>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">Acompanhamento do serviço</h1>
        </div>

        {p && (
          <Card className="p-4 shadow-card flex items-center gap-3">
            <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary/10 text-primary font-semibold">{p.avatar}</AvatarFallback></Avatar>
            <div className="flex-1">
              <p className="font-semibold">{p.nome}</p>
              <p className="text-xs text-muted-foreground">{p.distanciaKm} km · previsto {bico.horaInicio}</p>
            </div>
          </Card>
        )}

        <Card className="p-5 shadow-card">
          <Timeline steps={steps} />
        </Card>

        <Card className="p-5 shadow-card space-y-2">
          <h3 className="font-bold">Ações demo</h3>
          {bico.status === "contrato_aceito" && <Button onClick={checkin}>Simular check-in do prestador</Button>}
          {bico.status === "em_execucao" && <Button onClick={checkout}>Simular check-out do prestador</Button>}
          {bico.status === "aguardando_confirmacao" && <Button onClick={confirmar}>Confirmar conclusão do serviço</Button>}
          {bico.status === "concluido" && <Button asChild><Link to={`/empresa/bico/${bico.id}/pagamento`}>Registrar pagamento</Link></Button>}
        </Card>
      </div>
    </AppShell>
  );
}
function agora() { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }
