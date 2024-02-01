import { Dropdown, Layout } from "antd";
import SiderMenu from "./components/siderMenu";
import { UserContext } from "../context/contextProvider";
import { useContext } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

const { Header, Content, Sider } = Layout;
const AdminLayout = ({ children }: any) => {
  const { signOut } = useClerk();
  const router = useRouter();
  const users = useContext(UserContext);
  const { user, isLoaded, isSignedIn } = users;
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    height: 70,
    paddingInline: 50,
    paddingLeft: 5,
    paddingRight: 5,
    lineHeight: "64px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
  };
  const logOutFunction = () => {
    return () => {
      signOut(()=>{
        router.push("/");
      }).then(() => {
        deleteCookie("user");
      });
    };
  };
  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
  };
  const items = [
    {
      key: "1",
      label: <span className=" text-lg">Hello, {`Admin`}!</span>,
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
    <div className=" min-h-screen">
      <Layout className=" min-h-screen">
        <Header style={headerStyle}>
          <div className="flex w-full flex-col rounded-xl  ">
            <div className="flex flex-row items-center justify-between px-2  sm:items-end ">
              <div>
                <span className="z-10 flex flex-row font-cavean text-5xl font-black text-white drop-shadow-lg  ">
                  <span className="  text-[#1b526b] ">Ping</span>-
                  <span className="  text-[#ffffff]">Ping's</span>
                </span>
              </div>
              <div className=" flex flex-row items-center gap-2">
                <Dropdown menu={{ items }} placement="bottomRight">
                  <button className=" h-10 overflow-hidden rounded-full border-none  bg-transparent p-0 transition-all hover:drop-shadow-md sm:h-12">
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
        </Header>

        <Layout>
          <Sider style={siderStyle}>
            <SiderMenu />
          </Sider>
          <Content style={contentStyle}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
