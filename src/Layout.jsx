import { useState } from "react";
import Navbar from "./component/NavBar";
import Sidebar from "./component/SideBar";
import { useAtomValue } from "jotai";
import { userStateAtom } from "./atom/userStateAtom";
import { Outlet } from "react-router-dom";
import LogIn from "./component/LogIn";

function Layout() {
  const [count, setCount] = useState(0);
  const { loading, user } = useAtomValue(userStateAtom);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if(!user) {
    return (
      <>
        <LogIn />
      </>
    )
  }

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ">
          <Navbar />
          <div className="container mx-auto">
            <div className="bg-gray-200 h-screen rounded-xl w-full  p-4">
              <div className="text-6xl font-bold mb-4">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
