import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "VozClin | Documentação clínica por voz com IA",
  description:
    "Landing premium do VozClin, um SaaS de apoio à documentação clínica por voz com IA, fichas estruturadas e revisão humana obrigatória.",
  applicationName: "VozClin",
  authors: [{ name: "VozClin" }],
  keywords: [
    "VozClin",
    "documentação clínica por voz",
    "SaaS saúde",
    "IA para clínicas",
    "ficha clínica",
    "revisão humana"
  ],
  openGraph: {
    title: "VozClin | Documentação clínica por voz com IA",
    description:
      "Transforme ditados e conversas clínicas em fichas estruturadas, revisáveis e prontas para conferência profissional.",
    type: "website",
    locale: "pt_BR",
    siteName: "VozClin"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
