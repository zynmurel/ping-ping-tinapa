import { Button, Divider, Popconfirm } from "antd";
import { useContext, useMemo } from "react";
import {
  MyOrderContext,
  NotificationContext,
} from "~/pages/user/context/contextProvider";
import { api } from "~/utils/api";

const OrderCard = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { mutate } = api.mutations.deleteOrder.useMutation({
    onSuccess: () => {
      openNotificationWithIcon("info", "Order/s Deleted");
      refetchMyOrders();
    },
  });
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
  const mapItems = (mO: any) => {
    return (
      <span className=" mt-1 flex flex-row items-center justify-between rounded-lg bg-[#f3eee0] p-1 px-2 text-sm">
        <span className=" flex flex-row items-center">
          <span className=" w-10 flex-none">({mO.quantity}x) </span>
          <span>{mO.product.name}</span>
        </span>{" "}
        <span className=" flex w-4/12 flex-none justify-end">
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
              className=" h-5 cursor-pointer pl-4 hover:scale-105 hover:drop-shadow-md"
            />
          </Popconfirm>
        </span>
      </span>
    );
  };

  return (
    <div className=" flex flex-1 flex-col  rounded-xl  ">
      <div className="flex flex-1 flex-col items-center justify-between rounded-3xl bg-[#ffffffd3] p-2 px-6 drop-shadow-lg">
        <div className=" w-full">
          <Divider>
            <span className=" w-full py-2 text-2xl font-semibold text-[#023047]">
              YOUR ORDER/S
            </span>
          </Divider>
        </div>
        <div className=" flex w-full flex-1 flex-col rounded-lg bg-[#00000005] p-3">
          {tinapas?.length !== 0 && (
            <span className="  text-base font-bold">* TINAPA</span>
          )}
          {tinapas?.map((mO: any) => mapItems(mO))}
          {pasalubong?.length !== 0 && (
            <span className=" mt-5 text-base font-bold">* PASALUBONG</span>
          )}
          {pasalubong?.map((mO: any) => mapItems(mO))}
        </div>
        <button
          disabled={myOrders?.length === 0 || myOrdersLoading}
          className={` m-3 flex w-2/3  items-center justify-center rounded-full border-none  p-3 text-xl font-bold text-[#1b4b62] ${
            myOrders?.length === 0 || myOrdersLoading
              ? ""
              : " cursor-pointer bg-[#ffc233] transition-all hover:bg-[#ffaa33]  hover:drop-shadow-md"
          }`}
        >
          Submit Order
          <img src="/cart.svg" className="w-5 pl-2 sm:w-8" />
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
