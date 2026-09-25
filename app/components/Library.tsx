"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
   import type { Workout } from "@/app/types/workout";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to fetch workouts");
        const data: Workout[] = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
        The Library
      </h2>
      <p className="mt-2 text-white/50">
        Twelve lifts covering every major muscle group.
      </p>

      {loading ? (
        <div className="mt-10 flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}