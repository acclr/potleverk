"use client";

import { AuthProvider } from "@/features/firebase/auth";
import { NotificationProvider } from "@/features/notifications";
import { LocaleProvider } from "@/features/translations/translations-context";
import { LazyMotion, domAnimation as features } from "framer-motion";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { SettingsProvider } from "@/features/settings/settings-provider";
import { defaultQueryClient } from "./default-query-client";
import { SettingsDocument } from "../prismicio-types";
import type { Resources } from "@/features/translations/translations-context";

const Providers = ({ children, settings, resources }: { children: React.ReactNode, settings?: SettingsDocument, resources?: Resources }) => {
  const [client] = useState(() => defaultQueryClient);

  return (
    <>
      {[
        [AuthProvider, {}],
        [QueryClientProvider, { client }],
        [LazyMotion, { features }],
        [NotificationProvider, {}],
        [LocaleProvider, { resources }],
        [SettingsProvider, { settings }],
      ].reduce((acc, [provider, props = {}], i) => {
        const Provider = provider as React.ComponentType<
          React.ComponentProps<keyof JSX.IntrinsicElements>
        >;

        return (
          <Provider key={i} {...(props as JSX.IntrinsicAttributes)}>
            {acc}
          </Provider>
        );
      }, children)}
    </>
  );
};

export default Providers;
