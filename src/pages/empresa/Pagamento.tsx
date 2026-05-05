import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
import { prestadores } from "@/lib/mockData";
import { CheckCircle2, Star } from "lucide-react";
import { LegalAlert } from "@/components/LegalAlert";
import { toast } from "sonner";

export default function Pagamento() {
  const { id } = useParams();
  const nav = useNavigate();
  const bico = useStore((s) => s.bicos.find((b) => b.id === id));
  const update = useStore((s) => s.updateBico);
  const [pago, setPago] = useState(bico?.status === "pago");
  const [stars, setStars] = useState({ pontualidade: 5, qualidade: 5, comunicacao: 5 });
  const [coment, setComent] = useState("");
  if (!bico) return null;
  const p = bico.prestadorConfirmadoId ? prestadores.find((x) => x.id === bico.prestadorConfirmadoId) : null;
  const total = bico.valorHora * bico.duracaoHoras;
  const taxa = total * 0.1;

  const registrar = () => {
    update(bico.id, { status: "pago", pagoAt: new Date().toLocaleString("pt-BR") });
    setPago(true);
    toast.success("Pagamento simulado registrado");
  };
  const enviarAvaliacao = () => {
    update(bico.id, { avaliacao: { ...stars, comentario: coment } });
    toast.success("Avaliação registrada");
    nav("/empresa");
  };

  return (
    <AppShell role="empresa">
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-4">
        <div>
          <Link to={`/empresa/bico/${id}`} className="text-xs text-muted-foreground">← Voltar</Link>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">Pagamento simulado</h1>
        </div>
        <Card className="p-5 shadow-card space-y-2 text-sm">
          <Row k="Prestador" v={p?.nome || "—"} />
          <Row k="Serviço" v={bico.titulo} />
          <Row k="Horas trabalhadas" v={`${bico.duracaoHoras}h`} />
          <Row k="Valor por hora" v={`R$ ${bico.valorHora}`} />
          <Row k="Total do prestador" v={`R$ ${total.toFixed(2)}`} />
          <Row k="Taxa Bicou (10%)" v={`R$ ${taxa.toFixed(2)}`} />
          <div className="border-t pt-2 mt-2 flex justify-between"><span className="font-semibold">Total da empresa</span><span className="text-primary text-lg font-bold">R$ {(total + taxa).toFixed(2)}</span></div>
          <p className="text-xs text-muted-foreground">Forma: Pix simulado</p>
        </Card>

        {!pago ? (
          <>
            <LegalAlert>Em uma operação real, o pagamento poderia ser processado por parceiro financeiro autorizado.</LegalAlert>
            <Button className="w-full" onClick={registrar}>Registrar pagamento simulado</Button>
          </>
        ) : (
          <>
            <Card className="p-5 shadow-card text-center bg-success/5 border-success/20">
              <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-2" />
              <h3 className="font-bold">Pagamento registrado na demonstração</h3>
              <p className="text-sm text-muted-foreground mt-1">Em uma operação real, o pagamento poderia ser processado por parceiro financeiro autorizado.</p>
            </Card>
            <Card className="p-5 shadow-card space-y-3">
              <h3 className="font-bold">Avaliar prestador</h3>
              {(["pontualidade", "qualidade", "comunicacao"] as const).map((k) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{k}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setStars({ ...stars, [k]: n })}>
                        <Star className={`h-5 w-5 ${n <= stars[k] ? "fill-warning text-warning" : "text-muted-foreground/40"}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <Textarea placeholder="Comentário (opcional)" value={coment} onChange={(e) => setComent(e.target.value)} />
              <Button className="w-full" onClick={enviarAvaliacao}>Enviar avaliação</Button>
            </Card>
          </>
        )}
      </div>
    </AppShell>
  );
}
function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>;
}
