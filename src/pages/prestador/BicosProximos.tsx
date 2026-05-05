import { useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";
import { BicoCard } from "@/components/BicoCard";
import { BicosAdvancedFilters } from "@/components/prestador/BicosAdvancedFilters";
import { filtrarEOrdenarBicos, getCategoriasDisponiveis } from "@/lib/bicoFilters";

export default function BicosProximos() {
  const bicos = useStore((s) => s.bicos);
  const filters = useStore((s) => s.prestadorBicosFiltros);
  const setFilters = useStore((s) => s.setPrestadorBicosFiltros);
  const resetFilters = useStore((s) => s.resetPrestadorBicosFiltros);
  const categorias = useMemo(() => getCategoriasDisponiveis(bicos), [bicos]);
  const list = useMemo(() => filtrarEOrdenarBicos(bicos, filters), [bicos, filters]);

  return (
    <AppShell role="prestador">
      <div className="p-4 md:p-8 space-y-4 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Bicos próximos</h1>
          <p className="text-muted-foreground text-sm">Filtre por categoria, data, valor/hora e ordene por prioridade.</p>
        </div>
        <BicosAdvancedFilters
          bicos={bicos}
          categorias={categorias}
          filters={filters}
          onChange={setFilters}
          onReset={resetFilters}
          totalFiltrado={list.length}
        />
        <div className="grid md:grid-cols-2 gap-3">
          {list.map((b) => <BicoCard key={b.id} bico={b} baseUrl="/prestador/bico" />)}
          {list.length === 0 && <p className="text-sm text-muted-foreground">Nenhum bico encontrado com estes filtros.</p>}
        </div>
      </div>
    </AppShell>
  );
}
