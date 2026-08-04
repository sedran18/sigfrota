// src/providers/FuelingDataProvider.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { SelectedGasStation } from "@/lib/actions/gasStation";
import { SelectedDriver } from "@/lib/actions/driver";

interface FuelingDataContextType {
  postos: SelectedGasStation<{ id: true; name: true }>[];
  motoristas: SelectedDriver<{ id: true; name: true }>[];
}

const FuelingDataContext = createContext({} as FuelingDataContextType);

export function FuelingDataProvider({
  children,
  postos,
  motoristas,
}: {
  children: ReactNode;
  postos: SelectedGasStation<{ id: true; name: true }>[];
  motoristas: SelectedDriver<{ id: true; name: true }>[];
}) {
  return (
    <FuelingDataContext.Provider value={{ postos, motoristas }}>
      {children}
    </FuelingDataContext.Provider>
  );
}

export const useFuelingData = () => useContext(FuelingDataContext);