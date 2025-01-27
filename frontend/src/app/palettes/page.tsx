'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Palette = {
  id: number;
  name: string;
  colors: string;  
};

const PalettesPage = () => {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [filteredPalettes, setFilteredPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const palettesPerPage = 9;  // Number of palettes per page

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
        setFilteredPalettes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching palettes:', error);
        setLoading(false);
      }
    };

    fetchPalettes();
  }, []);

  // Handle search and sorting functionality
  useEffect(() => {
    let filtered = palettes.filter((palette) =>
      palette.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredPalettes(filtered);
  }, [searchTerm, sortOrder, palettes]);

  // Calculate pagination
  const indexOfLastPalette = currentPage * palettesPerPage;
  const indexOfFirstPalette = indexOfLastPalette - palettesPerPage;
  const currentPalettes = filteredPalettes.slice(indexOfFirstPalette, indexOfLastPalette);

  const totalPages = Math.ceil(filteredPalettes.length / palettesPerPage);

  return (
    <section className="py-16 bg-background">
      <h2 className="text-4xl text-center text-secondary font-bold mb-10">
        All Color Palettes
      </h2>

      {/* Search and Filter Controls */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-6 mb-10">
        <input
          type="text"
          placeholder="Search palettes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg bg-primary text-textLight placeholder-textDark focus:outline-none"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-1/4 p-3 rounded-lg bg-primary text-textLight"
        >
          <option value="default">Sort by</option>
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-textDark">Loading palettes...</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
          {currentPalettes.map((palette) => {
            const colors = JSON.parse(palette.colors);
            return (
              <Link key={palette.id} href={`/palettes/${palette.id}`}>
                <div className="bg-primary rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
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
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="text-center mt-10 flex justify-center space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-secondary hover:bg-yellow-400'
          } text-background font-bold transition-all duration-300`}
        >
          Previous
        </button>

        <span className="text-textLight text-lg">{currentPage} of {totalPages}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-secondary hover:bg-yellow-400'
          } text-background font-bold transition-all duration-300`}
        >
          Next
        </button>
      </div>

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
