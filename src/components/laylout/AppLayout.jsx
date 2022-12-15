import { Outlet } from "react-router-dom";
import PopularUser from "../popular/PopularUser";
import SideBar from './../sidebar/SideBar';
import AdminSideBar from './../sidebar/AdminSideBar';
import Main from './../layoutItems/Main';
import { useLocation } from 'react-router-dom';


const AppLayout = ({ type }) => {
  const pathname = useLocation().pathname;
  // return location.pathname;

  return (
    <>
      {(type === 'web' && pathname !== '/setting') &&
        <>
          <SideBar />
          (<Main>
            <Outlet />
            <PopularUser />
          </Main>)
        </>
      }

      {(type === 'web' && pathname === '/setting') &&
        <>
          <SideBar />
          <Outlet />
        </>
      }

      {type === 'admin' &&
        <>
          <AdminSideBar />
          <Outlet />
        </>
      }

    </>
  )
}

export default AppLayout