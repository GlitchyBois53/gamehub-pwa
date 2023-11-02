// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

"use client";

import { shallow } from "zustand/shallow";
import { useStore } from "../../app/store";

// This component is used to close the more menu
export default function Closer() {
  const [activeMore, setActiveMore] = useStore(
    (store) => [store.activeMore, store.setActiveMore],
    shallow
  );

  return (
    <>
      {activeMore !== "" && (
        <div
          onClick={() => setActiveMore("")}
          className="md:left-[100px] fixed inset-0 z-[25]"
        />
      )}
    </>
  );
}
