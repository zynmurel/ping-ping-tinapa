import { useClerk } from "@clerk/nextjs";
import { useContext } from "react";
import PingPingIcon from "~/pages/components/pingping";
import { UserContext } from "../../../context/contextProvider";
import { Dropdown } from "antd";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

const Account = () => {
  const users = useContext(UserContext);
  const { signOut } = useClerk();
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = users;
  const logOutFunction = () => {
    return () => {
      signOut().then(() => {
        router.push("/");
        deleteCookie("user");
      });
    };
  };
  const items = [
    {
      key: "1",
      label: <span className=" text-lg">Hello, {`${user?.firstName}`}!</span>,
    },
    {
      key: "3",
      label: (
        <button
          onClick={logOutFunction()}
          className=" w-48 cursor-pointer rounded-full border border-red-600 bg-red-200 p-2 text-red-500 hover:bg-red-300"
        >
          Sign Out
        </button>
      ),
    },
  ];
  return (
    <div className=" mt-2 flex w-full flex-col rounded-xl bg-[#ffb65600] sm:-mt-12 sm:w-11/12 ">
      <div className="flex flex-row items-center justify-between px-2  sm:items-end ">
        <div>
          <span className="z-10 flex flex-row font-cavean text-3xl font-black text-white drop-shadow-lg sm:text-7xl ">
            <span className="  text-[#023047] ">Ping</span>-
            <span className="  text-[#ffffff]">Ping's</span>
          </span>
        </div>
        <div className=" flex flex-row items-center gap-2">
          <button className=" item-center flex h-8 cursor-pointer flex-row justify-center gap-2 rounded-full border-none  bg-[#ffc233] px-5 transition-all hover:shadow-md sm:h-auto sm:p-2 sm:px-10 ">
            <span className=" my-auto text-sm font-semibold text-[#023047e3] sm:text-lg">
              Orders
            </span>
            <img
              src={"/cart.svg"}
              alt="profile"
              className=" my-auto h-4 cursor-pointer transition-all sm:h-5 "
            />
          </button>
          <Dropdown menu={{ items }} placement="bottomRight">
            <button className=" h-10 overflow-hidden rounded-full border border-orange-400  bg-transparent p-0 transition-all hover:drop-shadow-md sm:h-12">
              <img
                src={user ? user.imageUrl : "/profile.png"}
                alt="profile"
                className=" h-full cursor-pointer"
              />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Account;
