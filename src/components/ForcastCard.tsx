interface Props {
  icon: string;
  day: string;
  highestTemp: string;
  lowestTemp: string;
}
const ForcastCard = ({ icon, day, highestTemp, lowestTemp }: Props) => {
  return (
    <div
      className="flex flex-col items-center gap-4 bg-black-800 border border-black-600 
    rounded-lg px-2 py-3 grow sm:flex-1"
    >
      <p className="text-white font-semibold text-md">{day}</p>
      <div className="flex justify-center items-center">
        <img src={icon} alt={icon} className="object-contain size-14" />
      </div>
      <div className="w-full flex justify-between items-center text-base font-semibold">
        <p className="text-white">{highestTemp}</p>
        <p className="text-black-300">{lowestTemp}</p>
      </div>
    </div>
  );
};

export default ForcastCard;
