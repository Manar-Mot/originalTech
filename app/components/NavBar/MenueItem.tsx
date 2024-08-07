import React from 'react'
interface MenuItemProps{
    children: React.ReactNode;
    onClick:()=>void ;
}
const MenueItem:React.FC<MenuItemProps> = ({children,onClick}) => {
  return (
    <div onClick={onClick} className='px-4 py-3 hover:bg-neutral-100'>{children}</div>
  )
}

export default MenueItem