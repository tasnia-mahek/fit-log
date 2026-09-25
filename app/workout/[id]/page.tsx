import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Workout } from "../../types/workout";
import AddToPlanButtons from "./AddToPlanButtons";

async function getWorkout(id: string): Promise<Workout | null> {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || json;
}

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await params;
  const workout = await getWorkout(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  const categories = Array.isArray(workout.category)
    ? workout.category
    : [workout.category];

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment || "Standard" },
    { label: "DIFFICULTY", value: workout.difficulty || "Intermediate" },
    { label: "SETS", value: workout.sets || "4" },
    { label: "REPS", value: workout.reps || "8-12" },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.calories} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  const instructions = workout.instructions || [
    "Position yourself correctly using standard posture and body alignment.",
    "Breathe in deeply, brace your core, and initiate the movement with strict control.",
    "Pause briefly at peak contraction without locking out joints abruptly.",
    "Lower the weight smoothly under full eccentric control back to the starting point.",
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs uppercase text-neutral-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Visual Media */}
        <div className="w-full bg-[#15171c] border border-neutral-800 rounded-3xl overflow-hidden relative aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-[560px]">
          <Image
            src={workout.image || "/images/banner.png"}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column: Info & Specs */}
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((c, i) => (
              <span
                key={i}
                className="bg-[#ccff00] text-black text-xs font-black uppercase px-2.5 py-0.5 rounded-sm"
              >
                {c}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3 font-sans">
            {workout.name}
          </h1>

          <p className="text-neutral-400 text-sm leading-relaxed mb-6">
            {workout.description ||
              "A compound exercise designed to increase athletic performance, muscular definition, and functional strength."}
          </p>

          {/* Interactive Client Buttons Component */}
          <AddToPlanButtons workout={workout} />

          {/* Specs Panel */}
          <div className="bg-[#15171c] border border-neutral-800 rounded-xl divide-y divide-neutral-800/80 mb-8 mt-8">
            {specs.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-5 py-3 text-xs"
              >
                <span className="text-neutral-400 uppercase tracking-wider font-semibold">
                  {item.label}
                </span>
                <span className="text-white font-bold">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-neutral-300 mb-3">
              Instructions
            </h3>
            <ol className="flex flex-col gap-2.5">
              {instructions.map((step, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 text-xs leading-relaxed text-neutral-400"
                >
                  <span className="text-[#ccff00] font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}