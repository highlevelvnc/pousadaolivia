import type { Metadata, Viewport } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { COMPANY, SITE_URL } from "@/lib/constants";

const display = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.name} | Pousada em Praia Linda, Sao Pedro da Aldeia`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Pousada familiar e acolhedora em Praia Linda / Balneario, Sao Pedro da Aldeia - RJ. Hospedagem tranquila perto da lagoa, com cafe da manha e atendimento personalizado.",
  keywords: [
    "pousada em Sao Pedro da Aldeia",
    "pousada Praia Linda",
    "pousada Balneario Sao Pedro da Aldeia",
    "hospedagem em Sao Pedro da Aldeia",
    "pousada familiar Regiao dos Lagos",
    "pousada perto da lagoa Sao Pedro da Aldeia",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: COMPANY.name,
    url: SITE_URL,
    title: `${COMPANY.name} | ${COMPANY.tagline}`,
    description:
      "Refugio em Praia Linda, Sao Pedro da Aldeia. Reserve direto pelo site ou WhatsApp.",
  },
  twitter: { card: "summary_large_image", title: COMPANY.name },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#234B6B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: COMPANY.name,
    description: "Pousada familiar em Praia Linda, Sao Pedro da Aldeia - RJ.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sao Pedro da Aldeia",
      addressRegion: "RJ",
      addressCountry: "BR",
      streetAddress: COMPANY.address,
    },
    telephone: COMPANY.phone,
    email: COMPANY.email,
    url: SITE_URL,
    priceRange: "R$ 290 - R$ 750",
    image: `${SITE_URL}/og.jpg`,
  };
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
        {children}
      </body>
    </html>
  );
}
