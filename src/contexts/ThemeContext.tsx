import { createContext, useContext, useEffect, useReducer } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function themeReducer(state: Theme, action: { type: "TOGGLE" }): Theme {
  return state === "light" ? "dark" : "light";
}

function getInitialTheme(): Theme {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme") as Theme;
    return saved || "dark";
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, dispatch] = useReducer(themeReducer, undefined, getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE" });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
