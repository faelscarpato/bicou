import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineStep { label: string; done: boolean; current?: boolean; meta?: string }

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            {s.done ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className={cn("h-5 w-5", s.current ? "text-primary" : "text-muted-foreground/40")} />}
            {i < steps.length - 1 && <div className={cn("w-0.5 flex-1 mt-1", s.done ? "bg-success/40" : "bg-border")} />}
          </div>
          <div className="pb-4">
            <p className={cn("text-sm font-medium", s.done ? "text-foreground" : s.current ? "text-primary" : "text-muted-foreground")}>{s.label}</p>
            {s.meta && <p className="text-xs text-muted-foreground mt-0.5">{s.meta}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
