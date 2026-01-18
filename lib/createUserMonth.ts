
import { UserMonth } from "../types/UserMonth";

export function createUserMonth(monthId: string, themeId: string): UserMonth {
  return {
    monthId,
    themeID: themeId,
    triedTasks: [],
    reflections: {},
    startedAt: new Date().toISOString(),
  }
}