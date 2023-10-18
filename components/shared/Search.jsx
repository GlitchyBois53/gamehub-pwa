'use client';

import { useState } from 'react';
import { useStore } from '../../app/store';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Toast from './Toast';

export default function Search() {
  const [value, setValue] = useState('');
  const pathname = usePathname();
  const theme = useStore((state) => state.theme);
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    if (value) {
      router.push(`/search/?search=${value.toLowerCase()}`);
      return;
    }
    toast.custom((t) => (
      <Toast t={t} message={'Please enter a search term'} type={'error'} />
    ));
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`flex p-[16px] items-center ${
        theme === 'light'
          ? 'bg-back-light border-black/20 shadow-black/25'
          : 'bg-back-dark border-white/20 shadow-black/50'
      } transition-colors border rounded-[2px] md:max-w-[573px] shadow-search`}
    >
      <img
        src={`${
          theme === 'dark' ? '/search-icon-dark.png' : '/search-icon.png'
        }`}
        alt="search-icon"
        className="w-[18px] object-contain"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-transparent outline-none uppercase text-[14px] px-[16px] tracking-[0.84px] max-w-[573px] w-full"
        placeholder="Search for a game..."
      />
      {pathname.includes('/search') && (
        <img
          src={`/filter-icon${theme === 'dark' ? '-dark' : ''}.png`}
          alt="filter-icon"
          className="w-[18px] object-contain"
        />
      )}
    </form>
  );
}
