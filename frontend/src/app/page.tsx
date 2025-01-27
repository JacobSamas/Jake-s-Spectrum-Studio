import Hero from '@/components/Hero';
import ColorPalette from '@/components/ColorPalette';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Hero />
      <ColorPalette />
      <HowItWorks />
    </main>
  );
}
