'use client';

import Button from '../shared/Button';
import { useStore } from '../../app/store';
import { shallow } from 'zustand/shallow';
import { toast } from 'sonner';
import { setOnboarded } from '../../lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import Toast from '../shared/Toast';

export default function ThemePicker({ clerkId }) {
  const [theme, setTheme] = useStore(
    (store) => [store.theme, store.setTheme],
    shallow
  );
  const router = useRouter();

  function handleTheme() {
    const toggle = theme === 'dark' ? 'light' : 'dark';
    setTheme(toggle);
    localStorage.setItem('theme', toggle);
    toast.custom((t) => (
      <Toast t={t} type={'success'} message={`Theme set to ${toggle} mode`} />
    ));
  }

  async function handleFinish() {
    await setOnboarded({ clerkId: clerkId, onboarded: true });
    router.push('/');
  }

  return (
    <>
      <article className="flex flex-wrap justify-center items-center gap-[32px] pt-[83px] pb-[53px]">
        <Theme
          mode="light"
          image="/light-mode-desktop.png"
          theme={theme}
          handleTheme={handleTheme}
        />
        <Theme
          mode="dark"
          image="/dark-mode-desktop.png"
          theme={theme}
          handleTheme={handleTheme}
        />
      </article>
      <hr
        className={`w-full border-t-[0.5px] my-[24px] ${
          theme === 'light' ? 'border-black/20' : 'border-white/20'
        }`}
      />
      <Button
        text={'finish'}
        attributes="text-[16px] tracking-[0.96px] py-[13px]"
        buttonWidth={'w-full'}
        handleClick={handleFinish}
      />
    </>
  );
}

function Theme({ mode, image, theme, handleTheme }) {
  return (
    <section className="flex flex-col items-center gap-[13px]">
      <div
        onClick={handleTheme}
        className={`${
          mode === theme
            ? 'bg-game-grad'
            : theme === 'light'
            ? 'bg-black/20'
            : 'bg-white/20'
        } mx-[13px] rounded-[2px] cursor-pointer transition-colors relative`}
      >
        <div
          className={`${theme === 'light' ? 'bg-back-light' : 'bg-back-dark'} ${
            theme === mode ? 'inset-[3px]' : 'inset-[1px]'
          } rounded-[2px] absolute`}
        />
        <img
          src={image}
          alt={`${mode}-image`}
          className="max-w-[196px] z-20 relative"
        />
      </div>
      <h2 className="text-[14px] uppercase font-bold tracking-[0.72px]">
        {mode}
      </h2>
    </section>
  );
}
