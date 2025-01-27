'use client';

import { useState } from 'react';

type Color = {
  id: number;
  label: string;
  value: string;
  locked: boolean;
};

// Function to generate a random HEX color
const generateRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

const ColorPaletteGenerator = () => {
  const [colors, setColors] = useState<Color[]>([
    { id: 1, label: 'Primary', value: generateRandomColor(), locked: false },
    { id: 2, label: 'Secondary', value: generateRandomColor(), locked: false },
    { id: 3, label: 'Background', value: generateRandomColor(), locked: false },
    { id: 4, label: 'Text Light', value: generateRandomColor(), locked: false },
    { id: 5, label: 'Text Dark', value: generateRandomColor(), locked: false },
  ]);

  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Generate new colors for unlocked items
  const generatePalette = () => {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.locked ? color : { ...color, value: generateRandomColor() }
      )
    );
  };

  // Toggle lock/unlock a color
  const toggleLock = (id: number) => {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.id === id ? { ...color, locked: !color.locked } : color
      )
    );
  };

  // Copy color to clipboard with label
  const copyToClipboard = (color: string, label: string) => {
    const formattedColor = `${label}: '${color}'`;
    navigator.clipboard.writeText(formattedColor);
    setCopiedColor(formattedColor);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  // Save the palette to backend
  const savePalette = async () => {
    const paletteData = {
      name: `Palette-${new Date().getTime()}`, 
      colors: JSON.stringify(colors.map((color) => ({ label: color.label, value: color.value }))),
    };

    try {
      const response = await fetch('http://localhost:5002/palettes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paletteData),
      });

      if (!response.ok) {
        throw new Error('Failed to save the palette.');
      }

      setSaveStatus('Palette saved successfully!');
    } catch (error) {
      setSaveStatus('Error saving palette. Please try again.');
    }

    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <section className="py-16 bg-background text-textLight">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-secondary mb-6">Color Palette Generator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {colors.map((color) => (
            <div
              key={color.id}
              className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            >
              <div
                className="h-40 flex flex-col items-center justify-center font-semibold text-background"
                style={{ backgroundColor: color.value }}
                onClick={() => copyToClipboard(color.value, color.label)}
              >
                <p className="text-lg font-bold">{color.label}</p>
                <p className="text-sm">{color.value}</p>
              </div>
              <button
                className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-background text-sm font-bold ${
                  color.locked ? 'bg-green-600' : 'bg-gray-600'
                }`}
                onClick={() => toggleLock(color.id)}
              >
                {color.locked ? 'Locked' : 'Lock'}
              </button>
            </div>
          ))}
        </div>

        {copiedColor && (
          <p className="mt-6 text-secondary text-lg font-semibold">
            Copied: <span className="text-textLight">{copiedColor}</span>
          </p>
        )}

        {saveStatus && (
          <p className="mt-4 text-lg font-semibold text-green-400">
            {saveStatus}
          </p>
        )}

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={generatePalette}
            className="px-6 py-3 bg-secondary text-background font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300"
          >
            Generate New Palette
          </button>

          <button
            onClick={() => copyToClipboard(
              colors.map(c => `${c.label}: '${c.value}'`).join(', '),
              'Palette'
            )}
            className="px-6 py-3 bg-primary text-background font-bold rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300"
          >
            Copy Palette
          </button>

          <button
            onClick={savePalette}
            className="px-6 py-3 bg-green-500 text-background font-bold rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300"
          >
            Save Palette
          </button>
        </div>
      </div>
    </section>
  );
};

export default ColorPaletteGenerator;
