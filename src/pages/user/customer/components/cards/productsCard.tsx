import { useContext, useEffect, useState } from "react";
import AddOrderModal from "../modals/addOrderModal";
import { Skeleton } from "antd";
import ConfirmAddOrderModal from "../modals/confirmModal";
import {
  MyOrderContext,
  NotificationContext,
  TransactionContext,
  UserContext,
} from "~/pages/user/context/contextProvider";
import { api } from "~/utils/api";

const ProductsCard = ({ menu, products, menuProducts }: any) => {
  const { refetchMyOrders, myOrders } = useContext(MyOrderContext);
  const handleCancel = () => {
    setOpenConfirm(false);
    setQuantity(1);
  };
  const { transactionData } = useContext(TransactionContext);
  const { userData } = useContext(UserContext);
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [myAddedOrder, setMyAddedOrder] = useState<any>({ setter: true });
  const { mutate, isSuccess } = api.mutations.addOrder.useMutation({
    onSuccess: async () => {
      refetchMyOrders();
      await openNotificationWithIcon(
        "success",
        myAddedOrder?.id ? "Order Updated" : "Order Added"
      );
      setOpenConfirm(false);
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const onOrder = (id: any) => {
    return () => {
      setIsOpen(true);
      setProduct(id);
      setQuantity(1);
      setMyAddedOrder({
        ...myOrders?.find(
          ({ productId }: { productId: string }) => productId === id.id
        ),
        setter: !myAddedOrder.setter,
      });
    };
  };
  //loading
  if (!userData) {
    return (
      <div className=" relative flex h-28 flex-row gap-2 overflow-hidden scroll-smooth rounded bg-[#ffffffbf]  p-8 shadow-lg sm:h-45rem sm:rounded-3xl">
        {[1, 2, 3, 4].map((m) => {
          return (
            <div
              key={m}
              className=" flex w-32 flex-none animate-pulse flex-col overflow-hidden rounded sm:mx-4 sm:mt-16 sm:w-72 sm:rounded-3xl"
            >
              <div className=" relative h-64 overflow-hidden bg-[#dcdcdc]"></div>
              <div className=" flex h-52 flex-col justify-between overflow-hidden rounded-b-3xl bg-[#dcdcdc] p-1 font-rubik">
                <div className=" flex h-full flex-col justify-between">
                  <span className=" flex flex-col justify-center">
                    <span className=" pt-2 text-center text-xl font-medium text-[#023047e3]"></span>
                    <span className=" py-1 text-center text-base font-normal text-[#023047e3]"></span>
                  </span>
                  <span className=" font-base pb-2 text-center text-xl text-[#023047e3]"></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className=" relative mt-2 h-28rem overflow-hidden scroll-smooth  rounded bg-[#ffffffbf] p-2  shadow-lg sm:mt-0 sm:h-45rem sm:rounded-3xl sm:p-8">
      <ConfirmAddOrderModal
        props={{
          mutate,
          transactionData,
          userData,
          openConfirm,
          setOpenConfirm,
          quantity,
          product,
          setQuantity,
          myOrders,
        }}
      />
      <AddOrderModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        quantity={quantity}
        setQuantity={setQuantity}
        product={product}
        setProduct={setProduct}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        myOrders={myOrders}
        myAddedOrder={myAddedOrder}
      />
      <div className=" h-full overflow-scroll scroll-smooth">
        {menu.map((mn: any) => (
          <div className=" mb-5 sm:mb-20">
            <span
              id={mn.key}
              className=" font-rubik text-xl font-medium text-[#023047e3] sm:text-4xl"
            >
              {mn.title}
            </span>
            <div className=" flex flex-row items-center overflow-scroll py-2 sm:py-5">
              {products &&
                menuProducts[mn.key]?.map((pr: any) => (
                  <div className="mx-2 flex w-36 flex-none flex-col overflow-hidden rounded sm:mx-4 sm:w-72 sm:rounded-3xl">
                    <div className=" relative h-36 overflow-hidden bg-[#ffffff] sm:h-64">
                      <img
                        src={pr.image ? pr.image : ""}
                        className=" absolute top-0 w-full"
                      />
                    </div>
                    <div className=" flex h-32 flex-col justify-between overflow-hidden bg-[#ffffff] p-1 font-rubik sm:h-52">
                      <div className=" flex h-full flex-col justify-between">
                        <span className=" flex flex-col justify-center">
                          <span className=" text-center text-base font-medium leading-5 text-[#023047e3] sm:pt-2 sm:text-xl">
                            {pr?.name}
                          </span>
                          <span className=" py-1 text-center text-xs font-normal text-[#023047e3] sm:text-base">
                            {pr?.description}
                          </span>
                        </span>
                        <span className=" font-base pb-2 text-center text-base text-[#023047e3] sm:text-xl">
                          ₱ {pr?.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={onOrder(pr)}
                        className=" flex cursor-pointer items-center justify-center gap-2 rounded-full border-none bg-[#ffa72c] p-1 transition-all hover:bg-[#ff8f2c] hover:shadow-md sm:m-2 sm:p-2"
                      >
                        <span className=" text-base font-medium text-white sm:text-xl">
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
  );
};

export default ProductsCard;
