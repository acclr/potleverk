import { getSettings } from "@/features/prismic/actions/getSettings";
import { getStringResources } from "@/features/prismic/actions/getStringResources";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { getDrawerMenu } from "@/features/prismic/actions/getDrawerMenu";
import { getHeaderMenu } from "@/features/prismic/actions/getHeaderMenu";

import ParallaxBackground from "@/components/parallax-background";
import Providers from "@/components/app-providers";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./globals.css";
import { LocalizationDocument, SettingsDocument } from "../prismicio-types";

const primary = Poppins({
  subsets: ["latin-ext"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-primary",
  preload: true,
});

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Potleverk",
  description: "CNC, design og trykkeri-tjenester",
  icons: "favicon.ico",
};

/**
 * @param {{ children: React.ReactNode }}
 */
export default async function RootLayout({ children }) {
  const [resources, settings, drawerMenu, headerMenu] = await Promise.all([
    getStringResources(),
    getSettings(),
    getDrawerMenu(),
    getHeaderMenu(),
  ]);

  return (
    <html lang="no" className={primary.variable}>
      <head>
        {/* 
        <Script
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T2VCMG5C');`
          }}
        /> */}

        <meta
          name="viewport"
          content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, target-densitydpi=device-dpi"
        />

        {/* <Script id="gtm" strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=AW-989964114" /> */}
      </head>

      <body className="pt-32 relative overflow-x-hidden bg-gray-50 font-primary font-normal leading-relaxed antialiased">
        <ParallaxBackground className="opacity-50 fixed -z-10 top-0 left-0 w-full h-full" />

        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T2VCMG5C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript> */}

        {/*
        {settings.data.addon_services.map((service: SettingsDocumentDataAddonServicesItem) => (
          <JsonLd<Service>
            key={service.name}
            item={{
              "@context": "https://schema.org",
              "@type": "Service",
              "name": service.name,
              "description": service.description ?? "",
              "offers": {
                "@type": "Offer",
                "price": service.price,
                "priceCurrency": "SEK"
              }
            }}
          />
        ))}
        */}

        <Providers
          resources={resources as LocalizationDocument}
          settings={settings as SettingsDocument}
        >
          <NextTopLoader
            color="#000"
            template='<div class="bar" role="bar"><div class="peg"></div></div>'
          />
          <Header />
          {children}
          <Footer />
        </Providers>

        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-W5Z14194S1"></script>

        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W5Z14194S1');
          `
          }}
        /> */}
      </body>
    </html>
  );
}
