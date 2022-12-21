import { Outlet } from "react-router-dom";
import PopularUser from "../popular/PopularUser";
import SideBar from './../sidebar/SideBar';
import Main from './../layoutItems/Main';
import { useLocation } from 'react-router-dom';


const AppLayout = () => {
  const pathname = useLocation().pathname;
  // return location.pathname;

  return (
    <>
      <SideBar />

      {pathname !== '/setting'
        && (<Main>
          {/* <Outlet /> */}
          {/* <PopularUser /> */}
        </Main>)}

      {pathname === '/setting' && (
        <Outlet />
      )}

    </>
  )
}

export default AppLayout