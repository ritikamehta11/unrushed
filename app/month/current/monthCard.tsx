import { useEffect, useState } from "react";

type Theme = {
  id: string;
  name: string;
  icon: string;
  description: string;
  tasks: {
    id: string;
    text: string;
    tags: string[];
  }[];
};
type MonthCard = {
  theme: Theme;
}


export default function MonthCard({ theme }: MonthCard) {
  const [tasksToShow, setTasksToShow] = useState<Theme["tasks"]>([]);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});


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
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-6">

        {/* Header */}
        <header className="flex items-start gap-4">
          <div className="text-4xl">{theme.icon}</div>
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900">
              {theme.name}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
              {theme.description}
            </p>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-neutral-200" />

        {/* Tasks */}
        <ul className="space-y-3">
          
          {tasksToShow.map((task) => {
            const isCompleted = completedTasks[task.id] || false;
            return(
            <li
              key={task.id}
              className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm flex justify-between text-neutral-800"
            >
                {task.text}
                <button onClick={() => toggleTaskCompletion(task.id)}>
                {isCompleted ? "✓" : "○"}
              </button>
              </li>
             
         ) })}
        </ul>
      </section>
    );
  }
