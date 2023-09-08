import { Button, Divider, Popconfirm } from "antd";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
import {
  MyOrderContext,
  NotificationContext,
  StateContext,
} from "~/pages/user/context/contextProvider";
import { api } from "~/utils/api";

const OrderCard = () => {
  const router = useRouter();
  const { data: settings } = api.queries.getSettings.useQuery();
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { mutate } = api.mutations.deleteOrder.useMutation({
    onSuccess: () => {
      openNotificationWithIcon("info", "Order Removed");
      refetchMyOrders();
    },
  });
  const { transactionType } = useContext(StateContext);
  const { myOrders, myOrdersLoading, refetchMyOrders } =
    useContext(MyOrderContext);
  const tinapas = useMemo(
    () => myOrders?.filter((t: any) => t.product.category === "TINAPA"),
    [refetchMyOrders, myOrders]
  );
  const pasalubong = myOrders?.filter(
    (t: any) => t.product.category === "PASALUBONG"
  );
  const confirmDeleteOrder = (id: string) => {
    mutate({ id: id });
  };
  function sumPrice(array: any) {
    let sum = 0;
    array?.forEach((item: any) => {
      sum += item?.totalPrice;
    });

    return sum;
  }
  const mapItems = (mO: any) => {
    return (
      <span className=" mt-1 flex flex-row items-center justify-between rounded-lg bg-[#ffffff] px-1 text-xs sm:p-1 sm:px-2 sm:text-sm">
        <span className=" flex flex-row items-center">
          <span className=" w-7 flex-none sm:w-10">({mO.quantity}x) </span>
          <span>{mO.product.name}</span>
        </span>{" "}
        <span className=" flex w-5/12 flex-none items-center justify-end sm:w-4/12">
          <span>₱ {mO.totalPrice.toFixed(2)} </span>

          <Popconfirm
            placement="topRight"
            title={"Remove Order"}
            description={"Are you sure to remove this order?"}
            onConfirm={() => confirmDeleteOrder(mO.id)}
            okText="Yes"
            cancelText="No"
          >
            <img
              src="/remove.svg"
              alt="remove"
              className=" h-4 cursor-pointer pl-4 hover:scale-105 hover:drop-shadow-md"
            />
          </Popconfirm>
        </span>
      </span>
    );
  };
  const deliveryfee = transactionType === "DELIVER" ? settings?.deliveryFee : 0;
  return (
    <div className=" flex flex-1 flex-col  rounded sm:rounded-xl  ">
      <div className="flex flex-1 flex-col items-center justify-between rounded bg-[#ffffffd3] drop-shadow-lg sm:rounded-3xl">
        <div className=" w-full">
          <Divider>
            <span className=" w-full py-2 text-lg font-semibold text-[#023047] sm:text-2xl">
              YOUR ORDER/S
            </span>
          </Divider>
        </div>
        <div className=" flex w-11/12 flex-1 flex-col gap-1">
          <div className=" flex  flex-1 flex-col overflow-scroll rounded-lg bg-[#00000012] p-2">
            {tinapas?.length !== 0 && (
              <span className=" text-sm font-bold sm:text-base">* TINAPA</span>
            )}
            {tinapas?.map((mO: any) => mapItems(mO))}
            {pasalubong?.length !== 0 && (
              <span className=" mt-5 text-sm font-bold sm:text-base">
                * PASALUBONG
              </span>
            )}
            {pasalubong?.map((mO: any) => mapItems(mO))}
          </div>
          <div className=" flex flex-col rounded-lg  p-3">
            <span className=" flex justify-between text-sm font-semibold sm:text-base">
              Sub-total - <span>₱ {sumPrice(myOrders).toFixed(2)}</span>
            </span>
            {transactionType === "DELIVER" && (
              <span className=" flex justify-between text-sm font-semibold sm:text-base">
                Delivery Fee - <span>₱ {deliveryfee}</span>
              </span>
            )}
            <span className="flex justify-between pt-2 text-lg font-semibold sm:text-xl">
              Total Price :
              <span>
                ₱ {(sumPrice(myOrders) + (deliveryfee || 0)).toFixed(2)}
              </span>
            </span>
          </div>
        </div>
        <button
          disabled={myOrders?.length === 0 || myOrdersLoading}
          className={` m-3 flex w-2/3  items-center justify-center rounded-full border-none  p-3 text-lg font-bold text-[#1b4b62] sm:text-xl ${
            myOrders?.length === 0 || myOrdersLoading
              ? ""
              : " cursor-pointer bg-[#ffc233] transition-all hover:bg-[#ffaa33]  hover:drop-shadow-md"
          }`}
          onClick={() => router.push("/user/customer/confirmation")}
        >
          Submit Order
          <img src="/cart.svg" className="w-5 pl-2 sm:w-8" />
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
