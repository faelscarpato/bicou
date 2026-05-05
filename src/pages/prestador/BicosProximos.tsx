import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";
import { BicoCard } from "@/components/BicoCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BicosProximos() {
  const bicos = useStore((s) => s.bicos);
  const [raio, setRaio] = useState(5);
  const list = bicos.filter((b) => b.distanciaKm <= raio);
  return (
    <AppShell role="prestador">
      <div className="p-4 md:p-8 space-y-4 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Bicos próximos</h1>
          <p className="text-muted-foreground text-sm">Filtre por raio para encontrar oportunidades</p>
        </div>
        <Card className="p-4 shadow-card flex flex-wrap gap-2">
          <span className="text-sm font-semibold mr-2 self-center">Raio:</span>
          {[1, 3, 5, 10].map((k) => (
            <Button key={k} size="sm" variant={raio === k ? "default" : "outline"} onClick={() => setRaio(k)}>{k} km</Button>
          ))}
        </Card>
        <div className="grid md:grid-cols-2 gap-3">
          {list.map((b) => <BicoCard key={b.id} bico={b} baseUrl="/prestador/bico" />)}
        </div>
      </div>
    </AppShell>
  );
}
