import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import Head from 'next/head'
import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 
export const viewport: Viewport = {
  themeColor: '#172554',
}

export const metadata: Metadata = {
  title: "CAIB Test",
  description: "The Canadian Accredited Insurance Broker (CAIB) Practice knowledge test",
  generator: 'Next.js',
  applicationName: 'CAIB Test',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'CAIB Test', 'The Canadian Accredited Insurance Broker (CAIB) Practice knowledge test', 'CAIB',
  ],
  authors: [
    { name: 'Nikita Kononenko (aka jadnast)', url: 'https://github.com/jadnast' }
  ],
  creator: 'Nikita Kononenko',
  publisher: 'Nikita Kononenko',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'CAIB Test',
    description: 'The Canadian Accredited Insurance Broker (CAIB) Practice knowledge test',
    siteName: 'CAIB Test',
    locale: 'en_EN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: 'brand/favicon-32x32.png',
    shortcut: 'brand/favicon.ico',
    apple: 'brand/apple-touch-icon.png',
    other: {
      rel: 'android-chrome',
      url: 'brand/android-chrome-192x192.png',
    },
  },
  manifest: 'brand/site.webmanifest',
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta property="og:image" content="/brand/cover.png"></meta>
        <meta itemProp={"image"} content="/brand/cover.png"></meta>
        <link rel="image_src" href="/brand/cover.png"></link>
        <meta property="og:image:width" content="1200"></meta>
        <meta property="og:image:height" content="630"></meta>
      </Head>
      <head />
      <body className={cn("min-h-screen min-w-80 bg-white font-sans",fontSans.variable)}>
        <div className="min-h-screen">
          <header className="bg-blue-950">
            <div className="flex flex-row items-center p-5 md:p-6 md:pl-5">
              <a href="/" className="text-base text-white md:text-lg font-medium" id="app-name">
                The Canadian Accredited Insurance Broker (CAIB) Practice knowledge test
              </a>
              {/*
              <div className="flex flex-grow flex-row items-center justify-end relative">
                <div className="ltr:mr-3 rtl:ml-3 md:mr-5 flex h-[36px] w-[36px] md:h-10 md:w-10 cursor-pointer flex-col justify-center gap-1 rounded-full bg-white px-2 py-2 lg:hidden">
                  <span className="mx-[2px] inline-block h-[2px] w-[16px] md:w-5 bg-purple"></span>
                  <span className="mx-[2px] block h-[2px] w-[16px] md:w-5 bg-purple"></span>
                  <span className="mx-[2px] block h-[2px] w-[16px] md:w-5 bg-purple"></span>
                </div>
                <div className="absolute mt-3 flex flex-col gap-4 rounded-lg border-[#dadcde] bg-white p-3 border-2 right-11 md:right-44 top-12 min-w-52 lg:hidden hidden">
                  <a className="hover:underline text-white" href="/home">
                    Practice test
                  </a>
                  <a href="https://www.icbc.com/learnhere" target="_blank" rel="noreferrer" className="text-white hover:underline">
                    Learn to Drive Smart
                  </a>
                  <a href="https://www.youtube.com/icbc" target="_blank" rel="noreferrer" className="text-white hover:underline">
                    Watch videos
                  </a>
                  <a href="https://www.icbc.com/locators/Pages/default.aspx?type=1&subtype=0" target="_blank" rel="noreferrer" className="text-white hover:underline">
                    Licensing offices
                  </a>
                </div>
                <ul className="hidden flex-grow justify-end gap-5 text-[14px] lg:flex ltr:mr-5 rtl:ml-5 text-white">
                  <li>
                    <a className="hover:underline" href="/home">
                      Practice test
                    </a>
                  </li>
                  <li>
                    <a href="https://www.icbc.com/learnhere" target="_blank" rel="noreferrer" className="hover:underline">
                      Learn to Drive Smart
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/icbc" target="_blank" rel="noreferrer" className="hover:underline">
                      Watch videos
                    </a>
                  </li>
                  <li>
                    <a href="https://www.icbc.com/locators/Pages/default.aspx?type=1&subtype=0" target="_blank" rel="noreferrer" className="hover:underline">
                      Licensing offices
                    </a>
                  </li>
                </ul>
              </div>
              */}
            </div>
          </header>

          {children}

        </div>
      </body>
    </html>
  )
}