'use client';

import { useStore } from '../../app/store';

export default function Rating({ rating, isBig, ratingCount }) {
  const theme = useStore((store) => store.theme);

  if (!rating) {
    rating = 0;
  }

  const formattedRating = rating / 10;
  return (
    <div className={`flex flex-col items-center `}>
      <div className={`relative ${!isBig && 'translate-y-[-2.5px]'}`}>
        <svg
          viewBox="0 0 110 110"
          style={{
            width: isBig ? '156px' : '118px',
            height: isBig ? '156px' : '118px',
          }}
        >
          <path
            strokeLinecap="round"
            strokeWidth="9"
            stroke={theme === 'light' ? '#E1E1E1' : '#2C2C2C'}
            fill="none"
            strokeDasharray="251.2, 251.2"
            d="M55 15 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
          ></path>
          <path
            strokeLinecap="round"
            strokeWidth="9"
            stroke="#44D36C"
            fill="none"
            d="M55 15 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
            style={{
              strokeDasharray: `${(251.2 / 100) * rating}px, 251.2px`,
              transition: 'stroke-dasharray 3s ease 0s',
            }}
          ></path>
        </svg>
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${isBig && "translate-y-[-6px]"}`}>
          <p
            className={`${
              isBig
                ? 'text-[36px] tracking-[2.2px] h-[46px]'
                : 'text-[24px] tracking-[1.5px]'
            } font-bold`}
          >
            {rating === 0 ? 'N/A' : formattedRating.toFixed(1)}
          </p>
          {isBig && (
            <p className="opacity-50 uppercase font-semibold tracking-[0.6px] text-[10px]">
              Masterpiece
            </p>
          )}
        </div>
      </div>
      <p className="opacity-50 uppercase font-semibold tracking-[0.72px] text-[12px]">
        {ratingCount} {isBig ? 'Critics' : 'Users'}
      </p>
    </div>
  );
}
