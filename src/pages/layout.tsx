import { Outlet } from "react-router-dom";

import Nav from "components/nav/nav";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
export default Layout;
