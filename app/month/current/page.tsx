"use client";

import { useEffect, useState } from "react";
import taskbank from "../../../data/taskBank.json";
import MonthCard from "./monthCard";
import Link from "next/link";

export default function CurrentMonthPage() {
  const [yearThemes, setYearThemes] = useState<string[]>([]);
  const TOTAL_THEMES = 12;

  const allThemes = taskbank.themes.map((theme) => theme.id);

  useEffect(() => {
    // Check if already generated
    const savedYearThemes = localStorage.getItem("yearThemes");

    if (savedYearThemes) {
      setYearThemes(JSON.parse(savedYearThemes));
      return;
    }

    // Otherwise generate once
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

  const month = taskbank.themes.find((theme) => theme.id === yearThemes[new Date().getMonth()]) || taskbank.themes[0];
  console.log(month)

  return (
    <div className="p-6 space-y-10">
      
      {yearThemes.length > 0 ? (
        <div className="mb-4">
          {/* <h1 className="text-xl font-semibold mb-4">Your Year Themes</h1>
          <p className="text-sm text-neutral-600">
            {yearThemes.join(", ")}
          </p>
          <br /> */}
          {/* <h1 className="text-2xl font-semibold mb-4">Your Theme for the month</h1> */}
        
         
        
            
        {month ? <MonthCard theme={month} /> : "Theme not found"}
      
        </div>
      ) : (
        <p className="text-xl">Loading your themes...</p>
      )}


     
    </div>
  );
}
