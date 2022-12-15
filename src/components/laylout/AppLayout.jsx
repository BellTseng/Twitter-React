import { Outlet } from "react-router-dom";
import PopularUser from "../popular/PopularUser";
import SideBar from './../sidebar/SideBar';
import AdminSideBar from './../sidebar/AdminSideBar';
import Main from './../layoutItems/Main';

const AppLayout = ({ type }) => {
  return (
    <>
      {type === 'web' && <SideBar />}
      {type === 'admin' && <AdminSideBar />}

      {type === 'web' &&
        (<Main>
          <Outlet />
          <PopularUser />
        </Main>)
      }

      {type === 'admin' && <Outlet />}

    </>
  )
}

export default AppLayout