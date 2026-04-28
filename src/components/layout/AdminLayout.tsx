import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <>
    <div>
      <h1>AdminLayout Component</h1>
    </div>
    <Outlet/>
    </>
  );
};

export default AdminLayout;