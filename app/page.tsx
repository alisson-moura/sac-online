import { Navbar } from "@/components/landpage/navbar";
import { Hero } from "@/components/landpage/hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center">
        <Hero />
      </div>
    </>
  );
}
