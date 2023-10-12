import { ClerkProvider } from '@clerk/nextjs';
import '../globals.css';
import { Barlow } from 'next/font/google';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Gamehub</title>
        </head>
        <body className={barlow.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
