import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { prestadores } from "@/lib/mockData";
import { PrestadorCard } from "@/components/PrestadorCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PrestadoresProximos() {
  const { id } = useParams();
  const nav = useNavigate();
  const update = useStore((s) => s.updateBico);
  const [filter, setFilter] = useState("");
  const [maxKm, setMaxKm] = useState(5);

  const list = prestadores.filter(
    (p) => p.distanciaKm <= maxKm && p.nome.toLowerCase().includes(filter.toLowerCase())
  );

  const select = (pid: string) => {
    update(id!, { prestadorConfirmadoId: pid, status: "confirmado" });
    toast.success("Prestador confirmado");
    nav(`/empresa/bico/${id}`);
  };

  return (
    <AppShell role="empresa">
      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Prestadores próximos</h1>
          <p className="text-muted-foreground text-sm">Selecione um prestador para confirmar no bico.</p>
        </div>
        <Card className="p-4 shadow-card flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Buscar prestador..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          </div>
          <div className="flex gap-1">
            {[1, 3, 5, 10].map((k) => (
              <Button key={k} size="sm" variant={maxKm === k ? "default" : "outline"} onClick={() => setMaxKm(k)}>{k} km</Button>
            ))}
          </div>
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {list.map((p) => <PrestadorCard key={p.id} p={p} onSelect={() => select(p.id)} />)}
          {list.length === 0 && <p className="text-sm text-muted-foreground col-span-full text-center py-8">Nenhum prestador no raio selecionado.</p>}
        </div>
      </div>
    </AppShell>
  );
}
