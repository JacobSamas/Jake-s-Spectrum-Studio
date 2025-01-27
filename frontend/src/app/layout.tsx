import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: "Jake's Spectrum Studio",
  description: 'Generate and explore amazing color palettes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
