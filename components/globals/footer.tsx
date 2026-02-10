import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
              <span className="text-xl font-black">Intern-track</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs mb-10 leading-relaxed">
              The world's leading platform for intern management and performance
              tracking. Professional tools for the next generation of talent.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:border-primary/50 cursor-pointer transition-all"
                >
                  <div className="w-4 h-4 bg-slate-500 rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Product
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Enterprise
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Company
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold mb-8 text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Newsletter
            </h4>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Get the latest on HR tech.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm w-full focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
              />
              <button className="bg-primary hover:brightness-110 w-12 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-primary/20">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            © 2024 Intern-track Inc. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
