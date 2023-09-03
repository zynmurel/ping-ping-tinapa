import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
} from "antd";
import { useContext, useEffect } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { api } from "~/utils/api";
import { NotificationContext } from "../../context/contextProvider";
const ProductEditModal = ({
  openModal,
  setOpenModal,
  setDataSet,
  dataSet,
  refetch,
  refetchHiddenProducts,
}: any) => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const { mutate } = api.mutations.editProduct.useMutation({
    onSuccess: () => {
      setDataSet({});
      refetch();
      setOpenModal("");
      openNotificationWithIcon("success", "Success", "Product Edited");
    },
  });
  const { mutate: hideProductMutation } =
    api.mutations.hideOrUnhideProduct.useMutation({
      onSuccess: () => {
        setDataSet({});
        refetch();
        refetchHiddenProducts();
        setOpenModal("");
        openNotificationWithIcon(
          "info",
          "Product Hidden",
          "You can check the hidden products in the Hidden Products section"
        );
      },
    });
  const { mutate: updateStock } = api.mutations.addOrSubtractStocks.useMutation(
    {
      onSuccess: (data) => {
        setDataSet({});
        refetch();
        setOpenModal("");
        openNotificationWithIcon(
          "success",
          "Stock/s Updated",
          `You have now ${data.stock} stock/s of ${data.name}`
        );
      },
    }
  );
  const handleCancel = () => {
    setDataSet({});
    setOpenModal("");
  };
  console.log(dataSet);
  useEffect(() => {
    form.setFieldsValue({
      name: dataSet?.productName,
      description: dataSet?.description,
      category: dataSet?.category,
      price: dataSet?.price,
    });
    form2.setFieldValue("stock", dataSet.stock);
  }, [dataSet]);
  const onFinishEdit = (e: any) => {
    mutate({
      productId: dataSet.id,
      productName: e.name,
      productDescription: e.description,
      category: e.category,
      price: e.price,
      image: dataSet.image,
    });
  };
  const onFinishUpdateStock = (e: any) => {
    console.log(e);
    updateStock({
      productId: dataSet.id,
      stocks: e.stock,
    });
  };
  const confirmHide = () => {
    hideProductMutation({
      productId: dataSet.id,
      hidden: true,
    });
  };
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
    <Modal
      open={openModal}
      onCancel={handleCancel}
      footer={[]}
      className=" mt-28"
    >
      {openModal === "Edit" && (
        <Form form={form} onFinish={onFinishEdit}>
          <div className=" flex items-center justify-between">
            <div className=" mb-5 flex flex-row items-center gap-2">
              <AiOutlineEdit fontSize={20} />
              <span className=" text-base font-medium">Edit Product</span>
            </div>
            <Popconfirm
              title="Hide Product"
              description="Are you sure to hide this product? "
              onConfirm={confirmHide}
              okText="Yes"
              cancelText="No"
            >
              <div className=" mb-5 mr-7 flex cursor-pointer flex-row items-center gap-1 rounded border border-solid border-red-400 px-2 text-red-400 hover:bg-red-50">
                <span className=" text-sm">Hide Product</span>
              </div>
            </Popconfirm>
          </div>
          <div className=" flex w-full items-center justify-center">
            <img
              alt={"Product Image"}
              src={dataSet.image}
              className=" h-36 rounded-xl"
            />
          </div>
          <div>
            <span>Product Name</span>
            <Form.Item name="name" className=" mb-3" rules={rules.name}>
              <Input placeholder="Product Name" />
            </Form.Item>
          </div>
          <div>
            <span>Product Description</span>
            <Form.Item
              name="description"
              className=" mb-3"
              rules={rules.description}
            >
              <Input placeholder="Product Description" />
            </Form.Item>
          </div>
          <div className=" flex w-full flex-row gap-2">
            <div className=" flex-1">
              <span>Category</span>
              <Form.Item
                name="category"
                className=" mb-3"
                rules={rules.category}
              >
                <Select placeholder="Product Category">
                  {["TINAPA", "PASALUBONG"].map((b) => (
                    <Select.Option key={b} value={b}>
                      {b}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className=" flex-1">
              <span>Price (Peso)</span>
              <Form.Item name="price" className=" mb-3" rules={rules.price}>
                <InputNumber placeholder="Product Price" className=" w-full" />
              </Form.Item>
            </div>
          </div>
          <div className=" flex flex-row gap-2">
            <Button
              onClick={handleCancel}
              className=" mt-2 h-10 flex-1 cursor-pointer rounded-md border-none  text-base transition-all"
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className=" mt-2 h-10 flex-1 cursor-pointer rounded-md border-none bg-yellow-400  text-base transition-all hover:bg-yellow-500"
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
      {openModal === "Add" && (
        <Form form={form2} onFinish={onFinishUpdateStock}>
          <div className=" flex items-center justify-between">
            <div className=" mb-5 flex flex-row items-center gap-2">
              <AiOutlineEdit fontSize={20} />
              <span className=" text-base font-medium">Update Stock</span>
            </div>
          </div>
          <div className=" flex w-full items-center justify-center">
            <div>
              <span className=" text-xl font-semibold">Stock/s</span>
              <Form.Item name="stock" className=" mb-3" rules={rules.stocks}>
                <InputNumber placeholder="Stocks" className=" mt-2" />
              </Form.Item>
            </div>
          </div>
          <div className=" mx-auto flex w-1/2 flex-row gap-2">
            <Button
              onClick={handleCancel}
              className=" mt-2 h-10 flex-1 cursor-pointer rounded-md   text-base transition-all"
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className=" mt-2 h-10 flex-1 cursor-pointer rounded-md border-none bg-yellow-400  text-base transition-all hover:bg-yellow-500"
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default ProductEditModal;
