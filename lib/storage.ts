//helper functions here to interact with localStorage can be added in the future

import { UserMonth } from "../types/UserMonth";

const USER_MONTHS_KEY = "Unrushed:userMonths";

function readAllMonths(): Record<string, UserMonth> {
  try {
    const raw = localStorage.getItem("userMonths");
    if (!raw) return {};
    return JSON.parse(raw);
  }
  catch {
    return {};
  }
};

function writeAllMonths(data: Record<string, UserMonth>) {
  localStorage.setItem(USER_MONTHS_KEY, JSON.stringify(data));
}

export function loadUserMonth(monthID: string): UserMonth | null {
  const allMonths = readAllMonths();
  return allMonths[monthID] ?? null;
}

export function saveUserMonth(userMonth: UserMonth) {
  const allMonths = readAllMonths();
  allMonths[userMonth.monthId] = userMonth;
  writeAllMonths(allMonths);
}