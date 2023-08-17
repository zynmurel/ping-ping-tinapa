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
    <div className=" -mt-12 flex w-11/12 flex-col rounded-xl bg-[#ffb65600] ">
      <div className="flex flex-row items-end justify-between  px-2 ">
        <div>
          <span className="z-10 flex flex-row font-cavean text-7xl font-black text-white drop-shadow-lg ">
            <span className="  text-[#023047] ">Ping</span>-
            <span className="  text-[#ffffff]">Ping's</span>
          </span>
        </div>
        <div className=" flex flex-row gap-2">
          <button className=" item-center flex cursor-pointer flex-row justify-center gap-2 rounded-full  border-none bg-[#ffc233] p-2 px-10 transition-all hover:shadow-md ">
            <span className=" my-auto text-lg font-semibold text-[#023047e3]">
              Orders
            </span>
            <img
              src={"/cart.svg"}
              alt="profile"
              className=" my-auto h-5 cursor-pointer transition-all "
            />
          </button>
          <Dropdown menu={{ items }} placement="bottomRight">
            <button className=" h-12 overflow-hidden rounded-full border  border-orange-400 bg-transparent p-0 transition-all hover:drop-shadow-md">
              <img
                src={user ? user.imageUrl : "/profile.png"}
                alt="profile"
                className=" h-12 cursor-pointer"
              />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Account;
