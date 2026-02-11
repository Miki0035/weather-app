import Navbar from "./components/Navbar";
import { Searchbar } from "./components/Searchbar";
import sunny from "./assets/images/icon-sunny.webp";
import rainyCloud from "./assets/images/icon-rain.webp";
import Chips from "./components/Chips";
import ForcastCard from "./components/ForcastCard";
import HourlyForecastSection from "./components/HourlyForecastSection";
const App = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12">
          <h1 className="font-bricolage font-bold text-5xl text-white text-center tracking-wide">
            How's the sky looking today?{" "}
          </h1>
          {/* Searcbar */}
          <Searchbar />
          {/* Grid Card */}
          <section className="w-full grid grid-cols-1  md:gap-3  md:grid-cols-3">
            {/* left side */}
            {/* upper grid */}
            <aside className="space-y-4  md:col-span-2">
              {/* image Card */}
              <div
                className={`w-full h-65 md:rounded-lg bg-(image:--bg-small)
                px-3 py-5
                bg-cover bg-no-repeat flex flex-col items-center 
                justify-center gap-2 md:flex-row  md:px-8
                md:justify-between sm:bg-(image:--bg-large)`}
              >
                {/* country name */}
                <div className="flex flex-col items-center md:items-start">
                  <h5 className="text-2xl text-white font-semibold">
                    Berlin, Germany
                  </h5>
                  <h4 className="text-md text-black-200">
                    Tuesday, Aug 5 ,2025
                  </h4>
                </div>
                {/* temperature */}
                <div className="flex items-center gap-5 md:gap-2">
                  <img src={sunny} alt="sun" className="size-24 md:size-32" />
                  <p className="font-semibold font-bricolage text-6xl md:text-8xl italic text-white">
                    68°
                  </p>
                </div>
              </div>
              {/* smaller card grid */}
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* smaller card */}
                <Chips label="Feels like" value="68°" />
                <Chips label="Feels like" value="68°" />
                <Chips label="Feels like" value="68°" />
                <Chips label="Feels like" value="68°" />
              </div>
              {/* Lower part */}
              <div className="mt-8">
                <h5 className="text-left text-xl text-white mb-5">
                  Daily forecast
                </h5>
                <div className="w-full flex gap-4 flex-wrap justify-start">
                  {/* forecast card */}
                  <ForcastCard
                    icon={rainyCloud}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={rainyCloud}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={rainyCloud}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={rainyCloud}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={rainyCloud}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={rainyCloud}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={rainyCloud}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                </div>
              </div>
            </aside>

            {/* right side */}
            <HourlyForecastSection />
          </section>
        </div>
      </main>
    </>
  );
};

export default App;
