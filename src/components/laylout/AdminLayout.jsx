import { Outlet } from "react-router-dom";
import AdminSideBar from '../sidebar/AdminSideBar';


const AppLayout = () => {
  return (
    <>
      <AdminSideBar />
      <Outlet />
    </>
  )
}

export default AppLayout