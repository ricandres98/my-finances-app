type Props = {
  color?: string;
};

const ColorMark = ({ color }: Props) => {
  return (
    <div
      className={`inline-block mr-2 w-2 h-5 rounded-xs`}
      style={{ backgroundColor: color || "#a3b3ff" }}
    >
    </div>
  );
};

export { ColorMark };