"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import { Clock, Flame, Star, X, CheckCircle } from "lucide-react";
import { usePlan } from "../context/PlanContext";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [done, setDone] = useState<number[]>([]);

  const list = tab === "plan" ? plan : saved;

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce(
    (sum, w) => sum + w.caloriesBurned,
    0
  );

  function markAsDone(id: number, name: string) {
  if (done.includes(id)) {
    return;
  }

  setDone((prev) => [...prev, id]);
  toast.success(`${name} marked as done!`);
}

  function handleRemove(id: number, name: string) {
  if (tab === "plan") {
    removeFromPlan(id);
  } else {
    removeFromSaved(id);
  }

  toast.success(`${name} removed!`);
}
  return (
    <div className="mx-auto max-w-[1240px] px-6 py-16">
      <h1 className="text-3xl font-black uppercase text-white md:text-4xl">
        My Plan
      </h1>

      <p className="mt-2 text-neutral-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-black text-white">{plan.length}</p>
          <p className="mt-1 text-xs uppercase text-neutral-400">
            Exercises
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-black text-white">{totalMinutes}</p>
          <p className="mt-1 text-xs uppercase text-neutral-400">
            Minutes
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-black text-white">{totalCalories}</p>
          <p className="mt-1 text-xs uppercase text-neutral-400">
            Calories
          </p>
        </div>
      </div>

      <div className="mt-10 flex gap-2 border-b border-white/10">
        <button
          onClick={() => setTab("plan")}
          className={`px-4 py-2 text-sm font-bold uppercase ${
            tab === "plan"
              ? "border-b-2 border-[#ccff00] text-[#ccff00]"
              : "text-neutral-400"
          }`}
        >
          Today's Plan
        </button>

        <button
          onClick={() => setTab("saved")}
          className={`px-4 py-2 text-sm font-bold uppercase ${
            tab === "saved"
              ? "border-b-2 border-[#ccff00] text-[#ccff00]"
              : "text-neutral-400"
          }`}
        >
          Saved
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {list.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-black uppercase text-white">
              Nothing Here Yet
            </h2>

            <p className="mt-2 text-neutral-400">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase text-black"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          list.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center gap-4 rounded-xl border border-white/10 p-4"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3
                  className={`font-bold uppercase text-white ${
                    done.includes(workout.id)
                      ? "text-[#ccff00] line-through opacity-50"
                      : ""
                  }`}
                >
                  {workout.name}
                </h3>

                <p className="text-xs text-neutral-400">
                  {workout.equipment}
                </p>

                <div className="mt-1 flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {workout.duration} min
                  </span>

                  <span className="flex items-center gap-1">
                    <Flame size={12} />
                    {workout.caloriesBurned} kcal
                  </span>

                  <span className="flex items-center gap-1">
                    <Star size={12} />
                    {workout.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/workout/${workout.id}`}
                  className="text-xs font-bold uppercase text-[#ccff00]"
                >
                  View Details
                </Link>

                {tab === "plan" && (
                  <button
                    onClick={() =>
                      markAsDone(workout.id, workout.name)
                    }
                    title="Mark as Done"
                    aria-label={`Mark ${workout.name} as done`}
                  >
                    <CheckCircle
                      size={20}
                      className={
                        done.includes(workout.id)
                          ? "text-[#ccff00]"
                          : "text-neutral-500 transition hover:text-[#ccff00]"
                      }
                    />
                  </button>
                )}

                <button
                  onClick={() =>
                    handleRemove(workout.id, workout.name)
                  }
                  title="Remove"
                  aria-label={`Remove ${workout.name}`}
                >
                  <X
                    size={20}
                    className="text-neutral-500 transition hover:text-red-400"
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}