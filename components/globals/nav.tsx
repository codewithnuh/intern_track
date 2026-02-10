import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-charcoal/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight">
            Intern-track
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-400">
          {["Features", "Solutions", "Developers", "Pricing"].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex">
            <Link href={"/log-in"}> Log In</Link>
          </Button>
          <Button variant="secondary" size="lg">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};
