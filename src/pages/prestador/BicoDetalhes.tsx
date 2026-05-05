import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "@/lib/store";
import { StatusBadge } from "@/components/StatusBadge";
import { Calendar, Clock, MapPin, Wallet, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { PRESTADOR_DEMO_ID } from "@/lib/mockData";

export default function BicoDetalhesPrestador() {
  const { id } = useParams();
  const nav = useNavigate();
  const bico = useStore((s) => s.bicos.find((b) => b.id === id));
  const update = useStore((s) => s.updateBico);
  const fav = useStore((s) => s.favoritos.includes(id || ""));
  const toggleFav = useStore((s) => s.toggleFavorito);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  if (!bico) return null;
  const total = bico.valorHora * bico.duracaoHoras;

  const aceitar = () => {
    update(bico.id, { prestadorConfirmadoId: PRESTADOR_DEMO_ID, status: "contrato_aceito" });
    toast.success("Bico aceito");
    setOpen(false);
    nav(`/prestador/bico/${bico.id}/checkin`);
  };

  return (
    <AppShell role="prestador">
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-4">
        <div>
          <Link to="/prestador" className="text-xs text-muted-foreground">← Voltar</Link>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">{bico.titulo}</h1>
          <p className="text-muted-foreground">{bico.empresa}</p>
          <div className="mt-2"><StatusBadge status={bico.status} /></div>
        </div>
        <Card className="p-5 shadow-card grid md:grid-cols-2 gap-3 text-sm">
          <Info icon={Calendar} v={bico.data} />
          <Info icon={Clock} v={`${bico.horaInicio} - ${bico.horaFim}`} />
          <Info icon={MapPin} v={`${bico.bairro} · ${bico.distanciaKm} km`} />
          <Info icon={Wallet} v={`R$ ${bico.valorHora}/h · Total R$ ${total}`} />
        </Card>
        {bico.descricao && <Card className="p-5 shadow-card"><h3 className="font-semibold mb-1">Descrição</h3><p className="text-sm text-muted-foreground">{bico.descricao}</p></Card>}
        {bico.requisitos && <Card className="p-5 shadow-card"><h3 className="font-semibold mb-1">Requisitos</h3><p className="text-sm text-muted-foreground">{bico.requisitos}</p></Card>}
        <Card className="p-5 shadow-card text-sm space-y-1">
          <p><strong>Esforço físico:</strong> {bico.esforcoFisico ? "Sim" : "Não"}</p>
          <p><strong>Material:</strong> {bico.fornecMaterial ? "Empresa fornece" : "Prestador deve trazer"}</p>
          <p><strong>EPI:</strong> {bico.fornecEPI === "sim" ? "Empresa fornece" : bico.fornecEPI === "nao" ? "Não" : "Não se aplica"}</p>
          {bico.responsavel && <p><strong>Responsável no local:</strong> {bico.responsavel}</p>}
        </Card>
        <div className="flex gap-2 sticky bottom-20 md:bottom-0">
          <Button className="flex-1" size="lg" onClick={() => setOpen(true)} disabled={!["publicado", "aguardando"].includes(bico.status)}>Aceitar bico</Button>
          <Button size="lg" variant="outline" onClick={() => { toggleFav(bico.id); toast.success(fav ? "Removido dos favoritos" : "Salvo para ver depois"); }}>
            {fav ? "★ Salvo" : "☆ Salvar"}
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirmar aceite</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Antes de aceitar, confirme que você leu as condições do serviço.</p>
          <label className="flex gap-2 items-start cursor-pointer">
            <Checkbox checked={confirm} onCheckedChange={(c) => setConfirm(!!c)} />
            <span className="text-sm">Li e aceito as condições deste bico demonstrativo.</span>
          </label>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button disabled={!confirm} onClick={aceitar}><CheckCircle2 className="h-4 w-4 mr-1" />Confirmar aceite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
function Info({ icon: I, v }: any) { return <div className="flex items-center gap-2"><I className="h-4 w-4 text-primary" /><span>{v}</span></div>; }
