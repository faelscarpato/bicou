import { Prestador } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function PrestadorCard({ p, onSelect, action = "Confirmar" }: { p: Prestador; onSelect?: () => void; action?: string }) {
  return (
    <Card className="p-4 shadow-card border-border/60">
      <div className="flex gap-3">
        <Avatar className="h-12 w-12 bg-primary/10 text-primary">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">{p.avatar}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold">{p.nome}</h4>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span className="font-medium">{p.avaliacao}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3" /> {p.bairro} · {p.distanciaKm} km
          </p>
          <p className="text-xs text-muted-foreground mt-1">Experiência: {p.experiencias.join(", ")}</p>
          <div className="mt-2 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-success"><CheckCircle2 className="h-3 w-3" />{p.servicosConcluidos} serviços</span>
            <span className="text-muted-foreground">{p.taxaComparecimento}% comparecimento</span>
          </div>
        </div>
      </div>
      {onSelect && (
        <Button size="sm" className="mt-3 w-full" onClick={onSelect} disabled={!p.disponivel}>
          {p.disponivel ? action : "Indisponível"}
        </Button>
      )}
    </Card>
  );
}
