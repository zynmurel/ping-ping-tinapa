import { InputNumber, Modal, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { MyOrderContext } from "~/pages/user/context/contextProvider";

const AddOrderModal = ({
  isOpen,
  setIsOpen,
  product,
  quantity,
  setQuantity,
  openConfirm,
  setOpenConfirm,
  myOrders,
  myAddedOrder,
}: any) => {
  const handleCancel = () => {
    setQuantity(1);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [openConfirm]);
  useEffect(() => {
    myAddedOrder.id && setQuantity(myAddedOrder.quantity);
    console.log(myAddedOrder);
  }, [myAddedOrder]);
  const buttonDisable = !quantity || !product.stock;
  return (
    <Modal open={isOpen} onCancel={handleCancel} footer={[]}>
      <div className=" flex w-full flex-col items-center">
        <div className="relative flex w-full justify-center overflow-hidden rounded-lg bg-[#ff990051]">
          <img
            src={product.image}
            alt={product.name}
            className=" absolute mx-auto w-full  opacity-20"
          />
          <div className=" z-10 h-36 w-3/5 overflow-hidden rounded-lg  sm:m-2 sm:h-64">
            <img src={product.image} alt={product.name} className="w-full" />
          </div>
        </div>
        <div className=" flex w-11/12 flex-col p-2 pb-0 sm:p-5">
          <span className="font-rubik text-lg font-semibold leading-5 text-[#023047] sm:text-2xl sm:leading-9">
            {product.name}
          </span>
          <span className=" font-base font-rubik text-sm sm:text-lg">
            {product.description}
          </span>
          <span className=" font-base pb-2 font-rubik text-sm sm:text-base">
            Price : ₱ {product.price?.toFixed(2)}
          </span>
          <div>
            {!product.stock ? (
              <div className=" flex flex-col">
                <div>
                  <Tag color="red">{`Stock : ${product.stock}`}</Tag>
                </div>
                <span className=" mt-2 w-full text-center text-xs text-red-500">
                  "Sorry, We currently do not have stock available for this
                  product."
                </span>
              </div>
            ) : (
              <>
                <Tag color="green">{`Stock : ${product.stock}`}</Tag>
                <div className=" mx-auto  mt-4 flex flex-row justify-between">
                  <span className=" text-base font-medium sm:text-lg">
                    Quantity :{" "}
                    <InputNumber
                      value={quantity}
                      onChange={(e) => {
                        if (e && e <= product.stock) {
                          setQuantity(e);
                          console.log(e);
                        }
                      }}
                    />
                  </span>

                  <span className="text-right text-base font-medium sm:text-start sm:text-lg">
                    Total Price : ₱{(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </>
            )}
            {myAddedOrder.id && (
              <div className="-mb-2 mt-2 text-center text-xs text-orange-300">
                Product is in your order list
              </div>
            )}
            <div className=" flex w-full items-center justify-center">
              <button
                disabled={buttonDisable}
                onClick={() => {
                  quantity === myAddedOrder.quantity
                    ? setIsOpen(false)
                    : setOpenConfirm(true);
                }}
                className={`mt-4 flex w-2/3 cursor-pointer  items-center justify-center rounded-full border-none  p-3 text-base font-bold transition-all  sm:text-xl ${
                  buttonDisable
                    ? ""
                    : " bg-[#ffc233] text-[#1b4b62] hover:bg-[#ffaa33] hover:drop-shadow-md"
                }`}
              >
                {myAddedOrder.id ? "Update Order" : "Add Order"}
                <img src="/cart.svg" className="w-5 pl-2 sm:w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddOrderModal;
