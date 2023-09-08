import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import {
  MyOrderContext,
  ProductsContext,
  StateContext,
  TransactionContext,
  UserContext,
  SettingContext,
} from "./contextProvider";
import { useEffect } from "react";

const ProviderLayout = ({ children }: { children: any }) => {
  const { data: settings, isLoading: settingIsLoading } =
    api.queries.getSettings.useQuery();
  const { user, isLoaded, isSignedIn } = useUser();
  const { mutate, data: transactionData } =
    api.mutations.findOrAddTransaction.useMutation();
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
    if (userData) {
      mutate({
        userId: userData.id,
      });
    }
  }, [userData]);
  return (
    <TransactionContext.Provider value={{ transactionData }}>
      <UserContext.Provider value={{ userData, user, isLoaded, isSignedIn }}>
        <MyOrderContext.Provider
          value={{ myOrders, myOrdersLoading, refetchMyOrders }}
        >
          <ProductsContext.Provider
            value={{ products, productsLoading, productsError }}
          >
            <SettingContext.Provider value={{ settings, settingIsLoading }}>
              {children}
            </SettingContext.Provider>
          </ProductsContext.Provider>
        </MyOrderContext.Provider>
      </UserContext.Provider>
    </TransactionContext.Provider>
  );
};

export default ProviderLayout;
