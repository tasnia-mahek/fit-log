import Hero from "./components/Hero";
// import WorkoutCard from "./components/WorkoutCard";

export default function Home() {
  return (
    <div className="w-full">
      
      <Hero />
 
      <section id="library" className="w-full pb-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-sans">
              The Library
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
          </div>
        </div>
      </section>
    </div>
  );
}