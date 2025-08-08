import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, BarChart3, MessageCircle } from "lucide-react";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Caso de uso 1 */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="text-primary" /> Coleta fácil de feedbacks
          </CardTitle>
          <CardDescription>
            Receba opiniões dos clientes via QR Code, tablet no balcão ou link
            direto.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Caso de uso 2 */}
      <Card className="absolute right-[20px] top-4 w-80 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-primary" /> Análise inteligente
          </CardTitle>
          <CardDescription>
            Nossa IA identifica padrões, pontos fortes e oportunidades de
            melhoria.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Caso de uso 3 */}
      <Card className="absolute top-[150px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="text-primary" /> Relatórios no WhatsApp
          </CardTitle>
          <CardDescription>
            Receba insights diários direto no seu WhatsApp, prontos para ação.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
