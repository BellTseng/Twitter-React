import { Outlet } from "react-router-dom";
import PopularUser from "../popular/PopularUser";
import SideBar from './../sidebar/SideBar';
import AdminSideBar from './../sidebar/AdminSideBar';

const AppLayout = ({ type }) => {
  return (
    <>
      {type === 'web' && <SideBar />}
      {type === 'admin' && <AdminSideBar />}
      <Outlet />
      {type === 'web' && <PopularUser />}
    </>
  )
}

export default AppLayout