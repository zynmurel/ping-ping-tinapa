import { InputNumber, Modal, Tag } from "antd";
import { useEffect, useState } from "react";

const AddOrderModal = ({
  isOpen,
  setIsOpen,
  product,
  quantity,
  setQuantity,
  openConfirm,
  setOpenConfirm,
}: any) => {
  const handleCancel = () => {
    setQuantity(1);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [openConfirm]);
  const buttonDisable = !quantity || !product.stock;
  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={[]}
      style={{ minWidth: 450 }}
    >
      <div className=" flex flex-col items-center">
        <div className="relative flex w-full justify-center overflow-hidden rounded-lg bg-[#ff990051]">
          <img
            src={product.image}
            alt={product.name}
            className=" absolute mx-auto w-full  opacity-20"
          />
          <div className=" z-10 m-2 h-64 w-3/5  overflow-hidden rounded-lg">
            <img src={product.image} alt={product.name} className="w-full" />
          </div>
        </div>
        <div className=" flex w-11/12 flex-col p-5 pb-0">
          <span className=" font-rubik text-2xl font-semibold text-[#023047]">
            {product.name}
          </span>
          <span className=" font-base font-rubik text-lg">
            {product.description}
          </span>
          <span className=" font-base pb-2 font-rubik text-base">
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
                  <span className=" text-lg font-medium">
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

                  <span className=" text-lg font-medium">
                    Total Price : ₱ {(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </>
            )}
            <div className=" flex w-full items-center justify-center">
              <button
                disabled={buttonDisable}
                onClick={() => setOpenConfirm(true)}
                className={`mt-4 flex w-2/3 cursor-pointer  items-center justify-center rounded-full border-none  p-3 text-xl font-bold  transition-all ${
                  buttonDisable
                    ? ""
                    : " bg-[#ffc233] text-[#1b4b62] hover:bg-[#ffaa33] hover:drop-shadow-md"
                }`}
              >
                Add Order
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
