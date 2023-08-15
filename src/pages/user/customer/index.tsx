import { SignOutButton, useUser } from "@clerk/nextjs";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import Account from "./components/accountCard";
import TransactionType from "./components/transactionTypeCard";
import OrderCard from "./components/orderCard";
import { ProductsContext, StateContext } from "./context/contextProvider";
import { UserContext } from "./context/contextProvider";
import { api } from "~/utils/api";
import { Button } from "antd";

const CustomerPage = () => {
  const router = useRouter();
  const [transactionType, setTransactionType] = useState("delivery");
  const [menuActive, setMenuActive] = useState("tinapa");
  const { user, isLoaded, isSignedIn } = useUser();
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = api.queries.getProducts.useQuery();
  const logOutFunction = () => {
    return () => {
      deleteCookie("user");
      router.push("/");
    };
  };
  const tinapa = products?.filter((pr) => pr.category === "TINAPA");
  const pasalubong = products?.filter((pr) => pr.category === "PASALUBONG");
  type Products = {
    tinapa: typeof products;
    pasalubong: typeof products;
  };
  type Menu = {
    key: keyof typeof menuProducts;
    title: string;
  };
  const menuProducts: Products = {
    tinapa,
    pasalubong,
  };
  const menu: Menu[] = [
    { key: "tinapa", title: "Tinapa" },
    { key: "pasalubong", title: "Pasalubong" },
  ];
  return (
    <UserContext.Provider value={{ user, isLoaded, isSignedIn }}>
      <StateContext.Provider value={{ transactionType, setTransactionType }}>
        <ProductsContext.Provider
          value={{ products, productsLoading, productsError }}
        >
          <div className="flex min-h-screen flex-col items-center  justify-center gap-1 bg-gradient-to-l from-[#ffffff] to-[#ead399]">
            <Account />
            <div className="flex w-full items-center justify-center">
              <div className=" flex w-11/12 flex-row items-start justify-between rounded-3xl bg-[#ffffff00] p-2 px-5">
                <div className="flex w-full flex-row gap-3 ">
                  <div className=" flex w-9/12 flex-col gap-3">
                    <div className=" flex w-full flex-1 gap-1 rounded-full  bg-[#ffffffbf] p-1 shadow-md ">
                      {menu.map(({ key, title }) => (
                        <a
                          key={key}
                          href={`#${key}`}
                          className={` w-1/4 cursor-pointer rounded-full  p-3 px-10 text-center text-lg font-medium no-underline transition-all ${
                            menuActive === key
                              ? "bg-[#ffa72c]  text-white"
                              : " bg-[#ffc23351] text-slate-600"
                          }`}
                          onClick={() => setMenuActive(key)}
                        >
                          {title}
                        </a>
                      ))}
                    </div>
                    <div className=" h-45rem overflow-hidden scroll-smooth  rounded-3xl bg-[#ffffffbf] p-8 shadow-lg">
                      <div className=" h-full overflow-scroll scroll-smooth">
                        {menu.map((mn) => (
                          <div className=" mb-20">
                            <span
                              id={mn.key}
                              className=" font-rubik text-4xl font-medium text-[#023047e3]"
                            >
                              {mn.title}
                            </span>
                            <div className=" flex flex-row items-center overflow-scroll py-5">
                              {products &&
                                menuProducts[mn.key]?.map((pr) => (
                                  <div className="mx-4 flex w-72 flex-none flex-col overflow-hidden rounded-3xl">
                                    <div className=" relative h-64 overflow-hidden bg-[#ffffff]">
                                      <img
                                        src={pr.image ? pr.image : ""}
                                        className=" absolute top-0 w-full"
                                      />
                                    </div>
                                    <div className=" flex h-52 flex-col justify-between overflow-hidden bg-[#ffffff] p-1 font-rubik">
                                      <div className=" flex h-full flex-col justify-between">
                                        <span className=" flex flex-col justify-center">
                                          <span className=" pt-2 text-center text-xl font-medium text-[#023047e3]">
                                            {pr?.name}
                                          </span>
                                          <span className=" py-1 text-center text-base font-normal text-[#023047e3]">
                                            {pr?.description}
                                          </span>
                                        </span>
                                        <span className=" font-base pb-2 text-center text-xl text-[#023047e3]">
                                          ₱ {pr?.price}
                                        </span>
                                      </div>
                                      <button className="m-2 flex items-center justify-center gap-2 rounded-full border-none  bg-[#ffa72c] p-2 transition-all hover:bg-[#ff8f2c] hover:shadow-md">
                                        <span className=" text-xl font-medium text-white">
                                          Order
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className=" flex w-3/12 flex-col gap-3 p-1">
                    {/* <Account /> */}
                    <TransactionType />
                    <OrderCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ProductsContext.Provider>
      </StateContext.Provider>
    </UserContext.Provider>
  );
};

export default CustomerPage;
