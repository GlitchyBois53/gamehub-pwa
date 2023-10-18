'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useStore } from '../../app/store';

export default function Pagination({ searchParams, results, resultsPerPage }) {
  const router = useRouter();
  const theme = useStore((state) => state.theme);
  const pathname = usePathname();

  let offset = parseInt(searchParams.offset) || 0;
  const pageNumber = offset / resultsPerPage;

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
                  pathname +
                    '?' +
                    createQueryString('offset', offset - resultsPerPage)
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
            offset == 0 && 'opacity-30 cursor-not-allowed'
          }`}
        />
      </button>
      <p className="flex items-center justify-center font-bold">
        {parseInt(pageNumber.toFixed()) + 1}
      </p>
      <button
        onClick={
          results === resultsPerPage
            ? () => {
                router.push(
                  pathname +
                    '?' +
                    createQueryString('offset', offset + resultsPerPage)
                );
              }
            : null
        }
        className={`flex justify-center items-center border-l ${
          theme === 'light' ? 'border-l-black/20' : 'border-l-white/20'
        }`}
      >
        <img
          src="/arrow-icon-grad.svg"
          className={`h-[14px] object-contain ${
            results != resultsPerPage && 'opacity-30 cursor-not-allowed'
          }`}
        />
      </button>
    </div>
  );
}
