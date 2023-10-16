'use client';

import { usePathname } from 'next/navigation';

export default function Head({ isOnboarding }) {
  // TODO: this components needs to be refactored, but the general idea is that it sets the title of the page based on the current path
  const pathname = usePathname();
  const pathSplit = pathname.split('/');
  let path = pathSplit[1];

  if (pathSplit.length === 3) {
    path = pathSplit[2];
  }
  return (
    <head>
      <title>
        {pathname === '/'
          ? 'Home - GameHub'
          : path[0].toUpperCase() + path.slice(1) + ' - GameHub'}
      </title>
      {/* TODO: add SEO if needed */}
    </head>
  );
}
