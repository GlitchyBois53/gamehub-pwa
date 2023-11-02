// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import { useState, useEffect, useTransition, useRef } from "react";

// This hook is used to run a server action and wait for the result.
export function useServerAction(action, onFinished = null) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(null);
  const [finished, setFinished] = useState(false);
  const resolver = useRef(null);

  useEffect(() => {
    if (!finished) return;

    if (onFinished) onFinished(result);
    resolver.current(result);
  }, [result, finished]);

  const runAction = async (args) => {
    startTransition(async () => {
      var data = await action(args);

      setResult(data);
      setFinished(true);
    });

    return new Promise((resolve, reject) => {
      resolver.current = resolve;
    });
  };

  return [runAction, isPending];
}
