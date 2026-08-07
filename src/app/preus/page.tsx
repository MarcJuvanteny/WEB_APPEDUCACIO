import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PlansPage } from "@/components/sections/plans-page";

export default function Preus() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PlansPage />
      </main>
      <Footer />
    </>
  );
}
