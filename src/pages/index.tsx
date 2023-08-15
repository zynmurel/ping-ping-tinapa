import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import PingPingIcon from "./components/pingping";
import ProductCarousel from "./components/product";
import { LuMenu, LuXCircle } from "react-icons/lu";
import { api } from "~/utils/api";
import About from "./components/about";
export default function Home() {
  const router = useRouter();
  const data = api.queries.queryAnArray.useQuery({ data: ["some"] });
  const [activeButton, setActiveButton] = useState<string | null>(null);
  console.log(data);

  const menuItems = [
    { title: "Guide", key: "guide", children: <></> },
    {
      title: "Products",
      key: "products",
      children: <ProductCarousel />,
    },
    {
      title: "About Us",
      key: "about",
      children: <About />,
    },
  ];

  const pushToUser = async () => {
    router.push("/user");
  };

  const menuButton = (active: string) => {
    return () => {
      if (activeButton !== active) {
        setActiveButton(active);
      } else {
        setActiveButton(null);
      }
    };
  };
  return (
    <>
      <Head>
        {/* <title>Ping Ping's Tinapa</title> */}
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center overflow-hidden p-0">
        <div
          className={`absolute bottom-0 left-0 top-0 z-50 flex w-1/2 flex-col bg-[#faebd0f0] p-2 transition-all duration-300 sm:hidden ${
            activeButton === "menu" ? "translate-x-0" : "-translate-x-[20rem]"
          }`}
        >
          <div onClick={() => setActiveButton(null)}>
            <PingPingIcon
              classStyle={
                " mb-3 z-10 flex flex-col font-cavean text-4xl font-black text-white drop-shadow-lg "
              }
            />
          </div>
          {menuItems.map(({ title, key }) => {
            return (
              <span
                className={` my-1 cursor-pointer  rounded border-none bg-[#ffffff6d] px-2  font-sans text-lg font-medium text-[#023047]`}
                onClick={menuButton(key)}
                key={key}
              >
                {title}
              </span>
            );
          })}
        </div>
        <header className=" z-40 flex h-16 w-full flex-row items-center justify-between p-0 sm:h-20 sm:p-2">
          <div className="flex cursor-pointer  items-center p-1 sm:hidden sm:p-5">
            <LuMenu
              onClick={() => setActiveButton("menu")}
              className=" -mt-2 ml-3 text-3xl text-[#023047]"
            />
          </div>
          <div className=" hidden flex-row items-center gap-16 p-1 sm:flex sm:p-5 ">
            <PingPingIcon
              classStyle={
                "z-10 flex flex-col font-cavean text-5xl font-black text-white drop-shadow-lg "
              }
            />
            {menuItems.map(({ title, key }) => {
              return (
                <span
                  className={` cursor-pointer  border-none bg-transparent   font-sans text-xl drop-shadow-lg hover:text-[#023047] ${
                    activeButton === key ? "text-[#023047]" : "text-white"
                  } transition duration-300 ease-out`}
                  onClick={menuButton(key)}
                  key={key}
                >
                  {title}
                </span>
              );
            })}
          </div>
          <button
            onClick={pushToUser}
            className="m-5 flex flex-row  items-center gap-1 rounded-full border-none bg-gradient-to-l from-[#045a85] to-[#034363]  px-6 py-2 text-base text-white drop-shadow-lg transition hover:scale-105 sm:text-xl"
          >
            Sign In
          </button>
        </header>
        <div className=" relative flex h-full w-11/12 flex-row items-center justify-center  sm:flex-1 sm:justify-start">
          <div
            className={` flex w-full  flex-col items-center pl-0 transition-all duration-300   ${
              activeButton && "sm:w-1/2 sm:items-start"
            }`}
          >
            <span
              className={`z-10 -mt-0 flex flex-col font-cavean text-9xl font-black text-white  drop-shadow-lg transition-all  duration-300 sm:-mb-5 sm:-mt-12  sm:flex-row sm:text-10xl  ${
                !activeButton && "lg:text-13xl"
              } `}
            >
              <span className=" -mt-0  text-[#023047] sm:mt-0">Ping</span>
              <span className=" hidden text-[#023047] sm:flex">-</span>
              <span className=" -mt-16 text-[#ffffff] sm:mt-0">Ping's</span>
            </span>
            {/* <Image
              src="/smokedFishPNG.png"
              alt="Github"
              width={activeButton ? 330 : 330}
              height={activeButton ? 165 : 165}
              className="-mb-16 -mt-16  flex scale-50 sm:-mb-0 sm:-mt-0 sm:scale-100"
            /> */}
            {/* <img
              src={"/smokedFishPNG.png"}
              alt="Smoked Fish PNG"
              className={` -mt-12 flex  opacity-90 drop-shadow-lg transition-all duration-300 ${
                !activeButton ? "h-48" : "h-40"
              }`}
            /> */}
            <div
              className={`z-10  flex  flex-col items-center p-2 sm:-mt-0 sm:w-full sm:items-start  sm:p-5 ${
                !activeButton && "sm:w-3/4 sm:items-center"
              }`}
            >
              <span className=" text-center font-cavean text-4xl text-[#ffffff] sm:text-6xl">
                Smoked Fish Tinapa <span className="text-[#023047]">&</span>{" "}
                Pasalubong
              </span>
              <span
                className={` my-2 w-full text-center font-rubik text-lg font-semibold leading-none text-[#023047] sm:mt-5 sm:w-3/5   sm:text-2xl ${
                  activeButton && "sm:text-start"
                }`}
              >
                Home of Calbayog City's All-time Favourite Classic Tinapa
              </span>
            </div>
            <div
              className={`flex w-full flex-col items-center gap-2  sm:ml-5 sm:flex-row sm:gap-0 ${
                !activeButton && "justify-center"
              }`}
            >
              <button
                onClick={menuButton("products")}
                className=" z-0 mr-0 flex flex-row items-center rounded-xl border-2 border-none border-[#023047] bg-[#023047] p-0 px-4 font-rubik text-lg font-normal text-[#ffffff] shadow-md transition  hover:bg-[#09223a] hover:shadow-xl  sm:-mr-8 sm:h-16 sm:pl-6 sm:pr-8 sm:text-2xl sm:font-medium sm:hover:-translate-x-2"
              >
                Our Products
                <img src="/fish.svg" className="w-6 pl-2 sm:w-10" />
              </button>
              <button
                onClick={pushToUser}
                className=" z-10 flex flex-row items-center rounded-full border-none bg-[#ffc233] p-4 px-16 font-rubik text-2xl font-medium text-[#023047] shadow-md transition hover:scale-105 hover:bg-[#ffc743] hover:shadow-xl sm:p-5 sm:px-20 sm:text-3xl"
              >
                Order Online
                <img src="/cart.svg" className="w-8 pl-2 sm:w-10" />
              </button>
            </div>
          </div>
          {menuItems.map(({ title, key, children }) => {
            return (
              <div
                className={`absolute bottom-0  top-0 z-10 flex w-full flex-col items-start rounded-xl bg-[#faebd0f0] p-2 font-sans drop-shadow-lg sm:right-10 sm:w-5/12 sm:justify-center sm:bg-transparent sm:p-0 ${
                  activeButton === key
                    ? "-translate-x-0 sm:-translate-x-16"
                    : "translate-x-[50rem]"
                } duration-300 ease-in-out`}
                key={key}
              >
                <div className=" flex w-full flex-row items-center justify-between">
                  <span className=" mb-3 font-cavean text-4xl font-semibold text-[#023047] sm:text-6xl">
                    {title}
                  </span>
                  <span
                    className=" flex sm:hidden"
                    onClick={() => setActiveButton(null)}
                  >
                    <LuXCircle size={25} className=" mx-3" />
                  </span>
                </div>
                {children}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
