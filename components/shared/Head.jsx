'use client';

import { usePathname } from 'next/navigation';
import { useStore } from '../../app/store';

export default function Head({ isOnboarding }) {
  // TODO: this components needs to be refactored, but the general idea is that it sets the title of the page based on the current path
  const headText = useStore((store) => store.headTitle);
  const pathname = usePathname();
  const pathSplit = pathname.split('/');
  let path = pathSplit[1];

  if (pathSplit.length === 3) {
    path = headText || pathSplit[2];
  }
  return (
    <head>
      <title>
        {pathname === '/'
          ? 'Home - GameHub'
          : path[0].toUpperCase() + path.slice(1) + ' - GameHub'}
      </title>
      {/* TODO: add SEO if needed */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>
    </head>
  );
}
