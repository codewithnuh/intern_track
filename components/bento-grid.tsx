import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
export const BentoGrid: React.FC = () => {
  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Precision Monitoring</h2>
          <p className="text-slate-400 max-w-xl text-lg">
            Every tool you need to manage hundreds of interns without breaking a
            sweat. Built for scale, designed for clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 min-h-175">
          {/* Intern Profile Card */}
          <div className="md:row-span-2 bg-primary/1 glass-card rounded-2xl p-8 flex flex-col justify-between group hover:border-primary/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary p-0.5">
                    <img
                      src="https://picsum.photos/id/64/200/200"
                      alt="Alex Chen"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Alex Chen</h3>
                    <p className="text-xs text-slate-500">
                      Frontend Engineering Intern
                    </p>
                  </div>
                </div>
                <Badge variant="default">Active Now</Badge>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-400">Project Progress</span>
                    <span className="text-primary">84%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[84%] shadow-[0_0_12px_rgba(19,127,236,0.6)]"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Recent Tasks
                  </h4>
                  <div className="p-3 bg-white/5 rounded-xl flex items-center gap-3 border border-white/5">
                    <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm">
                      Implement Next.js Auth Middleware
                    </span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl flex items-center gap-3 border border-white/5">
                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    </div>
                    <span className="text-sm">Optimize Image Component</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl flex items-center gap-3 border border-white/5 opacity-50">
                    <div className="w-4 h-4 border border-slate-600 rounded-full"></div>
                    <span className="text-sm">Refactor Theme Context</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="secondary" className="w-full mt-8">
              View Full Profile
            </Button>
          </div>

          {/* Role Based Access Card */}
          <div className="md:col-span-2 glass-card rounded-2xl bg-primary/1 p-8 group hover:border-primary/40 transition-all flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Role-Based Access</h3>
              <p className="text-slate-400 text-sm mb-6">
                Granular permission matrices for Admins, Mentors, and Interns.
                Maintain data integrity at scale.
              </p>
              <div className="flex gap-2">
                <Badge>SSO Enabled</Badge>
                <Badge>JWT Tokens</Badge>
              </div>
            </div>
            <div className="flex-1 w-full bg-charcoal/80 rounded-2xl p-6 border border-white/5 space-y-4 shadow-inner">
              {[
                { label: "Edit Project Scopes", active: true },
                { label: "Approve Time Logs", active: true },
                { label: "Delete Users", active: false },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-lg bg-white/5 ${!row.active && "opacity-40"}`}
                >
                  <span className="text-xs font-medium">{row.label}</span>
                  <Switch
                    checked={row.active}
                    className="
                      data-[state=checked]:bg-primary!
                      data-[state=unchecked]:bg-slate-700
                    "
                  />
                  {/*<div
                    className={`w-9 h-5 rounded-full relative p-1 transition-colors ${row.active ? "bg-primary" : "bg-slate-700"}`}
                  >*/}
                  {/*<div
                      className={`w-3 h-3 bg-white rounded-full transition-all ${row.active ? "ml-1" : "ml-0"}`}
                    ></div>*/}
                  {/*</div>*/}
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Log */}
          <div className="glass-card rounded-2xl bg-primary/1 p-8 group hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Attendance Log</h3>
              <svg
                className="w-5 h-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase">
                    Today, 09:00 AM
                  </p>
                  <p className="text-xs text-slate-300">
                    Check-in: Remote (London)
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase">
                    Yesterday, 08:55 AM
                  </p>
                  <p className="text-xs text-slate-300">
                    Check-in: On-site (Office)
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase">
                    Oct 24, 09:15 AM
                  </p>
                  <p className="text-xs text-red-400 font-bold">
                    Late Arrival (15m)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-primary/10 to-transparent group hover:border-primary/40 transition-all flex flex-col justify-center">
            <div className="text-6xl font-black text-primary mb-2 tracking-tighter">
              99.9%
            </div>
            <h3 className="text-xl font-bold mb-2">Uptime Guarantee</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mission-critical infrastructure for enterprise-level intern
              programs. Zero downtime during peak recruitment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
