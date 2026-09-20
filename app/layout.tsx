import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import 'modern-normalize';
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ReactNode } from "react";

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

const BASE_URL = 'https://notehub.com/';

export const metadata: Metadata = {
  title: 'NoteHub - Your Personal Notes App',
  description: 'Manage, filter, and create notes easily with NoteHub.',
  openGraph: {
    title: 'NoteHub - Your Personal Notes App',
    description: 'Manage, filter, and create notes easily with NoteHub.',
    url: BASE_URL,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview image',
      },
    ],
  },
};

interface LayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  modal?: ReactNode;
}

export default function RootLayout({
  children, sidebar, modal,
}: Readonly<LayoutProps>) {
  return (
    <html lang="en">
      <body className={`{roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            <div className="flex">
              <aside className="w-64">
                {sidebar}
              </aside>
              <div className="flex-1">
                {children}
                {modal}
              </div>
            </div>
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
