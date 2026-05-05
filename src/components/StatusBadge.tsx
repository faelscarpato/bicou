import { BicoStatus, STATUS_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

const variants: Record<BicoStatus, string> = {
  publicado: "bg-info/10 text-info border-info/20",
  aguardando: "bg-warning/10 text-warning border-warning/20",
  confirmado: "bg-primary/10 text-primary border-primary/20",
  contrato_aceito: "bg-primary/15 text-primary border-primary/30",
  em_execucao: "bg-info/15 text-info border-info/30",
  aguardando_confirmacao: "bg-warning/15 text-warning border-warning/30",
  concluido: "bg-success/10 text-success border-success/20",
  pago: "bg-success/15 text-success border-success/30",
};

export function StatusBadge({ status }: { status: BicoStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", variants[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABELS[status]}
    </span>
  );
}
