"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Workout } from "../types/workout";

interface Toast {
  id: number;
  message: string;
}

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  toasts: Toast[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 1. Read from localStorage on initial render
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
  }, []);

  // Helper for triggering toasts
  function showToast(message: string) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  function addToPlan(workout: Workout) {
    if (plan.find((w) => w.id === workout.id)) {
      showToast("Already in today's plan");
      return;
    }
    const updated = [...plan, { ...workout, isDone: false }];
    setPlan(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    showToast("Added to today's plan");
  }

  function addToSaved(workout: Workout) {
    if (saved.find((w) => w.id === workout.id)) {
      showToast("Already in saved lifts");
      return;
    }
    const updated = [...saved, workout];
    setSaved(updated);
    localStorage.setItem("fitlog_saved", JSON.stringify(updated));
    showToast("Saved for later");
  }

  function removeFromPlan(id: number) {
    const updated = plan.filter((w) => w.id !== id);
    setPlan(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    showToast("Removed from today's plan");
  }

  function removeFromSaved(id: number) {
    const updated = saved.filter((w) => w.id !== id);
    setSaved(updated);
    localStorage.setItem("fitlog_saved", JSON.stringify(updated));
    showToast("Removed from saved");
  }

  function toggleDone(id: number) {
    const target = plan.find((w) => w.id === id);
    const willBeDone = !target?.isDone;
    const updated = plan.map((w) =>
      w.id === id ? { ...w, isDone: willBeDone } : w
    );
    setPlan(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    showToast(willBeDone ? "Workout marked as completed!" : "Workout marked as incomplete");
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        toasts,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-[#ccff00] text-black font-extrabold text-xs uppercase px-4 py-2.5 rounded-lg shadow-lg border border-black pointer-events-auto"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}