import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import PingPingIcon from "~/pages/components/pingping";
import { deleteCookie } from "cookies-next";
import { SignOutButton, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { allBarangay } from "../utils/barangaydatas";
import { type } from "os";

const CustomerRegisterForm: React.FC = () => {
  const [disableState, setDisableState] = useState([false, false, false]);
  const { user, isLoaded } = useUser();
  const { mutate } = api.mutations.addCustomer.useMutation();
  const [form] = Form.useForm();
  const router = useRouter();

  const barangays = allBarangay.barangays;
  const rules = [
    {
      required: true,
    },
  ];

  useEffect(() => {
    form.setFieldsValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.emailAddresses?.[0]?.emailAddress,
      city: "Calbayog",
    });
    setDisableState([
      checkDisabled("firstName"),
      checkDisabled("lastName"),
      checkDisabled("email"),
    ]);
  }, [user]);

  const checkDisabled = (key: string) => {
    const values = form.getFieldsValue();
    return isLoaded && values[key] ? true : false;
  };

  const onAddCustomer = (e: any) => {
    mutate({
      ...e,
      emailID: user?.id,
    });
    deleteCookie("user");
    router.push("/user");
  };

  const backButtonSignOutClerk = () => {
    return () => {
      deleteCookie("user");
      return router.push("/");
    };
  };

  return (
    <Form
      form={form}
      initialValues={{ size: "large" }}
      size={"large"}
      className=" m-4 max-h-fit w-[50rem] overflow-scroll rounded-lg bg-[#fff5dc] p-10 px-4 drop-shadow-md sm:px-10"
      onFinish={onAddCustomer}
    >
      <div className=" flex w-full flex-col items-center justify-center">
        <PingPingIcon classStyle="z-10 flex flex-col font-cavean text-6xl -mt-6 font-black text-white drop-shadow-lg " />
        <span className=" my-3 w-full bg-[#efe1c6] px-3 font-light text-[#a05e35d5]">
          <span>Note: </span>Kindly be aware that the option to place orders is
          exclusively available for residents of Calbayog, Samar, Philippines.
        </span>
      </div>
      <div>
        <span className=" text-xl font-semibold">Personal Details</span>
        <div className="mt-3 flex  flex-row items-center justify-between gap-2  sm:gap-2 ">
          <div className=" m-0 w-full flex-1">
            <span className="  text-[#023047]">Firstname</span>
            <Form.Item name="firstName" rules={rules}>
              <Input placeholder="e.g. Juan" disabled={disableState[0]} />
            </Form.Item>
          </div>
          <div className=" m-0 w-full flex-1">
            <span className="  text-[#023047]">Lastname</span>
            <Form.Item name="lastName" rules={rules}>
              <Input placeholder="e.g. Dela Cruz" disabled={disableState[1]} />
            </Form.Item>
          </div>
        </div>
        <div className="mt-0 flex flex-1 flex-row gap-2 sm:mt-0">
          <div className=" m-0 w-full flex-1">
            <span className="  text-[#023047]">Phone Number</span>
            <Form.Item name="phone" rules={rules}>
              <InputNumber className=" w-full" placeholder="e.g. 09********" />
            </Form.Item>
          </div>
          <div className=" m-0 w-full flex-1">
            <span className="  text-[#023047]">Email(Optional)</span>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input
                placeholder="e.g. user@gmail.com"
                disabled={disableState[2]}
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className=" my-5">
        <span className=" text-xl font-semibold">
          Address{" "}
          <span className=" text-sm font-light text-slate-600">
            ( Province of Samar)
          </span>
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
              <Select placeholder={"Select Barangay"}>
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
      </div>
      <div className=" flex items-center justify-center gap-2">
        <SignOutButton signOutCallback={backButtonSignOutClerk()}>
          <Button className=" w-60 border-none text-[#023047] hover:drop-shadow-lg">
            Go Back
          </Button>
        </SignOutButton>
        <Button
          htmlType="submit"
          type="primary"
          className=" w-60 border-none hover:drop-shadow-lg"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default CustomerRegisterForm;
