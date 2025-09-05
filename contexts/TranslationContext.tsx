"use client";

import React, { createContext, useCallback, useMemo, useState } from "react";

export type Translations = Record<string, Record<string, string>>;

interface TranslationContextValue {
  locale: string;
  setLocale: (lang: string) => void;
  t: (key: string, placeholders?: Record<string, string>) => string;
}

export const TranslationContext = createContext<TranslationContextValue | undefined>(
  undefined
);

interface TranslationProviderProps {
  locale: string;
  translations: Translations;
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  locale: initialLocale,
  translations,
  children,
}) => {
  const [locale, setLocaleState] = useState(initialLocale);

  const setLocale = useCallback(
    (lang: string) => {
      if (translations[lang]) {
        setLocaleState(lang);
      } else {
        console.warn(`No translations found for locale: ${lang}`);
      }
    },
    [translations]
  );

  const t = useCallback(
    (key: string, placeholders?: Record<string, string>) => {
      const dict = translations[locale] || {};
      const text = dict[key] || key;
      if (!placeholders) return text;

      return Object.entries(placeholders).reduce((acc, [phKey, phValue]) => {
        const regex = new RegExp(`{${phKey}}`, "g");
        return acc.replace(regex, phValue);
      }, text);
    },
    [locale, translations]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};



