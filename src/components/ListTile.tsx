interface Props {
  icon: string;
  time: string;
  temperature: string;
}

const ListTile = ({ icon, time, temperature }: Props) => {
  return (
    <li
      className="w-full bg-black-700 border border-black-600 rounded-lg 
    flex justify-between items-center text-white px-2 py-2"
    >
      {/* icon and time */}
      <div className="flex items-center justify-center gap-2">
        <img src={icon} alt="cloudy" className="size-10" />
        <time className="text-lg">{time}</time>
      </div>
      {/* temparature */}
      <p className="text-md">{temperature}</p>
    </li>
  );
};

export default ListTile;
