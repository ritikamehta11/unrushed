"use client";

import { useState } from "react";
import { UserMonth } from "@/types/UserMonth";
import { toggleProgress, updateReflection } from "@/lib/progress";
import { saveUserMonth } from "@/lib/storage";

type Theme = {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  tasks: {
    id: string;
    text: string;
    tags: string[];
  }[];
};

type MonthCardProps = {
  theme: Theme;
  userMonth: UserMonth;
  onUpdate: (month: UserMonth) => void;
};

export const themeColorMap: Record<
  string,
  {
    background: string;
    border: string;
    text: string;
    mutedBg: string;
  }
> = {
  orange: {
    background: "bg-[#F4EFEA]",
    border: "border-[#D8BFA6]",
    text: "text-[#4A2E1F]",
    mutedBg: "bg-[#E9D6C4]",
  },
  slate: {
    background: "bg-slate-50",
    border: "border-slate-200",
    text: "text-slate-900",
    mutedBg: "bg-slate-100",
  },
  // keep your other colors here
};

export default function MonthCard({
  theme,
  userMonth,
  onUpdate,
}: MonthCardProps) {
  // UI-only state
  const [openNotesTaskId, setOpenNotesTaskId] = useState<string | null>(null);

  const themeColor = themeColorMap[theme.color] || themeColorMap["slate"];

  /* ----------------------------
     Handlers
  -----------------------------*/

  const handleToggleTask = (taskId: string) => {
    const updatedMonth = toggleProgress(userMonth, taskId);
    onUpdate(updatedMonth);
    saveUserMonth(updatedMonth);
  };

  const handleUpdateReflection = (taskId: string, note: string) => {
    const updatedMonth = updateReflection(userMonth, taskId, { note });
    onUpdate(updatedMonth);
    saveUserMonth(updatedMonth);
  };

  const handlePhoto = (taskId: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedMonth = updateReflection(userMonth, taskId, {
        photo: reader.result as string,
      });
      onUpdate(updatedMonth);
      saveUserMonth(updatedMonth);
    };
    reader.readAsDataURL(file);
  };

  /* ----------------------------
     UI
  -----------------------------*/

  return (
    <div className={`h-screen ${themeColor.background}`}>
      <div className="px-3 py-2 mx-auto lg:px-16 lg:py-10 space-y-10 flex flex-col justify-center w-2/3">
        {/* Theme header */}
        <header className="relative overflow-hidden rounded-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url('/images/${theme.id}.svg')` }}
          />
          <div className="relative space-y-3 p-6">
            <div className={`text-4xl ${themeColor.text}`}>
              {theme.icon}
            </div>
            <h1 className={`text-3xl font-semibold ${themeColor.text}`}>
              {theme.name}
            </h1>
            <p className="text-neutral-600 max-w-md leading-relaxed">
              {theme.description}
            </p>
          </div>
        </header>

        {/* Tasks */}
        <ul className="flex-1 max-w-full space-y-3">
          {theme.tasks.slice(0, 5).map((task) => {
            const isDone = userMonth.triedTasks.includes(task.id);
            const reflection = userMonth.reflections[task.id];

            return (
              <li
                key={task.id}
                className={`group rounded-xl px-3 py-3 transition-colors ${isDone
                    ? themeColor.mutedBg
                    : "hover:bg-neutral-100"
                  }`}
              >
                {/* Task row */}
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center transition-all ${isDone
                        ? "bg-neutral-900 border-neutral-900 text-white"
                        : "border-neutral-300 text-transparent group-hover:border-neutral-400"
                      }`}
                  >
                    ✓
                  </button>

                  <p
                    className={`text-sm leading-relaxed ${isDone
                        ? "text-neutral-400 line-through"
                        : "text-neutral-800"
                      }`}
                  >
                    {task.text}
                  </p>
                </div>

                {/* Reflection toggle */}
                {isDone && (
                  <button
                    onClick={() =>
                      setOpenNotesTaskId(
                        openNotesTaskId === task.id ? null : task.id
                      )
                    }
                    className="mt-2 ml-8 inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs text-neutral-600 border border-neutral-200 hover:bg-white transition"
                  >
                    {openNotesTaskId === task.id
                      ? "Save reflection"
                      : reflection
                        ? "Edit reflection"
                        : "Add reflection"}
                  </button>
                )}

                {/* Reflection panel */}
                {isDone && openNotesTaskId === task.id && (
                  <div className="mt-4 ml-8 rounded-xl bg-white/80 p-4 space-y-4 border border-neutral-200">
                    {/* Image */}
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer rounded-lg border border-dashed border-neutral-300 px-3 py-2 text-xs text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 transition">
                        Add image
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            e.target.files &&
                            handlePhoto(task.id, e.target.files[0])
                          }
                        />
                      </label>

                      {reflection?.photo && (
                        <img
                          src={reflection.photo}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      )}
                    </div>

                    {/* Note */}
                    <textarea
                      className="w-full rounded-lg bg-white border border-neutral-200 p-3 text-sm leading-relaxed placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                      placeholder="What did this feel like?"
                      value={reflection?.note || ""}
                      onChange={(e) =>
                        handleUpdateReflection(task.id, e.target.value)
                      }
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Gentle note */}
        <p className="text-xs text-neutral-400 max-w-sm">
          You don’t have to finish everything. Trying one thing is enough.
        </p>
      </div>
    </div>
  );
}
