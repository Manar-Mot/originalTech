import { IconType } from "react-icons";
interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
  borderColor: string;
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color, borderColor }) => {


  return (
    <div
      className={`${bg} ${color} border capitalize  ${borderColor} p-1 h-10 w-full text-sm rounded flex items-center justify-center gap-1`}
    >
      {text} <Icon size={15} />
    </div>
  );
};

export default Status;
