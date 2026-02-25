import errorIcon from "../assets/images/icon-error.svg";
import retryIcon from "../assets/images/icon-retry.svg";

interface Props {
  handleGetWeather: () => void;
}
const Error = ({ handleGetWeather }: Props) => {
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <img src={errorIcon} alt="error icon" className="size-8" />
      <h1 className="w-full font-bri text-5xl text-white text-center tracking-wide sm:w-96 sm:leading-14 md:w-full">
        Something went wrong{" "}
      </h1>
      <p className="mx-auto max-w-md text-black-200 text-center">
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        className="hover:cursor-pointer hover:bg-black-600 bg-black-700 border border-black-600 text-white flex gap-2 p-2 rounded-lg"
        onClick={handleGetWeather}
      >
        {" "}
        <img src={retryIcon} alt="retry icon" /> Retry
      </button>
    </main>
  );
};

export default Error;
