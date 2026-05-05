import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";
import Landing from "./pages/Landing";
import Simulador from "./pages/Simulador";
import ResultadoSimulacao from "./pages/ResultadoSimulacao";
import Legal from "./pages/Legal";
import Admin from "./pages/Admin";
import EmpresaDashboard from "./pages/empresa/Dashboard";
import NovoBico from "./pages/empresa/NovoBico";
import BicoDetalhes from "./pages/empresa/BicoDetalhes";
import PrestadoresProximos from "./pages/empresa/PrestadoresProximos";
import Contrato from "./pages/empresa/Contrato";
import Acompanhar from "./pages/empresa/Acompanhar";
import Pagamento from "./pages/empresa/Pagamento";
import PrestadorDashboard from "./pages/prestador/Dashboard";
import BicosProximos from "./pages/prestador/BicosProximos";
import BicoDetalhesPrestador from "./pages/prestador/BicoDetalhes";
import CheckInOut from "./pages/prestador/CheckInOut";
import Historico from "./pages/prestador/Historico";
import PerfilPrestador from "./pages/prestador/Perfil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/simular" element={<Simulador />} />
          <Route path="/simular/resultado" element={<ResultadoSimulacao />} />
          <Route path="/legal" element={<Legal />} />

          <Route path="/empresa" element={<EmpresaDashboard />} />
          <Route path="/empresa/novo" element={<NovoBico />} />
          <Route path="/empresa/bico/:id" element={<BicoDetalhes />} />
          <Route path="/empresa/bico/:id/prestadores" element={<PrestadoresProximos />} />
          <Route path="/empresa/bico/:id/contrato" element={<Contrato />} />
          <Route path="/empresa/bico/:id/acompanhar" element={<Acompanhar />} />
          <Route path="/empresa/bico/:id/pagamento" element={<Pagamento />} />

          <Route path="/prestador" element={<PrestadorDashboard />} />
          <Route path="/prestador/bicos" element={<BicosProximos />} />
          <Route path="/prestador/bico/:id" element={<BicoDetalhesPrestador />} />
          <Route path="/prestador/bico/:id/checkin" element={<CheckInOut />} />
          <Route path="/prestador/historico" element={<Historico />} />
          <Route path="/prestador/perfil" element={<PerfilPrestador />} />

          <Route path="/admin" element={<Admin />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
