import logo from "../assets/images/logo.svg";
import gearIcon from "../assets/images/icon-units.svg";
import dropDownIcon from "../assets/images/icon-dropdown.svg";
import checkmark from "../assets/images/icon-checkmark.svg";

import useAppStore from "../store";
import { cn } from "../lib/utils";
import { ChevronUp } from "lucide-react";
import { useEffect, useRef } from "react";
import type { PrecipitationType, UnitType } from "../types";
import NavbarButton from "./NavbarButton";

const Navbar = () => {
  const {
    showDropdown,
    setShowDropdown,
    unitType,
    setUnitType,
    setTemperature,
    temperature,
    setWindSpeed,
    windSpeed,
    setPercipitation,
    percipitation,
  } = useAppStore();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown();
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowDropdown, showDropdown]);

  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    changeState: string,
    value: string,
  ) => {
    e.stopPropagation();
    switch (changeState) {
      case "unit":
        setUnitType(value as UnitType);
        break;
      case "temperature":
        setTemperature(value);
        break;

      case "windspeed":
        setWindSpeed(value);
        break;

      case "precipitation":
        setPercipitation(value as PrecipitationType);
        break;
    }
  };

  return (
    <header className="p-5 flex justify-center">
      <nav className="w-full flex max-w-7xl justify-between items-center p-7">
        <a href="/">
          <img src={logo} alt="logo" className="object-cover" />
        </a>
        <div className="rounded-lg bg-black-800 p-3 hover:cursor-pointer hover:bg-black-700">
          {/* settings button */}
          <div
            ref={dropdownRef}
            className="flex gap-4 items-center text-sm relative"
            onClick={setShowDropdown}
          >
            <span>
              <img src={gearIcon} alt="gear" className="w-5 h-5 object-cover" />
            </span>
            <span className="text-white font-Bricolage-bold"> Units </span>
            <span>
              {showDropdown ? (
                <ChevronUp className="text-white w-5 h-5" />
              ) : (
                <img src={dropDownIcon} alt="arrow down" />
              )}
            </span>
            {/* menu items */}
            <div
              className={cn(
                `absolute top-10 -right-3 rounded-lg px-3 py-2 flex flex-col gap-3 transition-all w-64 bg-black-800`,
                showDropdown
                  ? "opacity-100 pointer-events-auto h-96"
                  : "opacity-0 pointer-events-none h-0",
              )}
            >
              {/* Unit type button */}
              <NavbarButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleSelect(
                    e,
                    "unit",
                    unitType == "metric" ? "imperial" : "metric",
                  )
                }
                className="text-md py-2 pl-3 text-white rounded-md text-left w-full hover:cursor-pointer hover:bg-black-600"
                children={
                  <>Switch to {unitType == "metric" ? "Metric" : "Imperial"}</>
                }
              />

              {/* Temperature button */}
              <div className="pb-2 border-b-1 border-black-600">
                <p className="text-black-300 pl-3">Temperature</p>
                {/* Celsius Button */}
                <NavbarButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSelect(e, "temperature", "celsius")
                  }
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2 px-3 rounded-md text-left w-full hover:cursor-pointer",
                    temperature === "celsius"
                      ? "bg-black-700"
                      : "hover:bg-black-600",
                  )}
                  children={
                    <>
                      Celsius (°C)
                      {temperature === "celsius" && (
                        <img src={checkmark} className="object-cover" />
                      )}
                    </>
                  }
                />

                {/* Fahrenheit Button */}
                <NavbarButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSelect(e, "temperature", "fahrenheit")
                  }
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2  px-3 rounded-md text-left w-full hover:cursor-pointer",
                    temperature === "fahrenheit"
                      ? "bg-black-700"
                      : "hover:bg-black-600",
                  )}
                  children={
                    <>
                      Fahrenheit (°F)
                      {temperature === "fahrenheit" && (
                        <img src={checkmark} className="object-cover" />
                      )}
                    </>
                  }
                />
              </div>

              {/* Wind Speed button */}
              <div className="pb-2 border-b-1 border-black-600">
                <p className="text-black-300 pl-3">Wind Speed</p>
                {/* KM/H Button */}
                <NavbarButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSelect(e, "windspeed", "km/h")
                  }
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2 px-3 rounded-md text-left w-full hover:cursor-pointer",
                    windSpeed === "km/h"
                      ? "bg-black-700"
                      : "hover:bg-black-600",
                  )}
                  children={
                    <>
                      km/h{" "}
                      {windSpeed === "km/h" && (
                        <img src={checkmark} className="object-cover" />
                      )}
                    </>
                  }
                />
                {/* MPH Button */}
                <NavbarButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSelect(e, "windspeed", "mph")
                  }
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2  px-3 rounded-md text-left w-full hover:cursor-pointer",
                    windSpeed === "mph" ? "bg-black-700" : "hover:bg-black-600",
                  )}
                  children={
                    <>
                      mph{" "}
                      {windSpeed === "mph" && (
                        <img src={checkmark} className="object-cover" />
                      )}
                    </>
                  }
                />
              </div>

              {/* Precipitation */}
              <div className="pb-2 border-b-1 border-black-600">
                <p className="text-black-300 pl-3">Precipitation</p>
                {/* mm Button */}
                <NavbarButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSelect(e, "precipitation", "mm")
                  }
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2 px-3 rounded-md text-left w-full hover:cursor-pointer",
                    percipitation === "mm"
                      ? "bg-black-700"
                      : "hover:bg-black-600",
                  )}
                  children={
                    <>
                      Millimeters (mm)
                      {percipitation === "mm" && (
                        <img src={checkmark} className="object-cover" />
                      )}
                    </>
                  }
                />
                {/* In Button */}
                <NavbarButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSelect(e, "precipitation", "in")
                  }
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2  px-3 rounded-md text-left w-full hover:cursor-pointer",
                    percipitation === "in"
                      ? "bg-black-700"
                      : "hover:bg-black-600",
                  )}
                  children={
                    <>
                      Inches (in)
                      {percipitation === "in" && (
                        <img src={checkmark} className="object-cover" />
                      )}
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
