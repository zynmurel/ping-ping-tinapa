import { SignOutButton, useUser } from "@clerk/nextjs";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Account from "./components/cards/accountCard";
import TransactionType from "./components/cards/transactionTypeCard";
import OrderCard from "./components/cards/orderCard";
import {
  MyOrderContext,
  ProductsContext,
  StateContext,
  TransactionContext,
} from "../context/contextProvider";
import { UserContext } from "../context/contextProvider";
import { api } from "~/utils/api";
import ProductsCard from "./components/cards/productsCard";
import MenuCard from "./components/cards/menuCard";
import MobileView from "./mobileView";

const CustomerPage = () => {
  const router = useRouter();
  const { data: trData, isLoading: trIsLoading } =
    api.mutations.findTransaction.useQuery();
  const { mutateAsync, data: transactionData } =
    api.mutations.findOrAddTransaction.useMutation();
  const [transactionType, setTransactionType] = useState<string | null>(null);
  const [menuActive, setMenuActive] = useState("tinapa");
  const { user, isLoaded, isSignedIn } = useUser();
  const {
    data: userData,
    isLoading,
    isError,
  } = api.queries.getUser.useQuery({
    id: user ? user.id : "",
  });
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = api.queries.getProducts.useQuery();

  const {
    data: myOrders,
    isLoading: myOrdersLoading,
    refetch: refetchMyOrders,
  } = api.queries.getMyOrders.useQuery({
    userId: userData ? userData.id : "",
    transactionId: transactionData ? transactionData.id : "",
  });

  useEffect(() => {
    if (!userData && !isLoading && !isError && user) {
      deleteCookie("user");
      router.push("/user");
    }
    if (userData && !isLoading && user && !trData && !trIsLoading) {
      mutateAsync({
        userId: userData.id,
      });
    }
  }, [userData]);

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
  useEffect(() => {
    transactionData?.type && setTransactionType(transactionData.type);
  }, [transactionData]);

  return (
    <TransactionContext.Provider value={{ transactionData }}>
      <UserContext.Provider value={{ userData, user, isLoaded, isSignedIn }}>
        <StateContext.Provider value={{ transactionType, setTransactionType }}>
          <MyOrderContext.Provider
            value={{ myOrders, myOrdersLoading, refetchMyOrders }}
          >
            <ProductsContext.Provider
              value={{ products, productsLoading, productsError }}
            >
              <div className="hidden min-h-screen flex-col items-center justify-center  gap-1 bg-gradient-to-l from-[#ffffff] to-[#ead399] sm:flex">
                <Account />
                <div className="flex w-full items-center justify-center">
                  <div className=" flex w-11/12 flex-row items-start justify-between rounded-3xl bg-[#ffffff00] p-2 px-5">
                    <div className="flex w-full flex-row gap-3 ">
                      <div className=" flex w-9/12 flex-col gap-3 ">
                        <MenuCard
                          menu={menu}
                          setMenuActive={setMenuActive}
                          menuActive={menuActive}
                        />
                        <ProductsCard
                          menu={menu}
                          menuProducts={menuProducts}
                          products={products}
                        />
                      </div>
                      <div className="  flex w-3/12 flex-col gap-3 p-0 ">
                        <TransactionType />
                        <OrderCard />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <MobileView
                menu={menu}
                setMenuActive={setMenuActive}
                menuActive={menuActive}
                menuProducts={menuProducts}
                products={products}
              />
            </ProductsContext.Provider>
          </MyOrderContext.Provider>
        </StateContext.Provider>
      </UserContext.Provider>
    </TransactionContext.Provider>
  );
};

export default CustomerPage;
