import { IconType } from "react-icons";

export interface BtnProps {
  label: string;
  disabled?: boolean;
  outLine?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface AvatarProps {
  src?: string | null | undefined;
  customStyles?:string;
  height?:number
  width?:number
}
