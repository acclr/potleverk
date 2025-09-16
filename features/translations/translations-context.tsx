"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { LocalizationDocument } from "../../prismicio-types";

export type Resources = Record<string, string>;

type TLocaleContext = React.PropsWithChildren<{
  resources?: LocalizationDocument;
  defaultLocale: string;
}>;

type TLocaleContextValue = {
  locale: string;
  resources: Resources;
  translate: (key: string) => string;
  setLocale: (locale: string) => void;
};

export const LocaleContext = createContext<TLocaleContextValue>({
  locale: 'no',
  resources: {},
  translate: () => '',
  setLocale: () => {}
});

export const LocaleProvider: React.FC<TLocaleContext> = ({ children, defaultLocale, resources })  => {
  const [locale, setLocale] = useState(defaultLocale);
  const localeResources = resources?.data?.resources?.reduce((acc, curr) => {
    // @ts-ignore
    acc[curr.key ?? ""] = curr.value ?? "";
    return acc;
  }, {}) ?? {};

  const translate = useCallback((key: string) => {
    // @ts-ignore
    return localeResources[key] || key;
  }, [locale]);
  
  const localeContext = useMemo(() => {
    return { 
      locale,
      resources: localeResources,
      translate, 
      setLocale }
  }, [locale, resources, translate, setLocale]);

  return (
    <LocaleContext.Provider value={localeContext}>{children}</LocaleContext.Provider>
  );
}

export const useLocale = () => {
  const { resources } = useContext(LocaleContext);
  return useRef(resources).current;
};
