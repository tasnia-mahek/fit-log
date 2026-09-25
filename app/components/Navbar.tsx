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
      <nav className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo (1).png"
            alt="FitLog"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
            priority
          />
          <span className="font-extrabold tracking-wider text-white text-base sm:text-xl uppercase font-sans">
            FITLOG
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="flex items-center gap-1 bg-[#14171c]/80 p-1 rounded-full border border-neutral-800/50">
          <Link
            href="/"
            className={`px-3 sm:px-5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              pathname === "/"
                ? "bg-[#2a3814] text-[#ccff00]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-3 sm:px-5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              pathname === "/my-plan"
                ? "bg-[#2a3814] text-[#ccff00]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Badges */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold shrink-0">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black px-2.5 sm:px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
          >
            <span>Plan</span>
            <span className="font-black">{plan.length}</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-neutral-700 text-neutral-300 px-2.5 sm:px-3 py-1 rounded-full hover:border-neutral-500 transition-colors"
          >
            <span>Saved</span>
            <span className="font-black">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}