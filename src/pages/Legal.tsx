import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function Legal() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm">B</div>
            <span className="font-bold">Bicou</span>
          </Link>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold">Termos, privacidade e aviso legal demonstrativo</h1>
        <Card className="p-6 shadow-card space-y-2">
          <h2 className="font-bold text-lg">1. Termos de uso demonstrativos</h2>
          <p className="text-sm text-muted-foreground">O Bicou é uma plataforma de intermediação de serviços pontuais em fase de protótipo. Toda interação aqui é demonstrativa, com dados fictícios, sem efeitos contratuais ou financeiros reais.</p>
        </Card>
        <Card className="p-6 shadow-card space-y-2">
          <h2 className="font-bold text-lg">2. Privacidade demonstrativa</h2>
          <p className="text-sm text-muted-foreground">Dados fictícios são usados neste protótipo. Uma versão real deve contar com política de privacidade adequada, segurança de dados e conformidade com a LGPD, incluindo bases legais, retenção, direitos do titular e canais de atendimento.</p>
        </Card>
        <Card className="p-6 shadow-card space-y-2">
          <h2 className="font-bold text-lg">3. Aviso jurídico</h2>
          <p className="text-sm text-muted-foreground">Este protótipo não representa parecer jurídico, trabalhista, fiscal ou contábil. A operação real de uma plataforma como o Bicou deve ser validada por advogado, contador e especialistas habilitados, principalmente em relação à prestação de serviço, emissão fiscal, pagamento, proteção de dados, segurança do trabalho e riscos de vínculo empregatício.</p>
        </Card>
      </div>
    </div>
  );
}
