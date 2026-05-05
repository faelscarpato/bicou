import { AlertTriangle } from "lucide-react";

export function LegalAlert({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 rounded-lg border border-warning/30 bg-warning/5 p-3 text-xs text-foreground/80">
      <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
      <p>{children}</p>
    </div>
  );
}
