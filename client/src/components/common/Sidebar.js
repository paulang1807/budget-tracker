import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

// import { AccountList } from './AccountList';

//import react pro sidebar components
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";

import '../../styles/common/Sidebar.css';

import { BiChevronLeft } from "react-icons/bi";

export const Sidebar = (props) => {

  const { componentMenu, componentText } = props;

  const { toggleAccountView } 
          = useContext(GlobalContext);

  const menuIconClick = () => {
    toggleAccountView(false);
  };

  return (
    componentMenu ? 
    (<div id="acctsbar">
        <ProSidebar collapsed={false}>
          <SidebarHeader>
            <div onClick={menuIconClick}>
            <p>{componentText}</p> <BiChevronLeft className='icon'/> 
            </div>
          </SidebarHeader>
          <SidebarContent>
            {componentMenu}
          </SidebarContent>
        </ProSidebar>
    </div>)
    :
    (<></>)
  )

}