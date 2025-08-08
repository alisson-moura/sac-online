import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button";
import { HeroCards } from "./hero-cards";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 py-20 md:py-20 gap-4">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              Sac App
            </span>{" "}
            transforma
          </h1>{" "}
          feedbacks em{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-transparent bg-clip-text">
              decisões inteligentes
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Colete, analise e receba insights valiosos sobre seus clientes de
          forma simples, com relatórios enviados direto no seu WhatsApp.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">Começar agora</Button>

          <a
            rel="noreferrer noopener"
            href="#demo"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Ver demonstração
          </a>
        </div>
      </div>

      {/* Hero cards */}
      <div className="z-10 ml-auto">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
