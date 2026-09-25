"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, X, CheckCircle } from "lucide-react";
import { usePlan } from "../context/PlanContext";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [done, setDone] = useState<number[]>([]);

  const list = tab === "plan" ? plan : saved;
  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  function toggleDone(id: number) {
    setDone((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));
  }

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-black uppercase text-white">My Plan</h1>
      <p className="text-neutral-400 mt-2">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-black text-white">{plan.length}</p>
          <p className="text-xs uppercase text-neutral-400 mt-1">Exercises</p>
        </div>
        <div className="rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-black text-white">{totalMinutes}</p>
          <p className="text-xs uppercase text-neutral-400 mt-1">Minutes</p>
        </div>
        <div className="rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-black text-white">{totalCalories}</p>
          <p className="text-xs uppercase text-neutral-400 mt-1">Calories</p>
        </div>
      </div>

      <div className="flex gap-2 mt-10 border-b border-white/10">
        <button
          onClick={() => setTab("plan")}
          className={`px-4 py-2 text-sm font-bold uppercase ${tab === "plan" ? "text-[#ccff00] border-b-2 border-[#ccff00]" : "text-neutral-400"}`}
        >
          Today's Plan
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`px-4 py-2 text-sm font-bold uppercase ${tab === "saved" ? "text-[#ccff00] border-b-2 border-[#ccff00]" : "text-neutral-400"}`}
        >
          Saved
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {list.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-black uppercase text-white">Nothing Here Yet</h2>
            <p className="text-neutral-400 mt-2">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="inline-block mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase text-black">
              Go to workouts
            </Link>
          </div>
        ) : (
          list.map((workout) => (
            <div key={workout.id} className="flex items-center gap-4 rounded-xl border border-white/10 p-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <Image src={workout.image} alt={workout.name} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <h3 className={`font-bold uppercase text-white ${done.includes(workout.id) ? "line-through opacity-50" : ""}`}>
                  {workout.name}
                </h3>
                <p className="text-xs text-neutral-400">{workout.equipment}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-neutral-400">
                  <span className="flex items-center gap-1"><Clock size={12} /> {workout.duration} min</span>
                  <span className="flex items-center gap-1"><Flame size={12} /> {workout.caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1"><Star size={12} /> {workout.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/workout/${workout.id}`} className="text-xs font-bold uppercase text-[#ccff00]">
                  View Details
                </Link>
                {tab === "plan" && (
                  <button onClick={() => toggleDone(workout.id)}>
                    <CheckCircle size={18} className={done.includes(workout.id) ? "text-[#ccff00]" : "text-neutral-500"} />
                  </button>
                )}
                <button onClick={() => (tab === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id))}>
                  <X size={18} className="text-neutral-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}