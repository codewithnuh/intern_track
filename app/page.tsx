import { BentoGrid } from "@/components/bento-grid";
import { CTA } from "@/components/cta";
import { DeveloperExperience } from "@/components/developer-experience";
import { GlobalCompliance } from "@/components/global-compliance";
import { Hero } from "@/components/hero";
export default function Page() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <DeveloperExperience />
      <GlobalCompliance />
      <CTA />
    </>
  );
}
