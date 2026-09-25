import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full pt-8 pb-12">
      <div className="max-w-[1240px] mx-auto px-6">
        
        <div className="bg-[#15171c] border border-neutral-800/50 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
         
          <div className="flex-1 max-w-[620px] z-10">
            
            <span className="text-[#ccff00] text-xs font-bold tracking-[0.2em] uppercase block mb-5">
              WORKOUT LIBRARY
            </span>

           
            <h1 className="text-white font-black text-5xl md:text-[64px] uppercase tracking-tight leading-[0.95] mb-6 font-sans">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-[480px] mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            
            <Link
              href="#library"
              className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs tracking-wider uppercase px-7 py-3.5 rounded-lg transition-colors"
            >
              BROWSE WORKOUTS
            </Link>
          </div>

          
          <div className="flex-1 flex justify-end items-center relative w-full md:w-auto h-[320px] md:h-[400px]">
            <Image
              src="/images/banner.png"
              alt="Gym Equipment"
              width={480}
              height={400}
              className="object-contain max-h-[380px] w-auto drop-shadow-2xl"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}