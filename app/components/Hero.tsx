import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full pt-4 sm:pt-8 pb-8 sm:pb-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="bg-[#15171c] border border-neutral-800/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Content */}
          <div className="w-full md:max-w-[580px] text-left">
            <span className="text-[#ccff00] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase block mb-3 sm:mb-4">
              WORKOUT LIBRARY
            </span>

            <h1 className="text-white font-black text-3xl sm:text-5xl md:text-[56px] uppercase tracking-tight leading-[1] mb-4 font-sans">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold text-xs tracking-wider uppercase px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg transition-colors w-full sm:w-auto"
            >
              BROWSE WORKOUTS
              <ArrowDown className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>

          {/* Banner Graphic */}
          <div className="w-full md:flex-1 flex justify-center md:justify-end items-center max-h-[260px] sm:max-h-[340px]">
            <Image
              src="/images/banner.png"
              alt="Gym Equipment"
              width={420}
              height={380}
              className="object-contain max-h-[240px] sm:max-h-[320px] w-auto drop-shadow-xl"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}