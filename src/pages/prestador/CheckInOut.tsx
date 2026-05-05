import { Link, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { Clock, CheckCircle2, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function CheckInOut() {
  const { id } = useParams();
  const bico = useStore((s) => s.bicos.find((b) => b.id === id));
  const update = useStore((s) => s.updateBico);
  if (!bico) return null;
  const agora = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };
  const checkin = () => { update(bico.id, { checkInAt: agora(), status: "em_execucao" }); toast.success("Check-in registrado"); };
  const checkout = () => { update(bico.id, { checkOutAt: agora(), status: "aguardando_confirmacao" }); toast.success("Check-out registrado"); };
  const total = bico.valorHora * bico.duracaoHoras;

  return (
    <AppShell role="prestador">
      <div className="p-4 md:p-8 max-w-xl mx-auto space-y-4">
        <div>
          <Link to={`/prestador/bico/${id}`} className="text-xs text-muted-foreground">← Voltar</Link>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">Check-in / Check-out</h1>
          <p className="text-muted-foreground text-sm">{bico.titulo} · {bico.empresa}</p>
        </div>

        {!bico.checkInAt && (
          <Card className="p-6 shadow-card text-center">
            <Clock className="h-10 w-10 text-primary mx-auto mb-2" />
            <h3 className="font-bold">Seu bico começa às {bico.horaInicio}</h3>
            <p className="text-sm text-muted-foreground mt-1">Chegue com 10 minutos de antecedência.</p>
            <Button className="w-full mt-4" size="lg" onClick={checkin}>Fazer check-in demo</Button>
          </Card>
        )}

        {bico.checkInAt && !bico.checkOutAt && (
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 text-success font-medium"><CheckCircle2 className="h-5 w-5" /> Check-in realizado às {bico.checkInAt}</div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {bico.bairro} (localização aproximada)</p>
            <p className="text-sm mt-3"><strong>Status:</strong> em execução</p>
            <Button className="w-full mt-4" size="lg" variant="default" onClick={checkout}>Fazer check-out demo</Button>
          </Card>
        )}

        {bico.checkOutAt && (
          <Card className="p-6 shadow-card space-y-2">
            <div className="flex items-center gap-2 text-success font-medium"><CheckCircle2 className="h-5 w-5" /> Check-out realizado às {bico.checkOutAt}</div>
            <p className="text-sm">Total trabalhado: <strong>{bico.duracaoHoras}h</strong></p>
            <p className="text-sm">Valor estimado: <strong>R$ {total},00</strong></p>
            <p className="text-sm text-warning mt-2">⏳ Aguardando confirmação da empresa</p>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
