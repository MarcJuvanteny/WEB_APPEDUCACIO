import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { ScrollytellingReport } from "@/components/sections/scrollytelling-report";
import { Features } from "@/components/sections/features";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { ComingSoon } from "@/components/sections/coming-soon";
import { FinalCta } from "@/components/sections/final-cta";
import { ContactForm } from "@/components/sections/contact-form";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ScrollytellingReport />
        <Features />
        <Pricing />
        <Testimonials />
        <ComingSoon />
        <FinalCta />
        <ContactForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
