import { useEffect, useRef } from "react";
import dropDownIcon from "../assets/images/icon-dropdown.svg";
import { cn } from "../lib/utils";
import useAppStore from "../store";
import NavbarButton from "./NavbarButton";
const HourlyForecastSection = () => {
  const { day, setDay, showDays, setShowDays } = useAppStore();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    <div className="rounded-lg p-4 bg-black-700">
      <div className="w-full flex items-center justify-between">
        <h5 className="text-left text-md text-white">Hourly forecast</h5>

        <div className="rounded-lg bg-black-800 hover:cursor-pointer hover:bg-black-700">
          {/* menu button */}
          <div
            ref={dropdownRef}
            onClick={setShowDays}
            className="rounded-lg bg-black-800 p-3 hover:cursor-pointer hover:bg-black-700"
          >
            <menu className="flex gap-4 items-center text-sm relative">
              <span className="text-white font-Bricolage-bold"> {day} </span>
              <span>
                <img src={dropDownIcon} alt="arrow down" />
              </span>
              {/* menu items */}
              <div
                className={cn(
                  `absolute top-10 -right-3 rounded-2xl px-3 py-2 flex flex-col gap-3 transition-all w-48 bg-black-800`,
                  showDays
                    ? "opacity-100 pointer-events-auto h-88"
                    : "opacity-0 pointer-events-none h-0",
                )}
              >
                <NavbarButton
                  children={<p>Monday</p>}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDay("Monday");
                  }}
                  className="text-md py-2 pl-3 text-white rounded-md text-left w-full hover:cursor-pointer hover:bg-black-600"
                />
                <NavbarButton
                  children={<p>Tuesday</p>}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDay("Tuesday");
                  }}
                  className="text-md py-2 pl-3 text-white rounded-md text-left w-full hover:cursor-pointer hover:bg-black-600"
                />
                <NavbarButton
                  children={<p>Wednesday</p>}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDay("Wednesday");
                  }}
                  className="text-md py-2 pl-3 text-white rounded-md text-left w-full hover:cursor-pointer hover:bg-black-600"
                />
                <NavbarButton
                  children={<p>Thursday</p>}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDay("Thursday");
                  }}
                  className="text-md py-2 pl-3 text-white rounded-md text-left w-full hover:cursor-pointer hover:bg-black-600"
                />
                <NavbarButton
                  children={<p>Friday</p>}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDay("Friday");
                  }}
                  className="text-md py-2 pl-3 text-white rounded-md text-left w-full hover:cursor-pointer hover:bg-black-600"
                />
                <NavbarButton
                  children={<p>Saturday</p>}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDay("Saturday");
                  }}
                  className="text-md py-2 pl-3 text-white rounded-md text-left w-full hover:cursor-pointer hover:bg-black-600"
                />
                <NavbarButton
                  children={<p>Sunday</p>}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDay("Sunday");
                  }}
                  className="text-md py-2 pl-3 text-white rounded-md text-left w-full hover:cursor-pointer hover:bg-black-600"
                />
              </div>
            </menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecastSection;
