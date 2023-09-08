import { Card, Table, Input, Select, Spin, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { api } from "~/utils/api";
import OrderModal from "./ordersModal";
import { IoReload } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
const { Search } = Input;

const OrderTable = () => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const {
    data: userData,
    isLoading: userIsLoading,
    isError,
  } = api.queries.getUser.useQuery({
    id: user ? user.id : "",
  });
  const [activeStatus, setactiveStatus] = useState<string>("PENDING");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>("");
  const [activeOrderType, setActiveOrderType] =
    useState<string>("DELIVERY & PICK-UP");
  const [searchText, setSearchText] = useState<string>("");

  const { data, isLoading, refetch } =
    api.queries.getTransactionByUser.useQuery({
      id: userData?.id || "",
    });
  const { data: productData, isLoading: productIsLoading } =
    api.queries.getProducts.useQuery();

  const getOrdersByStatus = (dataS: any, status: string) => {
    const data = dataS?.map((data: any) => {
      if (data.status === status) {
        return {
          date: dayjs(data.updatedAt).format("MMM-DD-YYYY"),
          key: data.id,
          name: `${data.user.firstName} ${data.user.lastName}`,
          address: `${data.user.barangay}, ${data.user.street} - ${data.user.placeDetails}`,
          contact: data.user.phone,
          type: data.type,
          action: "View",
        };
      }
    });
    return data?.filter((data: any) => data !== undefined);
  };
  let dataS = getOrdersByStatus(data, activeStatus);
  if (activeOrderType !== "DELIVERY & PICK-UP") {
    dataS = dataS.filter((data: any) => data.type === activeOrderType);
  }

  if (searchText) {
    dataS = dataS.filter((data: any) =>
      data.name.toLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }
  const orderPerId = data?.filter((data: any) => data.id === activeId);
  const count = (status: any) => {
    return data?.filter((d) => d.status === status).length || 0;
  };
  let color: string = "";
  switch (activeStatus) {
    case "PENDING":
      color = "hover:bg-orange-400 text-orange-900  bg-orange-300";
      break;
    case "CANCELLED":
      color = "hover:bg-red-400 text-red-900  bg-red-300";
      break;
    case "DONE":
      color = "hover:bg-green-400 text-green-900  bg-green-300";
      break;
    case "ONGOING":
      color = "hover:bg-blue-400 text-blue-900  bg-blue-300";
      break;
  }
  console.log(color);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Order Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Order/s",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_: any, data: any) => {
        return (
          <div
            onClick={() => {
              setModalOpen(true);
              setActiveId(data.key);
            }}
            className={` text:xs mx-auto w-10 cursor-pointer rounded-md p-2 text-center transition-all duration-200  hover:scale-105 sm:w-32 sm:text-base ${color}`}
          >
            {_}
          </div>
        );
      },
    },
  ];
  const onTab2Change = (key: string) => {
    setactiveStatus(key);
  };
  const tabListNoTitle = [
    {
      key: "PENDING",
      label: (
        <span
          className={` font-base rounded-md  p-1 px-2 text-xs sm:p-2 sm:px-5 sm:text-base  ${
            activeStatus === "PENDING"
              ? "bg-orange-200 text-orange-600"
              : "text-orange-400"
          }`}
        >
          Pending
        </span>
      ),
    },
    {
      key: "ONGOING",
      label: (
        <span
          className={` font-base rounded-md p-1 px-2 text-xs sm:p-2 sm:px-5 sm:text-base ${
            activeStatus === "ONGOING"
              ? "bg-blue-200 text-blue-600"
              : "text-blue-400"
          }`}
        >
          Ongoing
        </span>
      ),
    },
    {
      key: "DONE",
      label: (
        <span
          className={` font-base rounded-md  p-1 px-2 text-xs sm:p-2 sm:px-5 sm:text-base ${
            activeStatus === "DONE"
              ? "bg-green-200 text-green-600"
              : "text-green-400"
          }`}
        >
          Done
        </span>
      ),
    },
    {
      key: "CANCELLED",
      label: (
        <span
          className={` font-base rounded-md  p-1 px-2 text-xs sm:p-2 sm:px-5 sm:text-base ${
            activeStatus === "CANCELLED"
              ? "bg-red-200 text-red-600"
              : "text-red-400"
          }`}
        >
          Cancelled
        </span>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen rounded-xl  sm:px-40 sm:py-10">
      <div className=" flex w-full items-center justify-between px-2 ">
        <div className=" flex h-14 items-center justify-center gap-2 text-xl font-bold sm:h-20 sm:text-4xl">
          <MdArrowBack
            onClick={() => router.push("/user/customer")}
            className=" cursor-pointer text-2xl text-slate-600 hover:scale-105 hover:text-black sm:text-4xl"
          />{" "}
          My Orders{" "}
        </div>
        <div className=" flex items-center gap-1">
          <OrderModal
            refetch={refetch}
            productData={productData}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            orderPerId={orderPerId}
            setActiveId={setActiveId}
            activeStatus={activeStatus}
          />
        </div>
      </div>
      <Card
        size="small"
        style={{ width: "100%", height: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeStatus}
        onTabChange={onTab2Change}
        bodyStyle={{ position: "relative" }}
      >
        {!isLoading && data && (
          <Table
            size="small"
            dataSource={[...dataS]}
            scroll={{ y: 500 }}
            columns={columns}
            className="  rounded-xl bg-white p-1"
          />
        )}
      </Card>
      ;
    </div>
  );
};

export default OrderTable;
