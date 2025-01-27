'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Palette = {
  id: number;
  name: string;
  colors: string;  
};

const PaletteDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [palette, setPalette] = useState<Palette | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    const fetchPalette = async () => {
      try {
        const response = await fetch(`http://localhost:5002/palettes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch palette');
        }
        const data = await response.json();
        setPalette(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching palette:', error);
        setLoading(false);
      }
    };

    fetchPalette();
  }, [id]);

  const copyToClipboard = (color: string, label: string) => {
    const formattedColor = `${label}: '${color}'`;
    navigator.clipboard.writeText(formattedColor);
    setCopiedColor(formattedColor);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  if (loading) {
    return <p className="text-center text-textDark mt-20">Loading palette...</p>;
  }

  if (!palette) {
    return <p className="text-center text-textDark mt-20">Palette not found</p>;
  }

  const colors = JSON.parse(palette.colors);

  return (
    <section className="py-16 bg-background text-textLight">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-secondary mb-6">{palette.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {colors.map((color: string, idx: number) => {
            const labels = ['primary', 'secondary', 'background', 'textLight', 'textDark'];
            const label = labels[idx] || `color-${idx + 1}`;

            return (
              <div 
                key={idx} 
                className="rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => copyToClipboard(color, label)}
              >
                <div 
                  className="h-40 flex items-center justify-center font-semibold"
                  style={{ backgroundColor: color }}
                >
                  <p className="text-background">{label}</p>
                </div>
                <div className="p-4 bg-primary text-lg font-semibold flex justify-between items-center">
                  <span>{label}: </span>
                  <span className="text-secondary">{color}</span>
                </div>
              </div>
            );
          })}
        </div>

        {copiedColor && (
          <p className="mt-6 text-secondary text-lg font-semibold">
            Copied: <span className="text-textLight">{copiedColor}</span>
          </p>
        )}

        <div className="mt-8">
          <button
            onClick={() => router.push('/palettes')}
            className="px-6 py-3 bg-secondary text-background font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300"
          >
            Back to Palettes
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaletteDetailsPage;
