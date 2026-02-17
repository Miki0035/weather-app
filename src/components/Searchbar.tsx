import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { getWeather } from "../lib/api";
import useAppStore from "../store";

export function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const response = await getWeather(searchTerm);
      // console.log(`response`, response);
      useAppStore.setState({ weather: response });
    } catch (error) {
      console.log(`form submit`, error);
    }
  };
  return (
    <form
      role="search"
      className="w-full relative flex flex-col max-w-2xl sm:flex-row gap-2 sm:items-center"
      onSubmit={handleSubmit}
    >
      <div
        className="w-full flex items-center gap-2 bg-black-800 hover:bg-black-700 cursor-pointer
      rounded-lg py-3 pl-4 
      "
      >
        <Search className="size-7 text-black-200" />
        <input
          type="text"
          placeholder="Search for a place..."
          className="font-bricolage placeholder:text-black-200 bg-none text-white w-full caret-white outline-none hover:cursor-pointer"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-regular w-full hover:bg-blue-700
            hover:cursor-pointer py-3 px-5 rounded-lg sm:w-28"
      >
        Search
      </button>
    </form>
  );
}
