"use client";

import { useState } from "react";
import { PlusCircle, Bookmark } from "lucide-react";
import type { Workout } from "../../types/workout";
import { usePlan } from "../../context/PlanContext";

export default function AddToPlanButtons({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved } = usePlan();
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3 relative">
      <button
        onClick={() => { addToPlan(workout); showToast("Added to today's plan"); }}
        className="flex items-center justify-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase text-black"
      >
        <PlusCircle size={16} /> Add to today's plan
      </button>

      <button
        onClick={() => { addToSaved(workout); showToast("Saved for later"); }}
        className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase text-white"
      >
        <Bookmark size={16} /> Save for later
      </button>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white text-black text-sm font-medium px-4 py-2 shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}