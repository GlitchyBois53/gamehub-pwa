'use client';

import { useStore } from '../../app/store';
import { shallow } from 'zustand/shallow';
import { motion as m } from 'framer-motion';
import { toast } from 'sonner';
import Toast from './Toast';

export default function ThemeSwitcher() {

  // importing the theme from the store
  const [theme, setTheme] = useStore(
    (store) => [store.theme, store.setTheme],
    shallow
  );

  // function that toggles the theme
  function handleTheme() {
    const toggle = theme === "dark" ? "light" : "dark";
    setTheme(toggle);
    localStorage.setItem("theme", toggle);
    toast.custom((t) => (
      <Toast t={t} type={'success'} message={`Theme set to ${toggle} mode`} />
    ));
  }

  return (
    <div className="flex gap-2 items-center justify-self-end md:-rotate-90 md:translate-y-[-16px]">
      <button
        onClick={handleTheme}
        className={`w-[53px] h-[27px] border rounded-full relative flex items-center ${
          theme === 'light' ? 'border-black/20' : 'border-white/20'
        }`}
      >
        {/* using framer motion to animate the toggle */}
        <m.span
          animate={theme === 'light' ? { x: 29 } : { x: 5 }}
          className={`w-[17px] h-[17px] translate-x-[5px] rounded-full absolute flex items-center justify-center bg-game-grad`}
        >
          <img
            src={theme === 'light' ? '/sun-icon.png' : '/moon.png'}
            alt="theme-icon"
            width={11}
            height={11}
            className='md:rotate-90'
          />
        </m.span>
      </button>
    </div>
  );
}
