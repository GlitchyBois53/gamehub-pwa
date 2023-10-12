"use client"

import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Profile({ params }) {
  return (
    <div>
      <SignedIn>
        <h1 className='text-green-400'>{params.id}</h1>
      </SignedIn>
      <SignedOut>
        <h1 className='text-red-400'>{params.id}</h1>
      </SignedOut>
    </div>
  );
}
