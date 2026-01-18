import { json } from 'stream/consumers';
import { themes } from '../data/taskBank.json';

const THEME_KEY = "unrushed:monthlyThemes";


type ThemeMap = Record<string, string>;

function loadThemeMap(): ThemeMap {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    return raw ? JSON.parse(raw) : {};
  }
  catch {
    return {};
  }
};

function saveThemeMap(map: ThemeMap) {
  localStorage.setItem(THEME_KEY, JSON.stringify(map));
}

export function getThemeForMonth(monthId: string) {
  const map = loadThemeMap();

  if (map[monthId]) {
    return themes.find((theme) => theme.id === map[monthId]) || null;
  }

  const randomTheme = themes[Math.floor(Math.random() * themes.length)];


  map[monthId] = randomTheme.id;
  saveThemeMap(map);
  return randomTheme;
}