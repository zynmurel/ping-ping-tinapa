import ProviderLayout from "../../context/ProviderLayout";
import AdminLayout from "../layout";
import { api } from "~/utils/api";
import { useContext } from "react";
import { NotificationContext } from "../../context/contextProvider";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useRouter } from "next/router";

const AdminProducts = () => {
  const router = useRouter();
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [form] = Form.useForm();
  const rules = {
    name: [
      {
        required: true,
        message: "Product name is required",
      },
    ],
    description: [
      {
        required: true,
        message: "Product description is required",
      },
    ],
    category: [
      {
        required: true,
        message: "Product category is required",
      },
    ],
    price: [
      {
        required: true,
        message: "Product price is required",
      },
      {
        validator: async (_: any, value: any) => {
          if (value <= 0) {
            return Promise.reject(new Error("Invalid Price"));
          }
        },
      },
    ],
    stocks: [
      {
        required: true,
        message: "Product stocks is required",
      },
      {
        validator: async (_: any, value: any) => {
          if (value <= 0) {
            return Promise.reject(new Error("Invalid Number of stocks"));
          }
        },
      },
    ],
  };
  return (
    <ProviderLayout>
      <AdminLayout>
        <div className=" h-full bg-gradient-to-l from-[#fff4da] to-[#ecbf76] p-2">
          <div className="relative flex h-full flex-col items-center rounded-xl bg-[#0f1d36] p-1">
            <div className=" flex h-20 w-full items-center justify-between  px-10">
              <span className=" mt-5 w-full text-center text-4xl font-semibold text-white">
                Add Product
              </span>
            </div>
            <div className=" mt-10 w-1/2 rounded bg-white p-10">
              <Form form={form}>
                <div className=" flex flex-col items-start">
                  <span className=" text-lg font-bold ">Product Name</span>
                  <Form.Item
                    name="name"
                    className=" mb-3 w-full"
                    rules={rules.name}
                  >
                    <Input placeholder="Input Product Name" size="large" />
                  </Form.Item>
                </div>
                <div className=" mt-5 flex flex-col items-start">
                  <span className=" text-lg font-bold">
                    Product Description
                  </span>
                  <Form.Item
                    name="description"
                    className=" mb-3 w-full"
                    rules={rules.description}
                  >
                    <Input
                      placeholder="Input Product Description"
                      size="large"
                    />
                  </Form.Item>
                </div>
                <div className=" mt-5 flex w-full flex-row gap-2">
                  <div className=" flex flex-1 flex-col items-start">
                    <span className=" text-lg font-bold">Category</span>
                    <Form.Item
                      name="category"
                      className=" mb-3 w-full"
                      rules={rules.category}
                    >
                      <Select
                        placeholder="Select Product Category"
                        size="large"
                      >
                        {["TINAPA", "PASALUBONG"].map((b) => (
                          <Select.Option key={b} value={b}>
                            {b}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className=" flex flex-1 flex-col items-start">
                    <span className=" text-lg font-bold">Price (Peso)</span>
                    <Form.Item
                      name="price"
                      className=" mb-3 w-full"
                      rules={rules.price}
                    >
                      <InputNumber
                        placeholder="Input Product Price"
                        className=" w-full"
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className=" mt-5 flex w-full flex-row items-center justify-center gap-2">
                  <div className=" flex w-1/2  flex-col items-start">
                    <span className=" text-lg font-bold">Stock/s</span>
                    <Form.Item
                      name="stock"
                      className=" mb-3 w-full"
                      rules={rules.stocks}
                    >
                      <InputNumber
                        placeholder="Input Stock/s"
                        className=" w-full"
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className=" mt-10 flex flex-row gap-2">
                  <Button
                    onClick={() => router.push("/user/admin/products")}
                    className=" mt-2 h-14 flex-1 cursor-pointer rounded-md text-xl transition-all"
                  >
                    Cancel
                  </Button>
                  <Button
                    htmlType="submit"
                    className=" mt-2 h-14 flex-1 cursor-pointer rounded-md border-none bg-[#ffc233]  text-xl transition-all hover:brightness-105"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProviderLayout>
  );
};

export default AdminProducts;
