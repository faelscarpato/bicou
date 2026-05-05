import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, RotateCcw, SlidersHorizontal } from "lucide-react";
import { BicosFiltersState, fromDateISO, getValorHoraRange, OrdenacaoBicos, toDateISO } from "@/lib/bicoFilters";
import { Bico } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface BicosAdvancedFiltersProps {
  bicos: Bico[];
  categorias: string[];
  filters: BicosFiltersState;
  onChange: (patch: Partial<BicosFiltersState>) => void;
  onReset: () => void;
  totalFiltrado: number;
}

const ordenacaoOptions: { value: OrdenacaoBicos; label: string }[] = [
  { value: "publicacao", label: "Mais recentes" },
  { value: "proximidade", label: "Mais próximos" },
  { value: "valor", label: "Maior valor/hora" },
  { value: "data", label: "Data mais próxima" },
];

export function BicosAdvancedFilters({
  bicos,
  categorias,
  filters,
  onChange,
  onReset,
  totalFiltrado,
}: BicosAdvancedFiltersProps) {
  const valorRange = getValorHoraRange(bicos);
  const selectedDate = fromDateISO(filters.dataISO);
  const hasFilters =
    filters.categorias.length > 0 ||
    Boolean(filters.dataISO) ||
    filters.valorHora[0] !== 0 ||
    filters.valorHora[1] !== 100 ||
    filters.ordenarPor !== "publicacao";

  const toggleCategoria = (categoria: string, checked: boolean) => {
    onChange({
      categorias: checked
        ? [...filters.categorias, categoria]
        : filters.categorias.filter((item) => item !== categoria),
    });
  };

  return (
    <Card className="p-4 shadow-card">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-base font-bold">
              <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
              Filtros avançados
            </h2>
            <p className="text-sm text-muted-foreground">{totalFiltrado} bico(s) encontrado(s)</p>
          </div>
          <Button variant="outline" size="sm" onClick={onReset} disabled={!hasFilters} aria-label="Limpar filtros de bicos">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Limpar
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <section aria-labelledby="categoria-filter-title">
            <p id="categoria-filter-title" className="mb-3 text-sm font-semibold">
              Categoria
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {categorias.map((categoria) => {
                const id = `categoria-${slugify(categoria)}`;
                return (
                  <div key={categoria} className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
                    <Checkbox
                      id={id}
                      checked={filters.categorias.includes(categoria)}
                      onCheckedChange={(checked) => toggleCategoria(categoria, Boolean(checked))}
                      aria-label={`Filtrar categoria ${categoria}`}
                    />
                    <Label htmlFor={id} className="cursor-pointer text-sm leading-snug">
                      {categoria}
                    </Label>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4" aria-labelledby="data-valor-filter-title">
            <div>
              <p id="data-valor-filter-title" className="mb-2 text-sm font-semibold">
                Data
              </p>
              <div className="flex flex-wrap gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
                      aria-label="Selecionar data do bico"
                    >
                      <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                      {selectedDate ? format(selectedDate, "dd 'de' MMMM", { locale: ptBR }) : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => onChange({ dataISO: date ? toDateISO(date) : undefined })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {selectedDate && (
                  <Button variant="ghost" size="sm" onClick={() => onChange({ dataISO: undefined })}>
                    Remover data
                  </Button>
                )}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <Label htmlFor="valor-hora-slider">Faixa de valor/hora</Label>
                <span className="text-sm font-medium text-primary">
                  R$ {filters.valorHora[0]} - R$ {filters.valorHora[1]}
                </span>
              </div>
              <Slider
                id="valor-hora-slider"
                min={valorRange[0]}
                max={valorRange[1]}
                step={1}
                value={filters.valorHora}
                onValueChange={(value) => onChange({ valorHora: [value[0], value[1]] })}
                aria-label="Faixa de valor por hora"
              />
            </div>
          </section>
        </div>

        <div className="grid gap-2 md:max-w-xs">
          <Label htmlFor="ordenar-bicos">Ordenar por</Label>
          <Select value={filters.ordenarPor} onValueChange={(value) => onChange({ ordenarPor: value as OrdenacaoBicos })}>
            <SelectTrigger id="ordenar-bicos" aria-label="Ordenar bicos">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              {ordenacaoOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();
}
