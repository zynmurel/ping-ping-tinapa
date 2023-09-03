import { Card, Image, Popconfirm, Table } from "antd";
import ProviderLayout from "../../context/ProviderLayout";
import AdminLayout from "../layout";
import { api } from "~/utils/api";
import ProductEditModal from "../components/productEditModal";
import { useContext, useState } from "react";
import { NotificationContext } from "../../context/contextProvider";
import { useRouter } from "next/router";

const AdminProducts = () => {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [activeStatus, setactiveStatus] = useState<string>("PRODUCTS");
  const router = useRouter();
  const { data, isLoading, refetch } = api.queries.getProducts.useQuery();
  const {
    data: hiddenProducts,
    isLoading: hiddenProducstLoading,
    refetch: refetchHiddenProducts,
  } = api.queries.getHiddenProducts.useQuery();
  const { mutate: hideProductMutation } =
    api.mutations.hideOrUnhideProduct.useMutation({
      onSuccess: () => {
        setDataSet({});
        refetch();
        refetchHiddenProducts();
        openNotificationWithIcon(
          "info",
          "Product Unhidden",
          "Product transfered to Products Section"
        );
      },
    });
  const [openModalAddEdit, setOpenModalAddEdit] = useState("");
  const [dataSet, setDataSet] = useState({});
  const productData =
    data?.map((pr) => {
      return {
        id: pr.id,
        productName: pr.name,
        description: pr.description,
        category: pr.category,
        price: pr.price,
        image: pr.image,
        stock: pr.stock,
      };
    }) || [];
  const hiddenProductsData =
    hiddenProducts?.map((pr) => {
      return {
        id: pr.id,
        productName: pr.name,
        description: pr.description,
        category: pr.category,
        price: pr.price,
        image: pr.image,
        stock: pr.stock,
      };
    }) || [];
  const confirmUnhide = (id: string) => {
    hideProductMutation({
      productId: id,
      hidden: false,
    });
  };
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "pn",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "des",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "cat",
      render: (_: string) => {
        return <div className=" capitalize">{_.toLowerCase()}</div>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "prc",
      render: (_: string) => {
        return `₱ ${_}`;
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "img",
      align: "center",
      render: (_: string) => {
        return <Image src={_} alt={"product image"} height={40} width={40} />;
      },
    },
    {
      title: "Stock/s",
      dataIndex: "stock",
      key: "stock",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "act",
      align: "center",
      render: (_: string, data: any) => {
        if (activeStatus === "PRODUCTS") {
          return (
            <div className=" flex flex-row gap-2">
              <button
                onClick={() => {
                  setDataSet(data);
                  setOpenModalAddEdit("Edit");
                }}
                className=" cursor-pointer rounded-md border-none bg-orange-500 p-2 text-white shadow-lg transition-all hover:brightness-105"
              >
                Edit Product
              </button>
              <button
                onClick={() => {
                  setDataSet(data);
                  setOpenModalAddEdit("Add");
                }}
                className=" cursor-pointer rounded-md border-none bg-yellow-500 p-2 text-white shadow-lg transition-all hover:brightness-105"
              >
                Update Stocks
              </button>
            </div>
          );
        }
        if (activeStatus === "HIDDEN") {
          return (
            <div className=" flex flex-row gap-2">
              <Popconfirm
                title="Unhide Product"
                description="This product will be unhidden"
                onConfirm={() => confirmUnhide(data.id)}
                okText="Continue"
                cancelText="Cancel"
              >
                <button className="flex-1 cursor-pointer rounded border-none bg-blue-500 p-2 text-white shadow-lg transition-all hover:brightness-105">
                  Unhide Product
                </button>
              </Popconfirm>
            </div>
          );
        }
      },
    },
  ];
  const tabListNoTitle = [
    {
      key: "PRODUCTS",
      label: (
        <span
          className={` font-base rounded-md  p-2 px-5 text-xl  ${
            activeStatus === "PRODUCTS"
              ? "bg-slate-200 text-slate-600"
              : "text-slate-400"
          }`}
        >
          Products
        </span>
      ),
    },
    {
      key: "HIDDEN",
      label: (
        <span
          className={` font-base rounded-md  p-2 px-5 text-xl  ${
            activeStatus === "HIDDEN"
              ? "bg-slate-200 text-slate-600"
              : "text-slate-400"
          }`}
        >
          Hidden Products
        </span>
      ),
    },
  ];
  const onTab2Change = (key: string) => {
    setactiveStatus(key);
  };
  return (
    <ProviderLayout>
      <AdminLayout>
        <ProductEditModal
          refetch={refetch}
          openModal={openModalAddEdit}
          setOpenModal={setOpenModalAddEdit}
          setDataSet={setDataSet}
          dataSet={dataSet}
          refetchHiddenProducts={refetchHiddenProducts}
        />
        <div className=" h-full bg-gradient-to-l from-[#fff4da] to-[#ecbf76] p-2">
          <div className="relative h-full rounded-xl bg-[#0f1d36] p-1">
            <div className=" flex h-20 w-full items-center justify-between  px-10">
              <span className=" text-4xl font-semibold text-white">
                Product List
              </span>
              <button
                onClick={() => router.push("/user/admin/addproduct")}
                className=" cursor-pointer rounded-lg border-none bg-[#ffc233] p-2 px-10 text-lg font-bold text-[#0f1d36] hover:brightness-110"
              >
                Add Products
              </button>
            </div>

            <div
              className=" rounded-lg bg-white p-2"
              style={{ width: "100%", height: "90%" }}
            >
              <Card
                style={{ width: "100%", height: "90%" }}
                tabList={tabListNoTitle}
                activeTabKey={activeStatus}
                onTabChange={onTab2Change}
                bodyStyle={{ maxHeight: 500, position: "relative" }}
              >
                <Table
                  dataSource={
                    activeStatus === "PRODUCTS"
                      ? [...productData]
                      : [...hiddenProductsData]
                  }
                  scroll={{ y: 650 }}
                  columns={columns}
                  className="rounded-xl bg-white p-1"
                />
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProviderLayout>
  );
};

export default AdminProducts;
