"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useStore } from "../../app/store";

export default function Limit({ children, searchParams }) {
  const pathname = usePathname();
  const router = useRouter();
  const limit = useStore((state) => state.limit);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const path = pathname + "?" + createQueryString("limit", limit);

  useEffect(() => {
    if (limit !== 0) {
      router.push(path);
    }
  }, [limit]);
  console.log(limit);

  return <>{children}</>;
}
