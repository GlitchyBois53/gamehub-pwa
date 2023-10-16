import { ClerkProvider } from '@clerk/nextjs';
import '../globals.css';
import { Barlow } from 'next/font/google';
import ThemeProvider from '../../components/shared/ThemeProvider';
import Head from "../../components/shared/Head"

// import the font
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head isOnboarding={true} />
        <ThemeProvider font={barlow.className}>
          <main className="flex items-center justify-center min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
