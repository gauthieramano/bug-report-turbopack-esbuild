import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js | Bug report",
  description:
    "[Bug Report] 🐛 Turbopack build fails with `esbuild` as serverExternalPackage",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        {/* Map bare specifiers to ESM URLs */}
        <script
          type="importmap"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Load ESM
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                // To avoid Runtime TypeError: Failed to resolve module specifier "react/jsx-runtime". Relative references must start with either "/", "./", or "../".
                "react/jsx-runtime": "https://esm.sh/react@19.1.0/jsx-runtime",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
