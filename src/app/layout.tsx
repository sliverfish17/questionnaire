import './globals.css';

import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Questionnaire',
  description: 'Application meant to help you',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
