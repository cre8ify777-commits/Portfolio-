import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Aditya Kanchan | AI & Sales Professional',
  description: 'Marketing professional specializing in AI-driven tools, lead generation, and strategic customer engagement. 3-Time National MMA Champion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <Header />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
