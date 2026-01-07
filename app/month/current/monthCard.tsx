import { useEffect, useState } from "react";
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

type MonthCard = {
  theme: Theme;
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
    background: "bg-[#F4EFEA]", // toasted cream / bread crumb
    border: "border-[#D8BFA6]", // warm crust brown
    text: "text-[#4A2E1F]", // deep roasted brown
    mutedBg: "bg-[#E9D6C4]", // soft roasted wheat tone
  },
  indigo: {
    background: "bg-[#F2EEE9]", // warm cream (pages + candle wax)
    border: "border-[#D6CBBE]", // soft taupe border
    text: "text-[#3A2F2A]", // deep coffee brown
    mutedBg: "bg-[#E6DED4]", // cozy fabric / latte foam tone
  },
  sky: {
    background: "bg-[#ECEFF1]", // misty pale sky gray
    border: "border-[#C7D0D4]", // soft cool gray
    text: "text-[#2F3E34]", // deep forest green
    mutedBg: "bg-[#E1E6E3]", // foggy green-gray
  },
  violet: {
    background: "bg-violet-50",

    border: "border-violet-200",

    text: "text-violet-900",

    mutedBg: "bg-violet-100",
  },

  emerald: {
    background: "bg-emerald-50",

    border: "border-emerald-200",

    text: "text-emerald-900",

    mutedBg: "bg-emerald-100",
  },

  green: {
    background: "bg-green-50",

    border: "border-green-200",

    text: "text-green-900",

    mutedBg: "bg-green-100",
  },

  slate: {
    background: "bg-slate-50",

    border: "border-slate-200",

    text: "text-slate-900",

    mutedBg: "bg-slate-100",
  },

  stone: {
    background: "bg-stone-50",

    border: "border-stone-200",

    text: "text-stone-900",

    mutedBg: "bg-stone-100",
  },

  blue: {
    background: "bg-blue-50",

    border: "border-blue-200",

    text: "text-blue-900",

    mutedBg: "bg-blue-100",
  },

  rose: {
    background: "bg-rose-50",

    border: "border-rose-200",

    text: "text-rose-900",

    mutedBg: "bg-rose-100",
  },

  amber: {
    background: "bg-amber-50",

    border: "border-amber-200",

    text: "text-amber-900",

    mutedBg: "bg-amber-100",
  },

  yellow: {
    background: "bg-yellow-50",

    border: "border-yellow-200",

    text: "text-yellow-900",

    mutedBg: "bg-yellow-100",
  },
};
export default function MonthCard({ theme }: MonthCard) {
  const [tasksToShow, setTasksToShow] = useState<Theme["tasks"]>([]);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(
    {}
  );
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [reflections, setReflections] = useState<
    Record<string, { note: string; photo?: string }>
  >({});

  const themeColor = themeColorMap[theme.color] || themeColorMap["slate"];

  useEffect(() => {
    const savedTasks = localStorage.getItem("currentMonthTasks");
    const savedCompleted = localStorage.getItem("completedTasks");
    const savedReflections = localStorage.getItem("taskReflections");

    if (savedTasks) setTasksToShow(JSON.parse(savedTasks));
    else {
      const selected = [...theme.tasks]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
      setTasksToShow(selected);
      localStorage.setItem("currentMonthTasks", JSON.stringify(selected));
    }

    if (savedCompleted) setCompletedTasks(JSON.parse(savedCompleted));
    if (savedReflections) setReflections(JSON.parse(savedReflections));
  }, [theme?.id]);

  const toggleTask = (taskId: string) => {
    const updated = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(updated);
    localStorage.setItem("completedTasks", JSON.stringify(updated));
  };

  const updateReflection = (taskId: string, note: string, photo?: string) => {
    const updated = {
      ...reflections,
      [taskId]: { note, photo: photo || reflections[taskId]?.photo },
    };
    setReflections(updated);
    localStorage.setItem("taskReflections", JSON.stringify(updated));
  };

  return (
    <div className="h-screen bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Calm visual */}
        <div className="relative  lg:block max-h-full">
          <img
            src={`/${theme.name}.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-contain "
          />

          {/* soft overlay */}
          <div className="absolute inset-0 bg-white/20" />
        </div>

        {/* RIGHT: Content */}
        <div className="px-6 py-2 lg:px-16 lg:py-10 space-y-10 flex flex-col justify-between">
          {/* Theme header */}
          <header className="space-y-3">
            <div className={`text-4xl ${themeColor.text}`}>{theme.icon}</div>

            <h1 className={`text-3xl font-semibold ${themeColor.text}`}>
              {theme.name}
            </h1>

            <p className="text-neutral-600 max-w-md leading-relaxed">
              {theme.description}
            </p>
          </header>

          {/* Tasks */}
          <ul className="space-y-4 max-w-xl flex-1 flex flex-col">
            {tasksToShow.map((task) => {
              const isDone = completedTasks[task.id];

              return (
                <li
                  key={task.id}
                  className={`rounded-lg px-3 py-2 transition-colors
          ${isDone ? themeColor.mutedBg : "hover:bg-neutral-100"}
        `}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex items-start gap-4 w-full text-left"
                  >
                    <span className="mt-1 text-sm">{isDone ? "✓" : "–"}</span>

                    <span
                      className={`${isDone ? "text-neutral-400" : "text-neutral-800"
                        }`}
                    >
                      {task.text}
                    </span>
                  </button>
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
    </div>
  );
}
