import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function filterSection({ param, value, name, searchParams }) {
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const router = useRouter();
  const pathname = usePathname();
  const route = pathname + "?" + createQueryString("param", value);
  return (
    <div onClick={() => router.push(route)}>
      <h2>{name}</h2>
    </div>
  );
}
