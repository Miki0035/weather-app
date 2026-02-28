import {
  convertDayToString,
  convertMonthToString,
  formatValue,
  validateWeatherIcon,
} from "../lib/utils";
import useAppStore from "../store";
import loadingIcon from "../assets/images/icon-loading.svg";

const ImageCard = () => {
  const { countryName, cityName, weather, temperatureUnit, isLoading } =
    useAppStore();
  // formates date to display
  const formatedDate = () => {
    const now = new Date();
    const day = convertDayToString(
      weather?.current.time.getDay() ?? now.getDay(),
    );
    const month = convertMonthToString(
      weather?.current.time.getMonth() ?? now.getMonth(),
    );
    const date = weather?.current.time.getDate() ?? now.getDate();
    const year = weather?.current.time.getFullYear() ?? now.getFullYear();
    return `${day}, ${month} ${date}, ${year} `;
  };

  if (isLoading)
    return (
      <div
        className={`w-full h-65 rounded-4xl 
                bg-black-700
                flex flex-col items-center 
                justify-center gap-2`}
      >
        <img src={loadingIcon} alt="loading icon" className="size-10" />
        <p className="text-black-200">Loading...</p>
      </div>
    );

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
        <h2 className="text-2xl text-white font-semibold">
          {cityName} , {countryName}
        </h2>
        <h4 className="text-md text-black-200">{formatedDate() ?? " "}</h4>
      </div>
      {/* temperature */}
      <div className="flex items-center gap-5 md:gap-2">
        <img
          src={validateWeatherIcon(weather?.current.weatherCode ?? 0).src}
          alt={validateWeatherIcon(weather?.current.weatherCode ?? 0).alt}
          className="size-24 md:size-32"
        />
        <p className="font-semibold font-semibold text-6xl sm:text-8xl italic text-white">
          {formatValue(weather?.current?.temperature)}
          {temperatureUnit === "celsius" ? "°C" : "°F"}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
