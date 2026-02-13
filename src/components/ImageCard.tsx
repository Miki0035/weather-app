import sunny from "../assets/images/icon-sunny.webp";

interface Props {
  cityName: string;
  countryName: string;
  date: string;
  temperature: string;
}
const ImageCard = ({ cityName, countryName, date, temperature }: Props) => {
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
        <h5 className="text-2xl text-white font-semibold">
          {cityName} , {countryName}
        </h5>
        <h4 className="text-md text-black-200">{date}</h4>
      </div>
      {/* temperature */}
      <div className="flex items-center gap-5 md:gap-2">
        <img src={sunny} alt="sun" className="size-24 md:size-32" />
        <p className="font-semibold font-semibold text-6xl sm:text-8xl italic text-white">
          {temperature}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
