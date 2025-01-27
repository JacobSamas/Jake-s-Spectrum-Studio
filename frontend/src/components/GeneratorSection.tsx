import Link from 'next/link';

const GeneratorSection = () => {
  return (
    <section className="py-16 bg-background text-textLight">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold text-secondary mb-6">
          Create Your Own Color Palette
        </h2>
        <p className="text-lg max-w-3xl mx-auto text-textDark mb-8">
          Experiment with different color combinations and save your favorite palettes for future use.
        </p>
        
        <div className="flex justify-center">
          <Link href="/generator">
            <button className="px-8 py-3 bg-secondary text-background font-bold rounded-xl shadow-lg hover:bg-yellow-400 transition-all duration-300">
              Start Generating
            </button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-primary rounded-2xl shadow-xl transition-all duration-300 hover:scale-105">
            <h3 className="text-3xl font-semibold text-textLight mb-4">Generate</h3>
            <p className="text-textDark text-lg">
              Instantly generate beautiful color palettes with a single click.
            </p>
          </div>

          <div className="p-8 bg-primary rounded-2xl shadow-xl transition-all duration-300 hover:scale-105">
            <h3 className="text-3xl font-semibold text-textLight mb-4">Lock</h3>
            <p className="text-textDark text-lg">
              Lock your favorite colors and generate new ones around them.
            </p>
          </div>

          <div className="p-8 bg-primary rounded-2xl shadow-xl transition-all duration-300 hover:scale-105">
            <h3 className="text-3xl font-semibold text-textLight mb-4">Save</h3>
            <p className="text-textDark text-lg">
              Save your palettes and access them anytime from your collection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratorSection;
