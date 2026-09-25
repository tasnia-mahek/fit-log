"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import type { Workout } from "@/app/types/workout";

type SortOption = "duration" | "calories" | "rating";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }

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

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            The Library
          </h2>

          <p className="mt-2 text-white/50">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="relative">
          <label
            htmlFor="sort"
            className="mr-3 text-sm font-bold uppercase tracking-wide text-white/50"
          >
            Sort By
          </label>

          <div className="relative inline-block">
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none rounded-lg border border-white/10 bg-[#141414] py-3 pl-4 pr-10 text-sm font-bold uppercase text-white outline-none transition focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#ccff00]"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}