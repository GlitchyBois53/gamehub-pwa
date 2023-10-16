import { ClerkProvider } from '@clerk/nextjs';
import '../globals.css';
import { Barlow } from 'next/font/google';
import NavbarDesktop from '../../components/navigation/NavbarDesktop';
import ThemeProvider from '../../components/shared/ThemeProvider';
import Head from '../../components/shared/Head';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head />
        <ThemeProvider font={barlow.className}>
          <NavbarDesktop />
          <main className="ml-[100px] p-[24px] pl-[32px]">{children}</main>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
