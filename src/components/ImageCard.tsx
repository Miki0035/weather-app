import sunny from "../assets/images/icon-sunny.webp";
import { formatTemperature } from "../lib/utils";
import useAppStore from "../store";

const ImageCard = () => {
  const { countryName, cityName, day, weather, temperatureUnit } =
    useAppStore();

  return (
    <div
      className={`w-full h-65 rounded-4xl bg-(image:--bg-small)
                px-3 py-5
                bg-cover bg-no-repeat flex flex-col items-center 
                justify-center gap-2 sm:bg-(image:--bg-large) 
                sm:flex-row  sm:px-5 sm:h-65 sm:rounded-2xl
                sm:justify-between`}
    >
      {/* country name */}
      <div className="flex flex-col items-center sm:items-start">
        <h5 className="text-2xl text-white font-semibold">
          {cityName} , {countryName}
        </h5>
        <h4 className="text-md text-black-200">{day}</h4>
      </div>
      {/* temperature */}
      <div className="flex items-center gap-5 md:gap-2">
        <img src={sunny} alt="sun" className="size-24 md:size-32" />
        <p className="font-semibold font-semibold text-6xl sm:text-8xl italic text-white">
          {formatTemperature(weather?.current?.temperature)}
          {temperatureUnit === "celsius" ? "°C" : "°F"}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
