import { IconType } from "react-icons";
import { BsMouse3 } from "react-icons/bs";
import { FaLaptop } from "react-icons/fa";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { GiPocketWatch } from 'react-icons/gi';
import {
  HiMiniDevicePhoneMobile,
  HiOutlineComputerDesktop,
  HiOutlineRadio,
} from "react-icons/hi2";
export interface Category {
  id: number;
  label: string;
  Icon: IconType;
}
export interface Color {
  color: string;
  colorCode: string;
  url?: string | null;
}
export const categories: Category[] = [
  { id: 1, label: "Mobiles", Icon: HiMiniDevicePhoneMobile },
  { id: 3, label: "Laptops", Icon: FaLaptop },
  { id: 4, label: "Radios", Icon: HiOutlineRadio },
  { id: 5, label: "Desktop ", Icon: HiOutlineComputerDesktop },
  { id: 7, label: "Mouses", Icon: BsMouse3 },
  { id: 8, label: "Watch", Icon: GiPocketWatch },
  { id: 6, label: "Other", Icon: HiOutlineDotsCircleHorizontal },
  
];
