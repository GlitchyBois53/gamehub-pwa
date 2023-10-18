import { ClerkProvider } from '@clerk/nextjs';
import '../globals.css';
import { Barlow } from 'next/font/google';
import NavbarDesktop from '../../components/navigation/NavbarDesktop';
import NavbarMobile from '../../components/navigation/NavbarMobile';
import ThemeProvider from '../../components/shared/ThemeProvider';
import Head from '../../components/shared/Head';
import { Toaster } from 'sonner';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head />
        <body>
          <ThemeProvider font={barlow.className}>
            <NavbarMobile />
            <NavbarDesktop />
            <main className="md:ml-[100px] mt-[96px] pb-[122px] md:pb-[36px] md:mt-0 p-[24px] md:pl-[32px]">
              {children}
            </main>
            <Toaster
              style={{
                fontFamily: 'Barlow',
                letterSpacing: '0.72px',
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
