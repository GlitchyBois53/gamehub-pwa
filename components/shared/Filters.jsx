import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { filterPlatforms } from "../../constants";

export default function Filters({ searchParams }) {
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div>
      {filterPlatforms.map((platform) => {
        const route =
          pathname + "?" + createQueryString("platforms", platform.hardware);
        return (
          <div onClick={() => router.push(route)}>
            <h2>{platform.name}</h2>
          </div>
        );
      })}
    </div>
  );
}
