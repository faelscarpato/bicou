import { AppShell } from "@/components/AppShell";
import { MetricCard } from "@/components/MetricCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PRESTADOR_DEMO_ID, prestadores } from "@/lib/mockData";
import { Award, CalendarCheck2, MapPin, ShieldCheck, Star, UserRound } from "lucide-react";

export default function PerfilPrestador() {
  const prestador = prestadores.find((p) => p.id === PRESTADOR_DEMO_ID) ?? prestadores[0];

  return (
    <AppShell role="prestador">
      <div className="mx-auto max-w-4xl space-y-5 p-4 md:p-8">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Perfil do prestador</h1>
          <p className="text-sm text-muted-foreground">Dados demonstrativos usados no fluxo do prestador.</p>
        </div>

        <Card className="p-5 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">{prestador.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{prestador.nome}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {prestador.bairro} · {prestador.distanciaKm} km da empresa demo
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{prestador.bio}</p>
            </div>
            <Button variant="outline">
              <UserRound className="h-4 w-4" />
              Editar demo
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <MetricCard label="Avaliação" value={prestador.avaliacao.toFixed(1).replace(".", ",")} icon={Star} />
          <MetricCard label="Serviços" value={prestador.servicosConcluidos} icon={CalendarCheck2} />
          <MetricCard label="Comparecimento" value={`${prestador.taxaComparecimento}%`} icon={ShieldCheck} />
          <MetricCard label="Selo demo" value="Verificado" icon={Award} />
        </div>

        <Card className="p-5 shadow-card">
          <h3 className="font-bold">Experiências</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {prestador.experiencias.map((experiencia) => (
              <span key={experiencia} className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
                {experiencia}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
