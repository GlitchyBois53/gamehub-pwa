"use client";

import { shallow } from "zustand/shallow";
import { useStore } from "../../app/store";

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
