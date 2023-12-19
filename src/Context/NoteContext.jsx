import { createContext, useState } from "react";

export const NoteContext = createContext(0);

export default function NoteContextProvider({ children }) {
  const [allNots, setAllNots] = useState(null);

  return (
    <NoteContext.Provider value={{ allNots, setAllNots }}>
      {children}
    </NoteContext.Provider>
  );
}
