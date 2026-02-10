import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40"></div>
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="mb-8">
          <Badge className="bg-primary/20 p-4 space-x-2">
            <span className="w-2 h-2 bg-primary animate-pulse rounded-full" />
            <p> Now scaling for enterprise</p>
          </Badge>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Seamless{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
            Intern Lifecycle
          </span>
          <br />
          Management
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-12 leading-relaxed">
          The B2B SaaS platform engineered for stability. Track projects,
          attendance, and performance with role-based precision on a
          TypeScript-first foundation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg">Book a Demo</Button>
          <Button variant="secondary" size="lg">
            Start Free Trial
          </Button>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-10">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
            <img
              src="https://picsum.photos/id/1/100/30"
              alt="Partner"
              className="h-6 filter invert"
            />
            <img
              src="https://picsum.photos/id/2/100/30"
              alt="Partner"
              className="h-6 filter invert"
            />
            <img
              src="https://picsum.photos/id/3/100/30"
              alt="Partner"
              className="h-6 filter invert"
            />
            <img
              src="https://picsum.photos/id/4/100/30"
              alt="Partner"
              className="h-6 filter invert"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
