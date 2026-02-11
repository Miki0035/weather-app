interface Props {
  icon: string;
  day: string;
  highestTemp: string;
  lowestTemp: string;
}
const ForcastCard = ({ icon, day, highestTemp, lowestTemp }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 bg-black-800 rounded-lg  p-2 md:flex-1">
      <p className="text-white font-semibold text-md">{day}</p>
      <div className="flex justify-center items-center">
        <img src={icon} alt={icon} className="object-cover w-18 h-14" />
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="text-white text-md">{highestTemp}</p>
        <p className="text-black-300 text-md">{lowestTemp}</p>
      </div>
    </div>
  );
};

export default ForcastCard;
