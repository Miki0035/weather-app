import useAppStore from "../store";

interface Props {
  label: string;
  value?: string;
  measurement: string;
}

const Chips = ({ label, value, measurement }: Props) => {
  const { isLoading } = useAppStore();

  // console.log(`chipset data ${label}`, value);
  return (
    <div className="p-4 bg-black-800 rounded-lg border border-black-600">
      <p className="mb-2 text-lg font-medium text-black-200">{label}</p>
      <p className="text-white font-light text-3xl">
        {isLoading ? `—` : `${value}${measurement}`}
        {}
      </p>
    </div>
  );
};

export default Chips;
