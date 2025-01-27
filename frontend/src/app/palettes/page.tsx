'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Palette = {
  id: number;
  name: string;
  colors: string;  
};

const PalettesPage = () => {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const response = await fetch('http://localhost:5002/palettes');
        if (!response.ok) {
          throw new Error('Failed to fetch palettes');
        }
        const data = await response.json();
        setPalettes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching palettes:', error);
        setLoading(false);
      }
    };

    fetchPalettes();
  }, []);

  return (
    <section className="py-16 bg-background">
      <h2 className="text-4xl text-center text-secondary font-bold mb-10">
        All Color Palettes
      </h2>

      {loading ? (
        <p className="text-center text-textDark">Loading palettes...</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
          {palettes.map((palette) => {
            const colors = JSON.parse(palette.colors);
            return (
              <div
                key={palette.id}
                className="bg-primary rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-textLight">{palette.name}</h3>
                </div>
                <div className="flex">
                  {colors.map((color: string, idx: number) => (
                    <div
                      key={idx}
                      className="h-20 flex-1"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="text-center mt-10">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-secondary text-background font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

export default PalettesPage;
