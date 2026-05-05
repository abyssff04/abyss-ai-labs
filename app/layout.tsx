import type { Metadata } from 'next';
import { Orbitron, Outfit, DM_Sans, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

/* ─── Font Configuration ──────────────────────────────────────────────────── */
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

/* ─── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Abyss AI Labs — Human Intelligence for Better AI Systems',
  description:
    'Abyss AI Labs is an AI evaluation agency that combines structured human reasoning with cutting-edge evaluation frameworks. We build trust in AI through rigorous, transparent, and consistent assessment.',
  keywords: [
    'AI evaluation',
    'RLHF',
    'human feedback',
    'AI alignment',
    'model evaluation',
    'AI quality',
    'Abyss AI Labs',
  ],
  openGraph: {
    title: 'Abyss AI Labs — Human Intelligence for Better AI Systems',
    description:
      'Structured human evaluation for AI models. Accuracy, Clarity, Engagement — assessed with precision.',
    type: 'website',
    // Replace with your actual domain after deployment
    url: 'https://abyssailabs.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abyss AI Labs',
    description: 'Human Intelligence for Better AI Systems',
  },
};

/* ─── Root Layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${orbitron.variable} ${outfit.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/* Favicon — replace public/favicon.svg with your own branding */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {/* next-themes ThemeProvider: attribute="class" activates .dark class on <html> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
