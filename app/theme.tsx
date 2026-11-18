"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { THEME_STORAGE_KEY } from "./theme-key";

export type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // The inline script in layout.tsx sets data-theme before first paint.
  // Read it once on mount so React state matches the page.
  useEffect(() => {
    if (document.documentElement.dataset.theme === "dark") setTheme("dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode). The toggle still works for this visit.
    }
  };

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button type="button" className="btn theme-toggle" onClick={toggle}>
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
