import { Button } from "./ui/button";

export const CTA = () => {
  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="relative p-16 md:p-24 rounded-[3rem] bg-gradient-to-br from-primary via-blue-700 to-indigo-900 overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 grid-pattern opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-white/5 blur-3xl rounded-full"></div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 relative z-10 leading-tight">
            Ready to modernize your
            <br />
            intern program?
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Button
              variant={"outline"}
              size="lg"
              className="px-12 py-5 text-xl font-black"
            >
              Get Started for Free
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="px-12 py-5 text-xl backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/20"
            >
              Talk to Sales
            </Button>
          </div>

          {/* Decorative shapes */}
          <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white/10 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
