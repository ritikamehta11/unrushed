"use client";

import { useEffect, useState } from "react";
import taskbank from "../../../data/taskBank.json";
import MonthCard from "./monthCard";

import { getCurrentMonth } from "@/lib/time";
import { loadUserMonth, saveUserMonth } from "@/lib/storage";
import { createUserMonth } from "@/lib/createUserMonth";
import { UserMonth } from "@/types/UserMonth";

export default function CurrentMonthPage() {
  const [yearThemes, setYearThemes] = useState<string[]>([]);
  const [userMonth, setUserMonth] = useState<UserMonth | null>(null);

  const TOTAL_THEMES = 12;
  const allThemes = taskbank.themes.map((theme) => theme.id);

  /* -----------------------------
     Year theme planning (unchanged)
  -----------------------------*/
  useEffect(() => {
    const savedYearThemes = localStorage.getItem("yearThemes");

    if (savedYearThemes) {
      setYearThemes(JSON.parse(savedYearThemes));
      return;
    }

    const userSelectedIds: string[] = JSON.parse(
      localStorage.getItem("userInterests") || "[]"
    );

    const remainingThemes = allThemes.filter(
      (id) => !userSelectedIds.includes(id)
    );

    const randomThemes = [...remainingThemes]
      .sort(() => Math.random() - 0.5)
      .slice(0, TOTAL_THEMES - userSelectedIds.length);

    const finalThemes = [...userSelectedIds, ...randomThemes];

    localStorage.setItem("yearThemes", JSON.stringify(finalThemes));
    setYearThemes(finalThemes);
  }, []);

  /* -----------------------------
     Resolve current theme
  -----------------------------*/
  const currentMonthIndex = new Date().getMonth();
  const theme =
    taskbank.themes.find(
      (t) => t.id === yearThemes[currentMonthIndex]
    ) || null;

  /* -----------------------------
     Initialize UserMonth (FIX)
  -----------------------------*/
  useEffect(() => {
    if (!theme) return;

    const monthId = getCurrentMonth();
    let month = loadUserMonth(monthId);

    if (!month) {
      month = createUserMonth(monthId, theme.id);
      saveUserMonth(month);
    }

    setUserMonth(month);
  }, [theme]);

  if (!theme || !userMonth) {
    return <p className="text-xl">Loading your month…</p>;
  }

  return (
    <div className="p-6 space-y-10">
      <MonthCard
        theme={theme}
        userMonth={userMonth}
        onUpdate={setUserMonth}
      />
    </div>
  );
}
