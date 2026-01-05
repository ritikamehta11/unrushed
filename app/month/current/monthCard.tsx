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
}

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
    background: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-900",
    mutedBg: "bg-orange-100",
  },
  indigo: {
    background: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-900",
    mutedBg: "bg-indigo-100",
  },
  sky: {
    background: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-900",
    mutedBg: "bg-sky-100",
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
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const themeColor = themeColorMap[theme.color] || themeColorMap["slate"];
  console.log(theme.color);

  // const tasksToShow = theme.tasks.sort(() => Math.random() - 0.5).slice(0, 5);
 
  useEffect(() => {
   
    const savedTasks = localStorage.getItem("currentMonthTasks");

    if (savedTasks) {
      setTasksToShow(JSON.parse(savedTasks));
    } else {
     
      const selected = [...theme.tasks]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

      setTasksToShow(selected);
      localStorage.setItem("currentMonthTasks", JSON.stringify(selected));
    }

    // 3. Load completed tasks
    const savedCompleted = localStorage.getItem("completedTasks");
    if (savedCompleted) {
      setCompletedTasks(JSON.parse(savedCompleted));
    }
  }, [theme?.id]);

  
  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      localStorage.setItem("completedTasks", JSON.stringify(updated));
      return updated;
    })
  };

    return (
      <section className="space-y-5">

        {/* Header */}
        <header className="space-y-2">
          <div className={`text-4xl ${themeColor.text}`}>
            {theme.icon}
          </div>

          <h2 className={`text-2xl font-semibold ${themeColor.text}`}>
            {theme.name}
          </h2>

          <p className="text-sm text-neutral-600 max-w-md">
            {theme.description}
          </p>
        </header>

        {/* Tasks */}
        <ul className="space-y-2">
          {tasksToShow.map((task) => {
            const isCompleted = completedTasks[task.id] || false;

            return (
              <li
                key={task.id}
                className={`rounded-lg border px-4 py-3 text-sm flex justify-between items-center
            ${isCompleted
                    ? `${themeColor.mutedBg} text-neutral-600`
                    : "bg-white border-neutral-200"
                  }`}
              >
                <span>{task.text}</span>

                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="text-neutral-500"
                >
                  {isCompleted ? "✓" : "○"}
                </button>
              </li>
            );
          })}
        </ul>

      </section>


    );
  }
