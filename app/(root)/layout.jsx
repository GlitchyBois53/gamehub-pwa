import { ClerkProvider } from '@clerk/nextjs';
import '../globals.css';
import { Barlow } from 'next/font/google';
import NavbarDesktop from '../../components/navigation/NavbarDesktop';
import NavbarMobile from '../../components/navigation/NavbarMobile';
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
          <NavbarMobile />
          <NavbarDesktop />
          <main className="md:ml-[100px] mt-[92px] md:mt-0 p-[24px] md:pl-[32px]">{children}</main>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
