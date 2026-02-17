import logo from "../assets/images/logo.svg";
import gearIcon from "../assets/images/icon-units.svg";
import dropDownIcon from "../assets/images/icon-dropdown.svg";
import checkmark from "../assets/images/icon-checkmark.svg";

import useAppStore from "../store";
import { cn } from "../lib/utils";
import { ChevronUp } from "lucide-react";
import { useEffect, useRef } from "react";
import type { UnitType } from "../types";
import NavbarButton from "./NavbarButton";

const Navbar = () => {
  const {
    showDropdown,
    setShowDropdown,
    unitType,
    setUnitType,
    temperatureUnit: temperature,
    windSpeedUnit: windSpeed,
    percipitationUnit: percipitation,
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
    value: string,
  ) => {
    e.stopPropagation();
    setUnitType(value as UnitType);
  };

  return (
    <header className="flex justify-center sm:px-5">
      <nav className="w-full flex max-w-[1440px] justify-between items-center">
        <a href="/">
          <img
            src={logo}
            alt="logo"
            className="size-32 sm:size-42 object-contain"
          />
        </a>
        <div className="rounded-lg bg-black-800 p-3 hover:cursor-pointer hover:bg-black-700">
          {/* settings button */}
          <div
            ref={dropdownRef}
            className="font-sans flex gap-4 items-center text-sm relative"
            onClick={setShowDropdown}
          >
            <span>
              <img src={gearIcon} alt="gear" className="w-5 h-5 object-cover" />
            </span>
            <span className="text-white font-bri"> Units </span>
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
                `absolute z-100 top-10 -right-3 rounded-lg px-3 py-2 flex flex-col gap-3 transition-all w-64 bg-black-800`,
                showDropdown
                  ? "opacity-100  h-96"
                  : "opacity-0  h-0 pointer-events-none",
              )}
            >
              {/* Unit type button */}
              <NavbarButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleSelect(e, unitType == "metric" ? "imperial" : "metric")
                }
                className="text-md py-2 pl-3 text-white rounded-md text-left w-full hover:cursor-pointer hover:bg-black-600"
                children={
                  <>Switch to {unitType == "metric" ? "Metric" : "Imperial"}</>
                }
              />

              {/* Temperature button */}
              <div className="pb-2 border-b-1 border-black-600 cursor-default">
                <p className="text-black-300 pl-3">Temperature</p>
                {/* Celsius Button */}
                <div
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2 px-3 rounded-md text-left w-full hover:cursor-pointer",
                    temperature === "celsius" && "bg-black-700",
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
                <div
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2  px-3 rounded-md text-left w-full ",
                    temperature === "fahrenheit" && "bg-black-700",
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
                <div
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2 px-3 rounded-md text-left w-full ",
                    windSpeed === "kmh" && "bg-black-700",
                  )}
                  children={
                    <>
                      km/h{" "}
                      {windSpeed === "kmh" && (
                        <img src={checkmark} className="object-cover" />
                      )}
                    </>
                  }
                />
                {/* MPH Button */}
                <div
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2  px-3 rounded-md text-left w-full ",
                    windSpeed === "mph" && "bg-black-700",
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
                <div
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2 px-3 rounded-md text-left w-full ",
                    percipitation === "mm" && "bg-black-700",
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
                <div
                  className={cn(
                    "text-md text-white flex justify-between items-center  py-2  px-3 rounded-md text-left w-full ",
                    percipitation === "inch" && "bg-black-700",
                  )}
                  children={
                    <>
                      Inches (in)
                      {percipitation === "inch" && (
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
