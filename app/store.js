"use client";

import { createWithEqualityFn } from "zustand/traditional";

// initiailizing theme from local storage, to make sure it only runs on the client
if (typeof window !== "undefined") {
  const themeStorage = localStorage.getItem("theme");
}

// creating store
export const useStore = createWithEqualityFn()(
  (set) => ({
    theme: "null",
    setTheme: (theme) => set(() => ({ theme: theme })),
    isWelcomed: false,
    setIsWelcomed: (isWelcomed) => set(() => ({ isWelcomed: isWelcomed })),
    headTitle: "",
    setHeadTitle: (headTitle) => set(() => ({ headTitle: headTitle })),
    activeMore: "",
    setActiveMore: (activeMore) => set(() => ({ activeMore: activeMore })),
    limit: 24,
    setLimit: (limit) => set(() => ({ limit: limit })),
  }),
  Object.is
);
