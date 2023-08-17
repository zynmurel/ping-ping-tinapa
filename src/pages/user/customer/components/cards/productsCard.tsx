import { useContext, useState } from "react";
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
  const { refetchMyOrders } = useContext(MyOrderContext);
  const handleCancel = () => {
    setOpenConfirm(false);
    setQuantity(1);
  };
  const { transactionData } = useContext(TransactionContext);
  const { userData } = useContext(UserContext);
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const { mutate, isSuccess } = api.mutations.addOrder.useMutation({
    onSuccess: async () => {
      refetchMyOrders();
      await openNotificationWithIcon("success", "Order Added");
      setOpenConfirm(false);
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  const onOrder = (id: object) => {
    return () => {
      setIsOpen(true);
      setProduct(id);
      setQuantity(1);
    };
  };
  //loading
  if (!userData) {
    return (
      <div className=" relative flex h-45rem flex-row overflow-hidden scroll-smooth  rounded-3xl bg-[#ffffffbf] p-8 shadow-lg">
        {[1, 2, 3, 4].map((m) => {
          return (
            <div
              key={m}
              className=" mx-4 mt-16 flex w-72 flex-none animate-pulse flex-col overflow-hidden rounded-3xl"
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
    <div className=" relative h-45rem  overflow-hidden scroll-smooth  rounded-3xl bg-[#ffffffbf] p-8 shadow-lg">
      <AddOrderModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        quantity={quantity}
        setQuantity={setQuantity}
        product={product}
        setProduct={setProduct}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
      />
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
        }}
      />
      <div className=" h-full overflow-scroll scroll-smooth">
        {menu.map((mn: any) => (
          <div className=" mb-20">
            <span
              id={mn.key}
              className=" font-rubik text-4xl font-medium text-[#023047e3]"
            >
              {mn.title}
            </span>
            <div className=" flex flex-row items-center overflow-scroll py-5">
              {products &&
                menuProducts[mn.key]?.map((pr: any) => (
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
                          ₱ {pr?.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={onOrder(pr)}
                        className=" m-2 flex cursor-pointer items-center justify-center gap-2 rounded-full border-none  bg-[#ffa72c] p-2 transition-all hover:bg-[#ff8f2c] hover:shadow-md"
                      >
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
  );
};

export default ProductsCard;
