"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="w-full bg-[#0d0f12] border-b border-neutral-800/40 sticky top-0 z-40">
      <nav className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo (1).png"
            alt="FitLog"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
            priority
          />
          <span className="font-extrabold tracking-wider text-white text-xl uppercase font-sans">
            FITLOG
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="flex items-center gap-1 bg-[#14171c]/60 p-1 rounded-full border border-neutral-800/50">
          <Link
            href="/"
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-colors ${
              pathname === "/"
                ? "bg-[#2a3814] text-[#ccff00]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-colors ${
              pathname === "/my-plan"
                ? "bg-[#2a3814] text-[#ccff00]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Counters (Links to /my-plan with dynamic counts) */}
        <div className="flex items-center gap-5 text-xs font-semibold text-neutral-400">
          <Link href="/my-plan" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black text-[11px] font-black flex items-center justify-center">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 hover:text-white transition-colors">
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-300 text-[11px] font-bold flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}