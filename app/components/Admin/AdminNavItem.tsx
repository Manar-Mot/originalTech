import { IconType } from "react-icons";
interface AdminNavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
  open:boolean;
}
const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected,
  icon: Icon,
  label,
  open
}) => {
  return (
    
    <div
      className={`  rounded-md py-[16px] items-center transiton-all duration-200 ease-linear  
     hover:text-[#6c3abb]  hover:bg-slate-100 cursor-pointer ${
       selected
         ? " border-[#6c3abb] text-[#6c3abb] font-light"
         : "border-transparent text-slate-700"

     }  `}
    >
      <div className="w-fit flex flex-start gap-4 px-[8px]"><Icon size={20} className="mx-2" /><div className="font-md text-sm ">{label}</div></div>
    </div>
  );
};

export default AdminNavItem;
