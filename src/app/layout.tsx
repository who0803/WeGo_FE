import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/globals.css';
import { MswComponent } from '@/mocks/msw.component';
import QueryProviders from '@/utils/queryProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import MainHeader from '@/components/MainHeader/Header';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <MswComponent />
        <QueryProviders>
          <MainHeader />
          {children}
        </QueryProviders>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
