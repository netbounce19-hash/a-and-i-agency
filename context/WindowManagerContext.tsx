"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type WindowId = "portfolio" | "services" | "contact";

interface WindowState {
  id: WindowId;
  isOpen: boolean;
  zIndex: number;
}

interface WindowManagerContextValue {
  windows: WindowState[];
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  isOpen: (id: WindowId) => boolean;
  getZ: (id: WindowId) => number;
}

const WindowManagerContext = createContext<WindowManagerContextValue>({
  windows: [],
  openWindow: () => {},
  closeWindow: () => {},
  focusWindow: () => {},
  isOpen: () => false,
  getZ: () => 10,
});

const INITIAL_WINDOWS: WindowState[] = [
  { id: "portfolio", isOpen: false, zIndex: 10 },
  { id: "services", isOpen: false, zIndex: 10 },
  { id: "contact", isOpen: false, zIndex: 10 },
];

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [topZ, setTopZ] = useState(100);

  const focusWindow = useCallback(
    (id: WindowId) => {
      setTopZ((z) => z + 1);
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: topZ + 1 } : w))
      );
    },
    [topZ]
  );

  const openWindow = useCallback(
    (id: WindowId) => {
      setTopZ((z) => z + 1);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, isOpen: true, zIndex: topZ + 1 } : w
        )
      );
    },
    [topZ]
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  }, []);

  const isOpen = useCallback(
    (id: WindowId) => windows.find((w) => w.id === id)?.isOpen ?? false,
    [windows]
  );

  const getZ = useCallback(
    (id: WindowId) => windows.find((w) => w.id === id)?.zIndex ?? 10,
    [windows]
  );

  return (
    <WindowManagerContext.Provider
      value={{ windows, openWindow, closeWindow, focusWindow, isOpen, getZ }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  return useContext(WindowManagerContext);
}
