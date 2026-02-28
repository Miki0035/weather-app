import Navbar from "./components/Navbar";
import { Searchbar } from "./components/Searchbar";
import Chips from "./components/Chips";
import ForcastCard from "./components/ForcastCard";
import HourlyForecastSection from "./components/HourlyForecastSection";
import ImageCard from "./components/ImageCard";
import { useEffect } from "react";
import { getWeather } from "./lib/api";
import useAppStore from "./store";
import {
  convertDayToString,
  formatValue,
  validateWeatherIcon,
} from "./lib/utils";
import Error from "./components/Error";
const App = () => {
  const { weather, unitType, hasError, cityName } = useAppStore();

  // const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    handleGetWeather();
  }, []);

  const handleGetWeather = async () => {
    // search term already exists
    if (cityName !== "") {
      await getWeather(cityName);
      return;
    }
    // initial load
    await getWeather("");
    return;
  };

  return (
    <>
      <Navbar />
      {hasError ? (
        <Error handleGetWeather={handleGetWeather} />
      ) : (
        <main className="mx-auto max-w-[1440px] px-2 sm:px-5">
          <div className="flex flex-col items-center gap-12">
            <h1 className="w-full font-bri text-5xl text-white text-center tracking-wide sm:w-96 sm:leading-14 md:w-full">
              How's the sky looking today?{" "}
            </h1>
            {/* Searcbar */}
            <Searchbar />
            {weather === null ? (
              <p className="text-center font-bold text-white text-xl">
                No search result found
              </p>
            ) : (
              <section className="w-full grid grid-cols-1 gap-10 lg:gap-5 lg:grid-cols-3 lg:pb-12">
                {/* left side */}
                {/* upper grid */}
                <div className="space-y-8 md:flex md:flex-col md:justify-between md:col-span-2">
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
                      measurement={unitType === "metric" ? " km/h" : " mph"}
                    />
                    <Chips
                      label="Percipitation"
                      value={`${formatValue(weather?.current.percipitation)}`}
                      measurement={unitType === "metric" ? " mm" : " inch"}
                    />
                  </div>
                  {/* Lower part */}
                  <div>
                    <h5 className="text-left text-xl font-semibold text-white mb-5">
                      Daily forecast
                    </h5>
                    <div className="w-full flex  gap-4 flex-wrap justify-start">
                      {/* forecast card */}
                      {Array.from({ length: 7 }, (_, i) => (
                        <ForcastCard
                          key={i}
                          icon={validateWeatherIcon(
                            weather?.daily.weatherCode[i] ?? 0,
                          )}
                          day={convertDayToString(
                            weather?.daily.time[i].getDay() ?? 0,
                          )}
                          highestTemp={`${formatValue(
                            weather?.daily.temperatureMax[i] ?? 0,
                          )}°`}
                          lowestTemp={`${formatValue(
                            weather?.daily.temperatureMin[i] ?? 0,
                          )}°`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* right side */}
                <HourlyForecastSection />
              </section>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default App;
