import { Reflection } from '../types/reflection';
import { UserMonth } from '../types/UserMonth';

export function toggleProgress(userMonth: UserMonth, taskId: string): UserMonth {
  const isAlreadyTried = userMonth.triedTasks.includes(taskId);
  return {
    ...userMonth,
    triedTasks: isAlreadyTried ? userMonth.triedTasks.filter((id) => id !== taskId) : [...userMonth.triedTasks, taskId]
  };
};

export function updateReflection(
  userMonth: UserMonth,
  taskId: string,
  updates: Reflection
): UserMonth {
  return {
    ...userMonth,
    reflections: {
      ...userMonth.reflections,
      [taskId]: {
        ...userMonth.reflections[taskId],
        ...updates,
      }
    }
  }
};