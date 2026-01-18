import { Reflection } from "./reflection";

export type UserMonth = {
  monthId: string;
  themeID: string;
  triedTasks: string[];
  reflections: Record<string, Reflection>;
  
  startedAt: string;
}