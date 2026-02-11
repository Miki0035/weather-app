interface Props {
  label: string;
  value: string;
}

const Chips = ({ label, value }: Props) => {
  return (
    <div className="p-4 bg-black-700 rounded-lg border border-black-600">
      <p className="mb-2 text-sm font-medium text-black-200">{label}</p>
      <p className="text-white font-light text-xl">{value}</p>
    </div>
  );
};

export default Chips;
