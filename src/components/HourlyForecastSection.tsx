import { useEffect, useMemo, useRef } from "react";
import dropDownIcon from "../assets/images/icon-dropdown.svg";
import {
  cn,
  convertDayToString,
  formatValue,
  validateWeatherIcon,
} from "../lib/utils";
import useAppStore from "../store";
import NavbarButton from "./NavbarButton";
import ListTile from "./ListTile";
import { getHourlyWeather } from "../lib/api";

const HourlyForecastSection = () => {
  const { day, showDays, setShowDays, weather, isLoading } = useAppStore();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const displayDay = convertDayToString(day.getDay());

  // To get every day of the week
  const week = useMemo(() => {
    const firstDay = new Date(day);

    // Go back to Sunday
    firstDay.setDate(day.getDate() - day.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(firstDay);
      day.setDate(firstDay.getDate() + i);
      return day;
    });
  }, [day]);

  const handleDayChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    date: Date,
  ) => {
    e.stopPropagation();
    // get hourly weather from api
    await getHourlyWeather(date);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDays();
      }
    }

    if (showDays) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowDays, showDays]);

  return (
    <div className="w-full rounded-xl p-4 bg-black-800">
      {/* header */}
      <div className="w-full flex items-center justify-between">
        <h3 className="text-left text-lg font-semibold text-white">
          Hourly forecast
        </h3>

        {/* menu button */}
        <div
          ref={dropdownRef}
          onClick={setShowDays}
          className="rounded-lg bg-black-700 p-3 hover:cursor-pointer hover:bg-black-600"
        >
          <menu className="flex gap-4 items-center text-sm relative">
            <li className="text-white font-Bricolage-bold">
              {isLoading ? "—" : displayDay}
            </li>
            <span>
              <img src={dropDownIcon} alt="arrow down icon" />
            </span>
            {/* menu items */}
            <div
              className={cn(
                `absolute top-10 -right-3 rounded-xl px-3 py-2 flex flex-col gap-3 transition-all w-48 bg-black-800 
                border border-black-600`,
                showDays && !isLoading
                  ? "opacity-100 pointer-events-auto h-88"
                  : "opacity-0 pointer-events-none h-0",
              )}
            >
              <NavbarButton
                children={<p>{convertDayToString(week[0].getDay())}</p>}
                onClick={(e) => handleDayChange(e, week[0])}
                className={cn(
                  `text-md py-2 pl-3 text-white rounded-md 
                  text-left w-full hover:cursor-pointer
                    `,
                  day.getDay() === week[0].getDay()
                    ? "bg-black-600"
                    : "hover:bg-black-600",
                )}
              />
              <NavbarButton
                children={<p>{convertDayToString(week[1].getDay())}</p>}
                onClick={(e) => handleDayChange(e, week[1])}
                className={cn(
                  `text-md py-2 pl-3 text-white rounded-md 
                  text-left w-full hover:cursor-pointer
                    `,
                  day.getDay() === week[1].getDay()
                    ? "bg-black-600"
                    : "hover:bg-black-600",
                )}
              />
              <NavbarButton
                children={<p>{convertDayToString(week[2].getDay())}</p>}
                onClick={(e) => handleDayChange(e, week[2])}
                className={cn(
                  `text-md py-2 pl-3 text-white 
                  rounded-md text-left w-full 
                  hover:cursor-pointer
                    `,
                  day.getDay() === week[2].getDay()
                    ? "bg-black-600"
                    : "hover:bg-black-600",
                )}
              />
              <NavbarButton
                children={<p>{convertDayToString(week[3].getDay())}</p>}
                onClick={(e) => handleDayChange(e, week[3])}
                className={cn(
                  `text-md py-2 pl-3 text-white rounded-md 
                  text-left w-full hover:cursor-pointer`,
                  day.getDay() === week[3].getDay()
                    ? "bg-black-600"
                    : "hover:bg-black-600",
                )}
              />
              <NavbarButton
                children={<p>{convertDayToString(week[4].getDay())}</p>}
                onClick={(e) => handleDayChange(e, week[4])}
                className={cn(
                  `text-md py-2 pl-3 text-white rounded-md 
                  text-left w-full hover:cursor-pointer
                    `,
                  day.getDay() === week[4].getDay()
                    ? "bg-black-600"
                    : "hover:bg-black-600",
                )}
              />
              <NavbarButton
                children={<p>{convertDayToString(week[5].getDay())}</p>}
                onClick={(e) => handleDayChange(e, week[5])}
                className={cn(
                  `text-md py-2 pl-3 text-white 
                  rounded-md text-left w-full 
                  hover:cursor-pointer
                    `,
                  day.getDay() === week[5].getDay()
                    ? "bg-black-600"
                    : "hover:bg-black-600",
                )}
              />
              <NavbarButton
                children={<p>{convertDayToString(week[6].getDay())}</p>}
                onClick={(e) => handleDayChange(e, week[6])}
                className={cn(
                  `text-md py-2 pl-3 text-white rounded-md 
                  text-left w-full hover:cursor-pointer
                    `,
                  day.getDay() === week[6].getDay()
                    ? "bg-black-600"
                    : "hover:bg-black-600",
                )}
              />
            </div>
          </menu>
        </div>
      </div>

      {/* list tile */}
      <ul className="w-full h-full pt-5 space-y-5 overflow-y-auto">
        {Array.from({ length: 8 }, (_, i) => (
          <ListTile
            key={i}
            icon={validateWeatherIcon(weather?.hourly.weatherCode[i] ?? 0)}
            time={`${weather?.hourly.time[i]}`}
            temperature={`${formatValue(
              weather?.hourly.apparentTemperature[i],
            )}°`}
          />
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecastSection;
