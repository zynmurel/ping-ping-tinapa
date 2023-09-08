import ProviderLayout from "../../context/ProviderLayout";
import AdminLayout from "../layout";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Divider, Form, Input, InputNumber } from "antd";
import { UserProfile } from "@clerk/nextjs";
import {
  NotificationContext,
  SettingContext,
} from "../../context/contextProvider";
import { api } from "~/utils/api";
import { FaEdit } from "react-icons/fa";
const { TextArea } = Input;

const SettingsPage = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [disableForm, setDisableForm] = useState(true);
  const [disableFormDelivery, setDisableFormDelivery] = useState(true);
  const {
    data: settings,
    isLoading: settingsIsLoading,
    refetch,
  } = api.queries.getSettings.useQuery();
  const formRules = [{ required: true }];
  const { mutate } = api.mutations.updateStoreInformation.useMutation({
    onSuccess: () => {
      openNotificationWithIcon("success", "Success", "Store's Info Updated");
      refetch();
      setDisableForm(true);
      setDisableFormDelivery(true);
    },
  });
  const { mutate: mutateFee } =
    api.mutations.updateStoreDeliveryFee.useMutation({
      onSuccess: () => {
        openNotificationWithIcon("success", "Success", "Delivery Fee Updated");
        refetch();
        setDisableForm(true);
        setDisableFormDelivery(true);
      },
    });
  useEffect(() => {
    form.setFieldsValue({
      email: settings?.email,
      contact: settings?.contact,
      address: settings?.address,
      about: settings?.about,
    });
    form2.setFieldsValue({
      delivery: settings?.deliveryFee,
    });
  }, [settings]);
  const handleSubmitSettingInfo = (e: any) => {
    mutate({
      address: e.address,
      email: e.email,
      about: e.about,
      phone: e.contact,
    });
  };
  const handleSubmitSettingDelivery = (e: any) => {
    mutateFee({
      fee: e.delivery,
    });
  };
  const handleSetDisableStore = () => {
    setDisableForm(!disableForm);
    setDisableFormDelivery(true);
  };
  const handleSetDisableDelivery = () => {
    setDisableForm(true);
    setDisableFormDelivery(!disableFormDelivery);
  };
  return (
    <ProviderLayout>
      <AdminLayout>
        <div className=" h-full  bg-gradient-to-l from-[#fff4da] to-[#ecbf76] p-2">
          <div
            className="relative h-full overflow-scroll rounded-xl bg-[#0f1d36] p-1"
            style={{ maxHeight: 880 }}
          >
            <div className=" flex w-full flex-col items-start justify-between">
              <div className=" flex h-20 items-center justify-center px-8 text-4xl font-bold text-white">
                Settings
              </div>
              <div className="relative flex h-full w-full flex-col items-center rounded-xl bg-[#ffff] p-1 ">
                <Card
                  style={{ width: "100%", height: "90%", border: "none" }}
                  bodyStyle={{
                    height: 780,
                    padding: 50,
                    paddingTop: 20,
                    paddingBottom: 20,
                    overflow: "scroll",
                  }}
                >
                  <div className=" flex h-full w-full justify-center">
                    <div className=" flex h-full w-1/2 flex-col items-start overflow-scroll rounded-lg p-5 px-10  shadow-md">
                      <div className=" flex w-full justify-between text-2xl font-medium">
                        Store Information{" "}
                        {disableForm && (
                          <FaEdit
                            onClick={handleSetDisableStore}
                            fontSize={40}
                            className="  cursor-pointer px-2 text-orange-400 hover:scale-105 hover:brightness-105"
                          />
                        )}
                      </div>
                      <Form
                        name="basic"
                        form={form}
                        className="w-full py-5"
                        onFinish={handleSubmitSettingInfo}
                      >
                        <div className=" flex gap-2">
                          <div className="flex flex-1 flex-col">
                            <span className=" self-start">Email Address:</span>
                            {!disableForm ? (
                              <Form.Item rules={formRules} name="email">
                                <Input placeholder="some@email.com" />
                              </Form.Item>
                            ) : (
                              <span className=" font-base mb-5 rounded-lg   p-1 text-left">
                                {settings?.email}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col">
                            <span className=" self-start">
                              Contact Number :
                            </span>{" "}
                            {!disableForm ? (
                              <Form.Item rules={formRules} name="contact">
                                <Input placeholder="09*********" />
                              </Form.Item>
                            ) : (
                              <span className=" font-base mb-5 rounded-lg   p-1 text-left">
                                {settings?.contact}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className=" flex gap-2">
                          <div className="flex flex-1 flex-col">
                            <span className=" self-start">Address :</span>{" "}
                            {!disableForm ? (
                              <Form.Item rules={formRules} name="address">
                                <Input placeholder="Store Address" />
                              </Form.Item>
                            ) : (
                              <span className=" font-base mb-5 rounded-lg   p-1 text-left">
                                {settings?.address}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className=" flex gap-2">
                          <div className="flex flex-1 flex-col">
                            <span className=" self-start">About Us :</span>
                            {!disableForm ? (
                              <Form.Item rules={formRules} name="about">
                                <TextArea
                                  rows={5}
                                  placeholder="Please Input text here for the store's information"
                                />
                              </Form.Item>
                            ) : (
                              <span className=" font-base mb-5 rounded-lg   p-1 text-left">
                                {settings?.about}
                              </span>
                            )}
                          </div>
                        </div>
                        {!disableForm && (
                          <div className=" flex w-full items-center justify-end gap-2">
                            <Button
                              onClick={() => setDisableForm(true)}
                              className=" cursor-pointer rounded border-none shadow-md hover:scale-105 hover:brightness-105"
                            >
                              Cancel
                            </Button>
                            <Button
                              htmlType="submit"
                              className=" cursor-pointer rounded border-none bg-yellow-300   shadow-md hover:scale-105 hover:brightness-105"
                            >
                              Submit
                            </Button>
                          </div>
                        )}
                      </Form>
                      <Divider />
                      <div className=" flex w-full justify-between text-2xl font-medium">
                        Delivery Fee{" "}
                        {disableFormDelivery && (
                          <FaEdit
                            onClick={handleSetDisableDelivery}
                            fontSize={40}
                            className="  cursor-pointer px-2 text-orange-400 hover:scale-105 hover:brightness-105"
                          />
                        )}
                      </div>
                      <Form
                        name="basic"
                        form={form2}
                        className="w-full py-5"
                        onFinish={handleSubmitSettingDelivery}
                      >
                        <div className=" flex gap-2">
                          <div className="flex flex-1 flex-col">
                            <span className=" self-start">Delivery Fee:</span>
                            {!disableFormDelivery ? (
                              <Form.Item
                                rules={formRules}
                                name="delivery"
                                className=" w-1/2 self-start"
                              >
                                <InputNumber
                                  placeholder="P 100"
                                  className=" w-full"
                                />
                              </Form.Item>
                            ) : (
                              <span className=" font-base mb-5 rounded-lg   p-1 text-left">
                                P {settings?.deliveryFee}
                              </span>
                            )}
                          </div>
                        </div>
                        {!disableFormDelivery && (
                          <div className=" flex w-full items-center justify-end gap-2">
                            <Button
                              onClick={() => setDisableFormDelivery(true)}
                              className=" cursor-pointer rounded border-none shadow-md hover:scale-105 hover:brightness-105"
                            >
                              Cancel
                            </Button>
                            <Button
                              htmlType="submit"
                              className=" cursor-pointer rounded border-none bg-yellow-300   shadow-md hover:scale-105 hover:brightness-105"
                            >
                              Submit
                            </Button>
                          </div>
                        )}
                      </Form>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProviderLayout>
  );
};

export default SettingsPage;
