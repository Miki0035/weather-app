import { Search } from "lucide-react";

export function Searchbar() {
  return (
    <form
      role="search"
      className="relative flex flex-col items-start sm:flex-row gap-5 sm:items-center"
    >
      <div
        className="w-full flex items-center gap-2 bg-black-800 hover:bg-black-700 cursor-pointer
      rounded-lg py-3 pl-4 w-lg 
      "
      >
        <Search className="size-7 text-black-200" />
        <input
          type="text"
          placeholder="Search for a place..."
          className="font-bricolage placeholder:text-black-200 bg-none text-white w-full caret-white outline-none hover:cursor-pointer"
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
