import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import { Bico } from "@/lib/types";
import { cn } from "@/lib/utils";

const steps = ["Aceito", "Check-in", "Em andamento", "Finalizado", "Pago"] as const;

export function PrestadorProgressStepper({ bico }: { bico: Bico }) {
  const currentIndex = getCurrentIndex(bico);

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 items-start gap-1">
        {steps.map((step, index) => {
          const done = index < currentIndex || bico.status === "pago";
          const current = index === currentIndex && bico.status !== "pago";

          return (
            <div key={step} className="min-w-0">
              <div className="flex items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-card",
                    done && "border-success bg-success text-white",
                    current && "border-primary bg-primary text-primary-foreground",
                    !done && !current && "border-border text-muted-foreground",
                  )}
                  aria-current={current ? "step" : undefined}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : current ? <CircleDot className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("h-0.5 flex-1", index < currentIndex ? "bg-success/60" : "bg-border")} />
                )}
              </div>
              <p
                className={cn(
                  "mt-2 break-words pr-1 text-[11px] font-medium leading-tight",
                  done && "text-foreground",
                  current && "text-primary",
                  !done && !current && "text-muted-foreground",
                )}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getCurrentIndex(bico: Bico) {
  if (bico.status === "pago") return 4;
  if (["aguardando_confirmacao", "concluido"].includes(bico.status)) return 3;
  if (bico.status === "em_execucao") return 2;
  if (bico.checkInAt) return 1;
  return 0;
}
