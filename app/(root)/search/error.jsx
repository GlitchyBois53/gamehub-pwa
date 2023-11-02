// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

"use client"; // Error components must be Client Components

import { useEffect } from "react";
import ErrorComponent from "../../../components/shared/Error";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorComponent error={error} reset={reset} />;
}
