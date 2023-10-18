'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import Toast from './Toast';

export default function WelcomeWrapper({ children, clerkUser, username }) {
  let count = 0;

  useEffect(() => {
    if (clerkUser && count < 1) {
      toast.custom((t) => (
        <Toast t={t} type={'message'} message={`Welcome ${username}`} />
      ));
      count = count + 1;
    }
  }, []);

  return <div>{children}</div>;
}
