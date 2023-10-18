'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useStore } from '../../app/store';

export default function Pagination({ searchParams, results }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useStore((state) => state.theme);

  let offset = parseInt(searchParams.offset) || 0;
  const pageNumber = offset / 21;

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

  return (
    <div
      className={`h-[34px] border mx-auto ${
        theme === 'light' ? 'border-black/20' : 'border-white/20'
      } max-w-[121px] w-full grid grid-cols-pagination rounded-[2px]`}
    >
      <button
        onClick={
          offset !== 0
            ? () => {
                router.push(
                  pathname + '?' + createQueryString('offset', offset - 21)
                );
              }
            : null
        }
        className={`flex justify-center items-center border-r ${
          theme === 'light' ? 'border-r-black/20' : 'border-r-white/20'
        }`}
      >
        <img
          src="/arrow-icon-grad.svg"
          className={`h-[14px] object-contain rotate-180 ${
            offset == 0 && 'opacity-30'
          }`}
        />
      </button>
      <p className="flex items-center justify-center font-bold">
        {parseInt(pageNumber.toFixed()) + 1}
      </p>
      <button
        onClick={
          results === 21
            ? () => {
                router.push(
                  pathname + '?' + createQueryString('offset', offset + 21)
                );
              }
            : null
        }
        className={`flex justify-center items-center border-l ${
          theme === 'light' ? 'border-l-black/20' : 'border-l-white/20'
        }`}
      >
        <img src="/arrow-icon-grad.svg" className={`h-[14px] object-contain ${
            results != 21 && 'opacity-30'
          }`} />
      </button>
    </div>
  );
}
