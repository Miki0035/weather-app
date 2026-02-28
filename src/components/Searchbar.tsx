import { Search } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { getCountries, getWeather } from "../lib/api";
import type { Country } from "../types";

export function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setCountries([]);
      await getWeather(searchTerm);
    } catch (error) {
      console.error(`form submit`, error);
    }
  };

  const handleClick = async (countryName: string) => {
    try {
      setCountries([]);
      await getWeather(countryName);
    } catch (error) {
      console.error(`country selected `, error);
    }
  };

  useEffect(() => {
    const handleSelect = setTimeout(async () => {
      const response = await getCountries(searchTerm);
      if (response !== undefined) setCountries(response);
    }, 500);

    // cleanup function for previous timeout
    return () => {
      clearTimeout(handleSelect);
    };
  }, [searchTerm]);

  return (
    <form
      role="search"
      className="w-full mx-auto flex flex-col max-w-2xl  sm:flex-row gap-2 sm:items-center"
      onSubmit={handleSubmit}
    >
      <div
        className="w-full relative flex items-center gap-2 bg-black-800 hover:bg-black-700 cursor-pointer
      rounded-lg py-3 pl-4 
      "
      >
        <Search className="size-7 text-black-200" />
        <input
          type="text"
          placeholder="Search for a place..."
          aria-label="Search city"
          className="font-bricolage placeholder:text-black-200 bg-none text-white w-full caret-white outline-none hover:cursor-pointer"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Drop down select */}
        {countries.length > 0 && (
          <div className="w-full p-2 rounded-lg max-w-xl absolute top-15 left-0 bg-black-800 space-y-3">
            {countries.slice(0, 5).map(({ id, name }) => (
              <button
                key={id}
                className={`
              w-full text-left text-white text-md p-2 bg-black-800 rounded-lg 
              hover:bg-black-600 hover:border-black-600 hover:cursor-pointer
              `}
                type="button"
                onClick={() => handleClick(name)}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white font-regular w-full hover:bg-blue-700
            hover:cursor-pointer py-3 px-5 rounded-lg sm:w-28 disabled:cursor-not-allowed disabled:bg-gray-500"
        disabled={searchTerm === ""}
      >
        Search
      </button>
    </form>
  );
}
