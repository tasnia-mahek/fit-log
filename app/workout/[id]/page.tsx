import { notFound } from "next/navigation";
import Image from "next/image";
import type { Workout } from "../../types/workout";
//import AddToPlanButtons from "./AddToPlanButtons";

async function getWorkout(id: string): Promise<Workout | null> {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) notFound();

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden bg-neutral-900">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div>
        <h1 className="text-3xl md:text-4xl font-black uppercase text-white">
          {workout.name}
        </h1>
        <p className="text-neutral-400 mt-3">{workout.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {workout.muscleGroups.map((tag) => (
            <span key={tag} className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-bold uppercase text-black">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 border border-white/10 rounded-xl divide-y divide-white/10">
          {[
            ["Equipment", workout.equipment],
            ["Difficulty", workout.difficulty],
            ["Sets", workout.sets],
            ["Reps", workout.reps],
            ["Duration", `${workout.duration} min`],
            ["Calories", `${workout.caloriesBurned} kcal`],
            ["Rating", workout.rating],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between px-4 py-3 text-sm">
              <span className="text-neutral-400 uppercase">{label}</span>
              <span className="text-white font-medium">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold uppercase text-white mb-3">Instructions</h2>
          <ol className="space-y-2">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-neutral-300">
                <span className="text-[#ccff00] font-bold">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

    
      </div>
    </div>
  );
}