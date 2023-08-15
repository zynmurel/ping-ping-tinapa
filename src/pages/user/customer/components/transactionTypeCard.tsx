import { Button, Form, Select } from "antd";
import { useContext, useState } from "react";
import { BiSolidCar, BiLogoDropbox, BiCurrentLocation } from "react-icons/bi";
import EditAddressModal from "./editAddressModal";
import { StateContext } from "../context/contextProvider";

const TransactionType = () => {
  const context = useContext(StateContext);
  // const { transactionType, setTransactionType } = context
  const { transactionType, setTransactionType } = context;
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const selectOptions = [
    {
      value: "delivery",
      label: (
        <div className=" flex items-center justify-center">
          <BiSolidCar className=" absolute left-1 my-auto text-xl" />
          <span className=" text-lg">Delivery</span>
        </div>
      ),
    },
    {
      value: "pick-up",
      label: (
        <div className=" flex items-center justify-center">
          <BiLogoDropbox className=" absolute left-1 my-auto text-xl" />
          <span className=" text-lg">Pick-up</span>
        </div>
      ),
    },
  ];
  return (
    <div className=" flex flex-col  rounded-xl ">
      <div className="flex flex-col items-center justify-between rounded-3xl bg-[#fff5e7] bg-[#ffffffd3] p-2 px-6 drop-shadow-lg">
        <Form form={form} className=" mt-2 w-full flex-1">
          <Form.Item className=" mb-2">
            <Select
              value={transactionType}
              onChange={(e) => setTransactionType(e)}
              options={selectOptions}
            />
          </Form.Item>
        </Form>
        {transactionType === "delivery" && <EditAddressModal />}
      </div>
    </div>
  );
};

export default TransactionType;
