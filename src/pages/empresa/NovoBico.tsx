import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categorias } from "@/lib/mockData";
import { useStore } from "@/lib/store";
import { LegalAlert } from "@/components/LegalAlert";
import { toast } from "sonner";

export default function NovoBico() {
  const nav = useNavigate();
  const add = useStore((s) => s.addBico);
  const [f, setF] = useState({
    categoria: categorias[0], titulo: "", descricao: "",
    endereco: "", bairro: "Centro", cidade: "São Paulo",
    data: "Hoje", horaInicio: "14:00", horaFim: "18:00",
    valorHora: 20, vagas: 1,
    requisitos: "", instrucoes: "", responsavel: "", telefone: "",
    esforco: false, material: true, epi: "na",
  });
  const set = (k: string, v: any) => setF((s) => ({ ...s, [k]: v }));
  const dur = calcDur(f.horaInicio, f.horaFim);

  const submit = () => {
    if (!f.titulo) return toast.error("Informe o título do bico");
    const id = "b" + Date.now();
    add({
      id, categoria: f.categoria, titulo: f.titulo, descricao: f.descricao,
      empresa: "Mercado Boa Compra", empresaId: "e1",
      bairro: f.bairro, cidade: f.cidade, endereco: f.endereco,
      data: f.data, horaInicio: f.horaInicio, horaFim: f.horaFim,
      duracaoHoras: dur, valorHora: f.valorHora, vagas: f.vagas,
      distanciaKm: 1.5, status: "publicado",
      requisitos: f.requisitos, esforcoFisico: f.esforco, fornecMaterial: f.material,
      fornecEPI: f.epi as any, responsavel: f.responsavel, telefoneResp: f.telefone,
    });
    toast.success("Bico publicado na demonstração");
    nav(`/empresa/bico/${id}`);
  };

  return (
    <AppShell role="empresa">
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Publicar novo bico</h1>
          <p className="text-muted-foreground text-sm">Descreva uma demanda pontual e específica.</p>
        </div>
        <Card className="p-5 space-y-4 shadow-card">
          <div>
            <Label>Categoria</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
              {categorias.map((c) => (
                <button key={c} type="button" onClick={() => set("categoria", c)}
                  className={`text-left text-sm p-2.5 rounded-lg border-2 ${f.categoria === c ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>{c}</button>
              ))}
            </div>
          </div>
          <div><Label>Título do bico</Label><Input value={f.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder="Ex: Organização de gôndolas" /></div>
          <div><Label>Descrição</Label><Textarea value={f.descricao} onChange={(e) => set("descricao", e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Endereço</Label><Input value={f.endereco} onChange={(e) => set("endereco", e.target.value)} /></div>
            <div><Label>Bairro</Label><Input value={f.bairro} onChange={(e) => set("bairro", e.target.value)} /></div>
            <div><Label>Cidade</Label><Input value={f.cidade} onChange={(e) => set("cidade", e.target.value)} /></div>
            <div><Label>Data</Label><Input value={f.data} onChange={(e) => set("data", e.target.value)} /></div>
            <div><Label>Início</Label><Input type="time" value={f.horaInicio} onChange={(e) => set("horaInicio", e.target.value)} /></div>
            <div><Label>Término</Label><Input type="time" value={f.horaFim} onChange={(e) => set("horaFim", e.target.value)} /></div>
            <div><Label>Valor/hora (R$)</Label><Input type="number" value={f.valorHora} onChange={(e) => set("valorHora", +e.target.value)} /></div>
            <div><Label>Vagas</Label><Input type="number" value={f.vagas} onChange={(e) => set("vagas", +e.target.value)} /></div>
          </div>
          <div className="p-3 rounded-lg bg-muted text-sm">
            Duração calculada: <strong>{dur}h</strong> · Total estimado prestadores: <strong>R$ {(dur * f.valorHora * f.vagas).toFixed(2)}</strong>
          </div>
          <div><Label>Requisitos</Label><Input value={f.requisitos} onChange={(e) => set("requisitos", e.target.value)} /></div>
          <div><Label>Instruções de chegada</Label><Textarea value={f.instrucoes} onChange={(e) => set("instrucoes", e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Responsável no local</Label><Input value={f.responsavel} onChange={(e) => set("responsavel", e.target.value)} /></div>
            <div><Label>Telefone</Label><Input value={f.telefone} onChange={(e) => set("telefone", e.target.value)} /></div>
          </div>
          <LegalAlert>Este bico deve representar uma demanda pontual e específica. Para uso real, valide regras trabalhistas, fiscais e contratuais com profissionais habilitados.</LegalAlert>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => nav(-1)}>Cancelar</Button>
            <Button onClick={submit}>Publicar bico demo</Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function calcDur(a: string, b: string) {
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  return Math.max(0, ((bh * 60 + bm) - (ah * 60 + am)) / 60);
}
