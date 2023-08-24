import { useContext, useEffect, useMemo } from "react";
import {
  MyOrderContext,
  NotificationContext,
  TransactionContext,
  UserContext,
} from "../../context/contextProvider";
import { Card, Divider } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import PingPingIcon from "~/pages/components/pingping";
import { api } from "~/utils/api";

const Confirmation = () => {
  const router = useRouter();
  const { transactionData } = useContext(TransactionContext);
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { userData, isLoaded } = useContext(UserContext);
  const { myOrders, myOrdersLoading, refetchMyOrders } =
    useContext(MyOrderContext);
  const tinapas = useMemo(
    () => myOrders?.filter((t: any) => t.product.category === "TINAPA"),
    [refetchMyOrders, myOrders]
  );
  const pasalubong = myOrders?.filter(
    (t: any) => t.product.category === "PASALUBONG"
  );
  useEffect(() => {
    console.log(myOrders, "inapa");
  }, [myOrders]);

  function sumPrice(array: any) {
    let sum = 0;
    array?.forEach((item: any) => {
      sum += item?.totalPrice;
    });

    return sum;
  }
  const mapItems = (mO: any) => {
    return (
      <span className=" mt-1 flex flex-row items-center justify-between rounded-lg bg-[#ffffff] p-0 px-2 text-sm sm:text-base">
        <span className=" flex flex-row items-center">
          <span className=" w-10 flex-none">({mO.quantity}x) </span>
          <span>{mO.product.name}</span>
        </span>{" "}
        <span className=" flex w-4/12 flex-none items-center justify-end">
          <span>₱ {mO.totalPrice.toFixed(2)} </span>
        </span>
      </span>
    );
  };
  console.log(myOrders);
  const { mutate, isLoading } = api.mutations.getOrderProcessed.useMutation({
    onSuccess: () => {
      openNotificationWithIcon(
        "success",
        "Order Submitted",
        "You can check your order status at Orders"
      );
      router.push("/user/customer");
    },
  });
  const handleOrder = () => {
    if (transactionData && myOrders) {
      const productsToMutate = myOrders.map((order: any) => {
        return { productId: order.productId, quantity: order.quantity };
      });
      mutate({
        transactionId: transactionData.id,
        orders: productsToMutate,
      });
    }
  };

  return (
    <div className=" flex min-h-screen w-full flex-col items-center  justify-center">
      <div>
        <span className=" -mb-4 -mt-8 flex flex-row rounded-full p-5 px-10 pt-2 font-cavean text-5xl font-black text-white drop-shadow-lg sm:-mt-20 sm:mb-3 sm:bg-[#fff5dc9b] sm:px-20 sm:text-9xl ">
          <span className="  text-[#023047] ">Ping</span>-
          <span className="  text-[#ffffff]">Ping's</span>
        </span>
      </div>{" "}
      <div className=" h-45rem w-11/12 overflow-scroll rounded-2xl bg-[#fff5dc]  p-2 sm:h-auto sm:w-7/12">
        <div className=" flex flex-1 flex-col gap-1 rounded-xl  sm:flex-row  ">
          <div className="flex flex-1 flex-col items-center justify-between rounded-xl bg-[#ffffffd3] p-2 drop-shadow-lg sm:px-6">
            <div className=" w-full">
              <Divider>
                <span className=" w-full py-2 text-xl font-semibold text-[#023047] sm:text-4xl">
                  YOUR ORDER/S
                </span>
              </Divider>
            </div>
            <div className=" flex w-full flex-1 flex-col gap-1">
              <div className=" flex h-48 flex-col overflow-scroll rounded-lg bg-[#ffffff] p-3 sm:mb-10 sm:h-96">
                {tinapas?.length !== 0 && (
                  <span className="  text-sm font-bold text-slate-800 sm:text-lg">
                    * TINAPA
                  </span>
                )}
                {tinapas?.map((mO: any) => mapItems(mO))}
                {pasalubong?.length !== 0 && (
                  <span className=" mt-5  text-sm font-bold text-slate-800 sm:text-lg">
                    * PASALUBONG
                  </span>
                )}
                {pasalubong?.map((mO: any) => mapItems(mO))}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col items-start  gap-1 ">
            <div className=" w-full rounded-xl bg-[#ffffffd3] drop-shadow-lg">
              <div className=" m-4 mx-6 ">
                <span className=" text-sm font-bold text-slate-800 sm:text-xl ">
                  TRANSACTION TYPE -{" "}
                  <span className=" text-green-800">
                    {transactionData?.type}
                  </span>
                </span>
              </div>
              {transactionData?.type === "DELIVER" && (
                <>
                  <Divider className=" m-2" />
                  <div className=" mx-6 -mt-2 mb-4 flex flex-col">
                    <span className="font-bold text-slate-800 sm:text-lg">
                      Address :
                    </span>
                    <span className=" text-sm text-slate-700 sm:text-lg">{`${userData?.street}, ${userData?.barangay}, ${userData?.city}`}</span>
                    <span className=" text-sm text-slate-700 sm:text-lg">{`${userData?.placeDetails}`}</span>
                  </div>
                  <div className=" mx-6 -mt-2 mb-4 flex flex-col">
                    <span className="font-bold text-slate-800 sm:text-lg">
                      Contact :{" "}
                      <span className=" text-sm font-normal text-slate-700 sm:text-lg">
                        {userData?.phone}
                      </span>
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className=" w-full flex-1  rounded-xl bg-[#ffffffd3] drop-shadow-lg">
              <div className=" mx-6 mt-5 flex flex-col">
                <span className="  text-sm font-bold text-slate-800 sm:text-xl ">
                  TO PAY
                </span>
                <Divider className=" m-2" />
                <span className="flex w-full justify-between text-xs font-medium text-slate-800 sm:text-lg ">
                  Sub-Total -{" "}
                  <span className=" text-xs font-normal text-slate-700 sm:text-lg">
                    ₱ {sumPrice(myOrders).toFixed(2)}
                  </span>
                </span>
                <span className="flex w-full justify-between text-xs font-medium text-slate-800 sm:text-lg">
                  Delivery fee -{" "}
                  <span className=" text-xs font-normal text-slate-700 sm:text-lg">
                    ₱ {100}
                  </span>
                </span>
                <span className="flex w-full justify-between text-lg font-bold text-slate-800 sm:text-xl">
                  Total Price -{" "}
                  <span className=" text-lg font-normal text-slate-700">
                    ₱ {(sumPrice(myOrders) + 100).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
            <div className=" z-10 flex h-14 w-full flex-row gap-1">
              <div
                onClick={() => router.back()}
                className=" flex h-full w-2/5 cursor-pointer items-center justify-center gap-2 rounded-xl  bg-[#ffffffd3] drop-shadow-lg hover:bg-slate-100"
              >
                <IoMdArrowRoundBack size={25} />
                <span className=" text-md sm:text-lg">Go Back</span>
              </div>
              <div
                onClick={handleOrder}
                className=" flex h-full flex-1 cursor-pointer items-center justify-center rounded-xl  bg-[#ffb300d3] drop-shadow-lg hover:bg-[#ffb300ad]"
              >
                <span className=" text-xl font-semibold text-slate-800 sm:text-2xl">
                  Order
                </span>

                <img src="/cart.svg" className="w-5 pl-2 sm:w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
