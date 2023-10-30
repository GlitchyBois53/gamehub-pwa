"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import Button from "./Button";

export default function TooFar({ searchParams }) {
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleGoBack() {
    const path =
      pathname +
      "?" +
      createQueryString("offset", searchParams.offset - searchParams.limit);
    router.push(path);
  }

  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-[12px] min-h-container-mobile md:min-h-container my-[-36px]">
      <span className="text-[32px]">😵‍💫</span>
      <p className="text-center uppercase text-[14px] tracking-[0.84px] font-semibold mb-[24px]">
        Ooops Sonic, you wen't too far!
      </p>
      <Button text={"Go Back"} handleClick={handleGoBack} />
    </div>
  );
}
