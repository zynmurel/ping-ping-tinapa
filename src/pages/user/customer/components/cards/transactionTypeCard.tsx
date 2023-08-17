import { Button, Form, Select, Skeleton } from "antd";
import { useContext, useState } from "react";
import { BiSolidCar, BiLogoDropbox, BiCurrentLocation } from "react-icons/bi";
import EditAddressModal from "../modals/editAddressModal";
import {
  NotificationContext,
  StateContext,
  TransactionContext,
} from "~/pages/user/context/contextProvider";
import { api } from "~/utils/api";

const TransactionType = () => {
  const { transactionData } = useContext(TransactionContext);
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const context = useContext(StateContext);
  const { transactionType, setTransactionType } = context;
  const [form] = Form.useForm();
  const { mutate, isLoading } = api.mutations.changeTransactionType.useMutation(
    {
      onSuccess: () => {
        openNotificationWithIcon(
          "info",
          `Changed to ${
            transactionType[0] + transactionType.slice(1).toLowerCase()
          }`
        );
      },
    }
  );
  const selectOptions = [
    {
      value: "DELIVER",
      label: (
        <div className=" flex items-center justify-center">
          <BiSolidCar className=" absolute left-1 my-auto text-xl" />
          <span className=" text-lg">Delivery</span>
        </div>
      ),
    },
    {
      value: "PICKUP",
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
        {transactionType || isLoading ? (
          <Form form={form} className=" mt-2 w-full flex-1">
            <Form.Item className=" mb-2">
              <Select
                value={transactionType}
                onChange={(e) => {
                  mutate({ id: transactionData.id, type: e });
                  setTransactionType(e);
                }}
                options={selectOptions}
              />
            </Form.Item>
          </Form>
        ) : (
          <div className="h-16 w-full animate-pulse rounded-2xl bg-slate-200"></div>
        )}
        {transactionType === "DELIVER" && <EditAddressModal />}
      </div>
    </div>
  );
};

export default TransactionType;
