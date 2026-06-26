"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import es from "@/messages/es.json";

export type Lang = "en" | "ru" | "es";

const dictionaries: Record<Lang, typeof en> = { en, ru, es };

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof en;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
