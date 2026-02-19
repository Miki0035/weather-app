import Navbar from "./components/Navbar";
import { Searchbar } from "./components/Searchbar";
import Chips from "./components/Chips";
import ForcastCard from "./components/ForcastCard";
import HourlyForecastSection from "./components/HourlyForecastSection";
import ImageCard from "./components/ImageCard";
import { useEffect } from "react";
import { getWeather } from "./lib/api";
import useAppStore from "./store";
import { formatValue, validateWeatherIcon } from "./lib/utils";
const App = () => {
  const { weather, unitType } = useAppStore();

  useEffect(() => {
    getWeather("");
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-2 sm:px-5">
        <div className="flex flex-col items-center gap-12">
          <h1 className="w-full font-bri text-5xl text-white text-center tracking-wide sm:w-96 sm:leading-14 md:w-full">
            How's the sky looking today?{" "}
          </h1>
          {/* Searcbar */}
          <Searchbar />
          {/* Grid Card */}
          <section className="w-full grid grid-cols-1 gap-10 lg:gap-5 lg:grid-cols-3 lg:pb-12">
            {/* left side */}
            {/* upper grid */}
            <aside className="space-y-8 md:flex md:flex-col md:justify-between md:col-span-2">
              {/* image Card */}
              <ImageCard />
              {/* smaller card grid */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* smaller card */}
                <Chips
                  label="Feels like"
                  value={`${formatValue(weather?.current?.apparentTemperature)}`}
                  measurement="°"
                />
                <Chips
                  label="Humidity"
                  value={`${formatValue(weather?.current?.relativeHumidity)}`}
                  measurement="%"
                />
                <Chips
                  label="Wind"
                  value={`${formatValue(weather?.current?.windSpeed)}`}
                  measurement={unitType === "metric" ? "km/h" : "mph"}
                />
                <Chips
                  label="Percipitation"
                  value={`${weather?.current.percipitation}`}
                  measurement={unitType === "metric" ? "mm" : "in"}
                />
              </div>
              {/* Lower part */}
              <div className="mt-8">
                <h5 className="text-left text-xl font-semibold text-white mb-5">
                  Daily forecast
                </h5>
                <div className="w-full flex  gap-4 flex-wrap justify-start">
                  {/* forecast card */}
                  <ForcastCard
                    icon={validateWeatherIcon(
                      weather?.current.weatherCode ?? 0,
                    )}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={validateWeatherIcon(
                      weather?.current.weatherCode ?? 0,
                    )}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={validateWeatherIcon(
                      weather?.current.weatherCode ?? 0,
                    )}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={validateWeatherIcon(
                      weather?.current.weatherCode ?? 0,
                    )}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={validateWeatherIcon(
                      weather?.current.weatherCode ?? 0,
                    )}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={validateWeatherIcon(
                      weather?.current.weatherCode ?? 0,
                    )}
                    day="Tue"
                    highestTemp="20°"
                    lowestTemp=" 14°"
                  />
                  <ForcastCard
                    icon={validateWeatherIcon(
                      weather?.current.weatherCode ?? 0,
                    )}
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
