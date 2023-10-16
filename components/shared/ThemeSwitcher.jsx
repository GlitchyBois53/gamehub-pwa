'use client';

import { useStore } from '../../app/store';
import { shallow } from 'zustand/shallow';
import { motion as m } from 'framer-motion';

export default function ThemeSwitcher() {

  // importing the theme from the store
  const [theme, setTheme] = useStore(
    (store) => [store.theme, store.setTheme],
    shallow
  );

  // function that toggles the theme
  function handleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="flex gap-2 items-center justify-self-end">
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
          />
        </m.span>
      </button>
    </div>
  );
}
