import { Divider, Modal, Tag } from "antd";

const ConfirmAddOrderModal = ({ props }: any) => {
  const {
    mutate,
    transactionData,
    userData,
    openConfirm,
    setOpenConfirm,
    quantity,
    product,
    setQuantity,
  } = props;
  const handleCancel = () => {
    setOpenConfirm(false);
    setQuantity(1);
  };
  interface DataType {
    quantity: string;
    price: string;
  }

  const onConfirm = () => {
    mutate({
      transactionId: transactionData?.id,
      userId: userData.id,
      productId: product.id,
      quantity: quantity,
      totalPrice: product.price * quantity,
    });
  };
  return (
    <Modal
      open={openConfirm}
      onCancel={handleCancel}
      footer={[]}
      style={{ maxWidth: 350, marginTop: 150 }}
    >
      <div className=" item-center flex w-full flex-col justify-center">
        <Divider style={{ marginTop: 0 }}>
          <span className="  text-xl font-bold ">CONFIRM ORDER</span>
        </Divider>
        <div className="mx-auto flex w-full flex-col  items-center justify-center rounded-xl ">
          <div className=" flex w-full pt-2 font-rubik text-xl font-semibold text-[#023047]">
            {product.name}
          </div>
          <div className="  w-full">
            <span className=" item-center text-black-300 flex gap-2 text-base font-medium">
              Price :
              <span className=" text-base">₱ {product?.price?.toFixed(2)}</span>
            </span>
            <span className=" item-center text-black-300 flex gap-2 text-base font-medium">
              Quantity :<span className=" text-base">{quantity}x</span>
            </span>
          </div>
          <div className=" w-full text-base">
            Total Price :
            <span className=" text-base">
              ₱ {(product.price * quantity).toFixed(2)}
            </span>
          </div>
        </div>
        <div className=" flex w-full flex-row gap-2  pt-6">
          <button
            onClick={handleCancel}
            className=" flex-1 cursor-pointer rounded-2xl border  border-gray-100 bg-white p-1 text-lg transition-all hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm()}
            className=" flex-1 cursor-pointer rounded-2xl border  border-gray-100 bg-[#ffc233] p-1 text-lg transition-all hover:bg-[#ffa72c]"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmAddOrderModal;
