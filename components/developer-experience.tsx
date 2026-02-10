import React from "react";
import { Badge } from "./ui/badge";

export const DeveloperExperience: React.FC = () => {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <Badge>Builder First</Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-6 mb-8 leading-tight">
              Built by developers,
              <br />
              for developers.
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Intern-track is built on a rock-solid foundation of{" "}
              <span className="text-white font-bold">TypeScript</span> and{" "}
              <span className="text-white font-bold">Next.js</span>. We expose a
              powerful API that lets you integrate with your existing HR stack
              seamlessly.
            </p>

            <ul className="space-y-6 mb-10">
              {[
                {
                  icon: "terminal",
                  label: "Robust REST & GraphQL API Endpoints",
                },
                {
                  icon: "data_object",
                  label: "Type-safe SDKs for React & Vue",
                },
                { icon: "webhook", label: "Custom Webhook Notifications" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-300">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline group"
            >
              Explore Documentation
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
            </a>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-[#0f141d] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
              <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
                </div>
                <span className="ml-4 text-[10px] font-mono text-slate-500 tracking-wider">
                  src/api/intern-stats.ts
                </span>
              </div>
              <div className="p-8 font-mono text-sm leading-[1.8] overflow-x-auto">
                <div className="flex gap-6">
                  <span className="text-slate-700 select-none">1</span>
                  <span>
                    <span className="text-purple-400">export const</span>{" "}
                    <span className="text-blue-400">fetchInternData</span> ={" "}
                    <span className="text-orange-400">async</span> (id:{" "}
                    <span className="text-green-400">string</span>) =&gt; {"{"}
                  </span>
                </div>
                <div className="flex gap-6">
                  <span className="text-slate-700 select-none">2</span>
                  <span className="pl-6">
                    <span className="text-purple-400">const</span> res ={" "}
                    <span className="text-orange-400">await</span>{" "}
                    <span className="text-blue-400">db</span>.query(
                    <span className="text-green-400">
                      `SELECT * FROM interns WHERE id = $1`
                    </span>
                    , [id]);
                  </span>
                </div>
                <div className="flex gap-6">
                  <span className="text-slate-700 select-none">3</span>
                  <span className="pl-6">
                    <span className="text-purple-400">return</span> {"{"}
                  </span>
                </div>
                <div className="flex gap-6">
                  <span className="text-slate-700 select-none">4</span>
                  <span className="pl-12">
                    status: <span className="text-green-400">'success'</span>,
                  </span>
                </div>
                <div className="flex gap-6">
                  <span className="text-slate-700 select-none">5</span>
                  <span className="pl-12">
                    data: res.rows[<span className="text-orange-400">0</span>],
                  </span>
                </div>
                <div className="flex gap-6">
                  <span className="text-slate-700 select-none">6</span>
                  <span className="pl-6">{"}"};</span>
                </div>
                <div className="flex gap-6">
                  <span className="text-slate-700 select-none">7</span>
                  <span>{"}"};</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
