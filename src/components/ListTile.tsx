import { getHoursFromDateString } from "../lib/utils";
import useAppStore from "../store";

interface Props {
  icon: {
    src: string;
    alt: string;
  };
  time: string;
  temperature: string;
}

const ListTile = ({ icon, time, temperature }: Props) => {
  const { isLoading, isLoadingHourly } = useAppStore();

  if (isLoading || isLoadingHourly)
    return (
      <li
        className="w-full bg-black-700 border h-15 border-black-600 rounded-lg 
    flex justify-between items-center text-white px-2 py-2"
      ></li>
    );
  return (
    <li
      className="w-full bg-black-700 border border-black-600 rounded-lg 
    flex justify-between items-center text-white px-2 py-2"
    >
      {/* icon and time */}
      <div className="flex items-center justify-center gap-2">
        <img src={icon.src} alt={icon.alt} className="size-10" />
        <time className="text-lg">{getHoursFromDateString(time)} PM</time>
      </div>
      {/* temparature */}
      <p className="text-md">{temperature}</p>
    </li>
  );
};

export default ListTile;
