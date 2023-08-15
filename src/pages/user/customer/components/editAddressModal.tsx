import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { BiCurrentLocation, BiEdit } from "react-icons/bi";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { allBarangay } from "../../utils/barangaydatas";

const EditAddressModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitAble, setSubmitAble] = useState(true);
  const [form] = Form.useForm();
  const { user, isLoaded, isSignedIn } = useUser();
  const { data, isLoading, isError, refetch } = api.queries.getUser.useQuery({
    id: user ? user.id : "",
  });
  const { mutate } = api.mutations.updateCustomer.useMutation({
    onSuccess: () => {
      setIsModalOpen(false);
      setSubmitAble(true);
      refetch();
    },
  });
  const barangays = allBarangay.barangays;
  const rules = [
    {
      required: true,
    },
  ];
  useEffect(() => {
    fieldsSetter();
  }, [data]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handelFinish = (e: any) => {
    console.log(e);
    mutate({
      id: data ? data.id : "",
      barangay: e.barangay,
      street: e.street,
      placeDetails: e.placeDetails,
    });
  };

  const fieldsSetter = () => {
    form.setFieldsValue({
      city: data?.city,
      barangay: data?.barangay,
      street: data?.street,
      placeDetails: data?.placeDetails,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    fieldsSetter();
    setSubmitAble(true);
  };

  const formChangeChecker = () => {
    return () => {
      const check =
        form.getFieldsValue().barangay !== data?.barangay ||
        form.getFieldsValue().street !== data?.street ||
        form.getFieldsValue().placeDetails !== data?.placeDetails
          ? false
          : true;
      console.log(check);
      setSubmitAble(check);
    };
  };

  return (
    <>
      <Button
        onClick={showModal}
        className="item-center mb-2 flex w-full justify-center rounded-md border border-orange-200 bg-orange-100 p-0 text-left text-lg text-[#023047]"
      >
        <span className=" relative flex">
          <BiCurrentLocation className="absolute -left-6 top-1/2 my-auto  -translate-y-1/2 text-xl text-[#023047]" />
          Update Address Details
        </span>
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <Form
          form={form}
          initialValues={{ size: "large" }}
          size={"large"}
          onFinish={handelFinish}
          onChange={formChangeChecker()}
        >
          <div className=" my-5">
            <span className=" text-xl font-semibold">
              Delivery Address{" "}
              <span className=" text-base font-light text-slate-600">
                ( Province of Samar )
              </span>
            </span>

            <span className="flex items-center text-base font-light text-orange-500">
              <BiEdit className=" my-auto mr-1" />
              Update
            </span>
            <div className="mt-3 flex  flex-row items-center justify-between gap-2  sm:gap-2">
              <div className=" m-0 w-full flex-1">
                <span className="  text-[#023047]">City</span>
                <Form.Item name="city" rules={rules}>
                  <Input placeholder="e.g. Calbayog" disabled />
                </Form.Item>
              </div>
              <div className=" m-0 w-full flex-1">
                <span className="  text-[#023047]">Barangay</span>
                <Form.Item name="barangay" rules={rules}>
                  <Select
                    placeholder={"Select Barangay"}
                    onChange={formChangeChecker()}
                  >
                    {barangays.map((b) => (
                      <Select.Option key={b} value={b}>
                        {b}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="mt-0 flex  flex-col items-center justify-between gap-2 sm:flex-row  sm:gap-2">
              <div className="m-0 w-full flex-auto sm:w-96">
                <span className="  text-[#023047]">Street</span>
                <Form.Item name="street" rules={rules}>
                  <Input placeholder="e.g. Purok 1" />
                </Form.Item>
              </div>
              <div className="m-0 mt-3 w-full flex-auto sm:mt-0 ">
                <span className=" text-[#023047]">Place Description</span>
                <Form.Item name="placeDetails" rules={rules}>
                  <Input placeholder="e.g. Near Gcash Store" />
                </Form.Item>
              </div>
            </div>
            <div className=" flex items-center justify-end gap-2">
              <Button
                onClick={handleCancel}
                className=" w-30 border text-[#023047] hover:drop-shadow-lg"
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                className=" w-30 border-none hover:drop-shadow-lg"
                disabled={submitAble}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default EditAddressModal;
