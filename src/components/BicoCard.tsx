import { Bico } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function BicoCard({ bico, baseUrl }: { bico: Bico; baseUrl: string }) {
  const total = bico.valorHora * bico.duracaoHoras;
  return (
    <Card className="p-4 shadow-card hover:shadow-elegant transition-shadow border-border/60">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground truncate">{bico.titulo}</h3>
            <StatusBadge status={bico.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{bico.empresa}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">R$ {bico.valorHora}</p>
          <p className="text-xs text-muted-foreground">/hora</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{bico.data}</div>
        <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{bico.horaInicio} - {bico.horaFim}</div>
        <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{bico.bairro} · {bico.distanciaKm} km</div>
        <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{bico.vagas} vaga(s)</div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <span className="text-sm"><span className="text-muted-foreground">Total: </span><strong>R$ {total},00</strong></span>
        <Button size="sm" asChild>
          <Link to={`${baseUrl}/${bico.id}`}>Ver detalhes</Link>
        </Button>
      </div>
    </Card>
  );
}
