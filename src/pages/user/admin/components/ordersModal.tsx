import { Modal, Popconfirm, Tag } from "antd";
import { api } from "~/utils/api";

const OrderModal = ({
  setModalOpen,
  modalOpen,
  setActiveId,
  orderPerId,
  activeStatus,
  productData,
  refetch,
}: any) => {
  const { mutate } = api.mutations.changeTransactionStatus.useMutation({
    onSuccess: () => {
      refetch();
      setModalOpen(false);
    },
  });
  const [data] = orderPerId || [null];

  const handleCancel = () => {
    setModalOpen(false);
    setActiveId("");
  };
  const tableCol = [
    {
      key: "qty",
      title: "Qty",
    },
    {
      key: "product",
      title: "Product",
    },
    {
      key: "total",
      title: "Total",
    },
  ];
  const confirmCancel = () => {
    mutate({
      id: orderPerId[0].id,
      status: "CANCELLED",
    });
  };

  const handleChangeStatus = (status: string) => {
    mutate({
      id: orderPerId[0].id,
      status: status,
    });
  };
  let color: string = "";
  switch (orderPerId?.[0]?.status) {
    case "PENDING":
      color = "orange";
      break;
    case "CANCELLED":
      color = "red";
      break;
    case "DONE":
      color = "green";
      break;
    case "ONGOING":
      color = "blue";
      break;
  }
  return (
    <Modal
      open={modalOpen}
      onCancel={handleCancel}
      footer={[]}
      className=" mt-28"
    >
      <div className=" flex w-full flex-col">
        <span className="flex items-center justify-between text-3xl font-semibold">
          Order/s
          <Tag className=" mr-5 text-base font-normal" color={color}>
            {orderPerId?.[0]?.status}
          </Tag>
        </span>

        <span className=" flex w-full flex-row justify-between text-xl font-medium">
          <div className=" flex flex-col">
            <span className=" -mb-1 mt-2 text-xs text-slate-700">
              Customer Name
            </span>
            <span className=" ml-1">{`${data?.user.firstName} ${data?.user.lastName}`}</span>
          </div>
          <div className=" flex flex-col">
            <span className=" -mb-1 mt-2 text-xs text-slate-700">
              Contact Number
            </span>
            <span className=" ml-1">{`${data?.user.phone}`}</span>
          </div>
        </span>
        <span className=" flex w-full flex-col text-base font-medium">
          <span className=" -mb-1 mt-1 text-xs text-slate-700">
            Customer Address
          </span>
          <span className=" ml-1">{`${data?.user.barangay}, ${data?.user.street} - ${data?.user.placeDetails}`}</span>
        </span>
        <span className=" text-lg font-bold">{`${data?.type}`}</span>
        <div className=" my-2 w-full rounded-md bg-blue-100">
          <div className=" m-2">
            <div className=" flex flex-row bg-slate-800 text-white">
              {tableCol.map((col) => {
                let flex = col.key !== "qty" ? "flex-1" : "w-12";
                if (col.key === "total") {
                  flex = "w-32";
                }
                return (
                  <div
                    className={`${flex} border border-solid border-slate-800 pl-1`}
                    key={col.key}
                  >
                    {col.title}
                  </div>
                );
              })}
            </div>
            {data?.Order.map((data: any) => {
              const product = productData.find(
                (datap: any) => datap.id === data.productId
              );
              return (
                <div className=" flex flex-row">
                  <div className="w-12 border border-t-0 border-solid border-slate-500 bg-white pl-1">
                    ({`${data.quantity}x`})
                  </div>
                  <div className="flex-1 border border-t-0 border-solid border-slate-500 bg-white pl-1">
                    {`${product.name}`}
                  </div>
                  <div className=" w-32 border border-t-0 border-solid border-slate-500 bg-white pl-1">
                    ₱ {`${data.totalPrice}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" mx-auto flex h-10 flex-row gap-2 pt-3">
        {(activeStatus === "PENDING" || activeStatus === "ONGOING") && (
          <Popconfirm
            title="Cancel Order"
            description="Are you sure to cancel this order?"
            onConfirm={confirmCancel}
            okText="Yes"
            cancelText="No"
          >
            <button className=" w-1/3  cursor-pointer rounded border-none bg-red-500 text-lg text-white transition-all hover:shadow-md hover:brightness-110">
              Cancel Order
            </button>
          </Popconfirm>
        )}
        {activeStatus === "PENDING" && (
          <button
            onClick={() => handleChangeStatus("ONGOING")}
            className=" flex-1 cursor-pointer rounded border-none bg-blue-500 text-lg text-white transition-all hover:shadow-md hover:brightness-110"
          >
            Process Order
          </button>
        )}
        {activeStatus === "ONGOING" && (
          <button
            onClick={() => handleChangeStatus("DONE")}
            className=" flex-1 cursor-pointer rounded border-none bg-green-500 text-lg text-white transition-all hover:shadow-md hover:brightness-110"
          >
            Order Done
          </button>
        )}
        {(activeStatus === "DONE" || activeStatus === "CANCELLED") && (
          <button
            onClick={() => handleChangeStatus("ONGOING")}
            className=" mx-auto h-8 w-80 cursor-pointer rounded border border-blue-800 bg-blue-50 text-sm text-blue-800 transition-all hover:shadow-sm hover:brightness-110"
          >
            Reprocess Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default OrderModal;
