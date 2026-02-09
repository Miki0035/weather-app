import Navbar from "./components/Navbar";
import { Searchbar } from "./components/Searchbar";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12">
          <h1 className="font-bricolage font-bold text-5xl text-white text-center tracking-wide">
            How's the sky looking today?{" "}
          </h1>
          {/* Searcbar */}
          <Searchbar />
        </div>
      </main>
    </>
  );
};

export default App;
