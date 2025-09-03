"use client";

import { createContext, useCallback, useContext, useRef } from "react";
import { type SettingsDocument } from "../../prismicio-types";

type TSettingsContext = React.PropsWithChildren<{
  settings: SettingsDocument;
}>;

export const SettingsContext = createContext<TSettingsContext>({
  settings: {} as SettingsDocument
});

export const SettingsProvider: React.FC<TSettingsContext> = ({ children, settings }) => (
  <SettingsContext.Provider value={{ settings }}>{children}</SettingsContext.Provider>
);

export const useSettings = () => {
  const { settings } = useContext(SettingsContext);
  return useRef(settings).current;
};
