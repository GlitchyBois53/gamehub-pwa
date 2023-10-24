import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '../../app/store';
import { AnimatePresence, motion as m } from 'framer-motion';
import Hr from './Hr';

export default function DropDown({ name, options, searchParams, param, fn }) {
  const theme = useStore((state) => state.theme);
  const router = useRouter();
  const pathname = usePathname();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const currentChoice = options.find((option) => option.value === searchParams);

  return (
    <div className="relative">
      <h3 className="text-[10px] tracking-[0.6px] font-semibold uppercase mb-[7px]">
        {name}:
      </h3>
      <div
        className={`text-[11px] tracking-[0.66px] uppercase font-medium ${
          theme === 'light' ? 'border-black/20' : 'border-white/20'
        } border-[2px] rounded-[2px] px-[12px] py-[6px] flex gap-[7px] items-center cursor-pointer`}
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
      >
        <p className="min-w-[82px]">{currentChoice.name}</p>
        <m.img
          animate={{ rotate: isDropDownOpen ? -180 : 0 }}
          transition={{ duration: 0.2 }}
          src={theme === 'light' ? '/arrow-icon.svg' : '/arrow-icon-dark.svg'}
          alt="arrow-icon"
        />
      </div>
      <AnimatePresence>
        {isDropDownOpen && (
          <m.div
            initial={{ opacity: 0, y: -10, scaleY: 0, transformOrigin: 'top' }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0 }}
            className={`absolute bg shadow-search shadow-black/25 rounde-[2px] right-0 left-0 mt-[6px] ${
              theme === 'light' ? 'border-black/20' : 'border-white/20'
            } border-[2px]`}
          >
            {options.map((option, index) => {
              const route = pathname + '?' + fn(param, option.value);

              function handleClick() {
                router.push(route);
                setIsDropDownOpen(false);
              }

              return (
                <div
                  key={option.value}
                  onClick={handleClick}
                  className={`${
                    searchParams === option.value && 'font-semibold'
                  } text-[11px] tracking-[0.66px] uppercase cursor-pointer`}
                >
                  <>
                    <p className="px-[12px] py-[6px]">{option.name}</p>
                    {index !== options.length - 1 && <Hr />}
                  </>
                </div>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
