"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import Toast from "./Toast";
import { useStore } from "../../app/store";
import { shallow } from "zustand/shallow";

// this component is used to show a welcome message to the user when they first log in
export default function WelcomeWrapper({ children, clerkUser, username }) {
  let count = 0;
  const [isWelcomed, setIsWelcomed] = useStore(
    (store) => [store.isWelcomed, store.setIsWelcomed],
    shallow
  );

  useEffect(() => {
    if (clerkUser && count < 1 && !isWelcomed) {
      toast.custom((t) => (
        <Toast
          t={t}
          type={"message"}
          message={`Welcome ${
            username[0].toUpperCase() + username.slice(1).toLowerCase()
          }`}
        />
      ));
      count = count + 1;
      setIsWelcomed(true);
    }
  }, []);

  return <div>{children}</div>;
}
