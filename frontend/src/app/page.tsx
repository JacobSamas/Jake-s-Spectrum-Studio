import Hero from '@/components/Hero';
import ColorPalette from '@/components/ColorPalette';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Hero />
      <ColorPalette />
    </main>
  );
}
