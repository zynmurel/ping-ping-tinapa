import { Card, Table, Input, Select, Spin, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { api } from "~/utils/api";
import OrderModal from "./ordersModal";
import { IoReload } from "react-icons/io5";
const { Search } = Input;

const OrderTable = () => {
  const [activeStatus, setactiveStatus] = useState<string>("PENDING");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>("");
  const [activeOrderType, setActiveOrderType] =
    useState<string>("DELIVERY & PICK-UP");
  const [searchText, setSearchText] = useState<string>("");

  const { data, isLoading, refetch } = api.queries.getAllTransaction.useQuery();
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
            className={` cursor-pointer rounded-md p-2 text-center  transition-all duration-200 hover:scale-105 ${color}`}
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
          className={` font-base rounded-md  p-2 px-5 text-xl  ${
            activeStatus === "PENDING"
              ? "bg-orange-200 text-orange-600"
              : "text-orange-400"
          }`}
        >
          <div className=" absolute right-0 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-xs text-white">
            {count("PENDING")}
          </div>
          Orders
        </span>
      ),
    },
    {
      key: "ONGOING",
      label: (
        <span
          className={` font-base rounded-md  p-2 px-5 text-xl ${
            activeStatus === "ONGOING"
              ? "bg-blue-200 text-blue-600"
              : "text-blue-400"
          }`}
        >
          <div className=" absolute right-0 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            {count("ONGOING")}
          </div>
          Ongoing
        </span>
      ),
    },
    {
      key: "DONE",
      label: (
        <span
          className={` font-base rounded-md  p-2 px-5 text-xl ${
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
          className={` font-base rounded-md  p-2 px-5 text-xl ${
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

  const onSearch = (value: any) => {
    setSearchText(value.target.value);
  };
  return (
    <div className="relative h-full rounded-xl bg-[#0f1d36] p-1">
      <div className=" flex w-full items-center justify-between px-8">
        <div className=" flex h-20 items-center justify-center text-4xl font-bold text-white">
          Order List
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
          <Search
            size="large"
            placeholder="Search Customer"
            onChange={onSearch}
            defaultValue={searchText}
            style={{ width: 400 }}
          />
          <Select
            showSearch
            placeholder="Order Type"
            size="large"
            defaultValue={activeOrderType}
            style={{ width: 200 }}
            options={[
              {
                key: "delpick",
                label: "DELIVERY & PICK-UP",
                value: "DELIVERY & PICK-UP",
              },
              { key: "pick", label: "PICK-UP", value: "PICKUP" },
              { key: "deliver", label: "DELIVER", value: "DELIVER" },
            ]}
            onChange={(data) => setActiveOrderType(data)}
          />
        </div>
      </div>
      <Card
        style={{ width: "100%", height: "90%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeStatus}
        onTabChange={onTab2Change}
        bodyStyle={{ maxHeight: 500, position: "relative" }}
        headStyle={{ marginLeft: 40 }}
      >
        <div
          onClick={() => refetch()}
          className=" absolute -top-11 left-4 flex cursor-pointer items-center rounded-md bg-[#516b9a] p-1 transition-all hover:brightness-90 "
        >
          <IoReload
            fontSize={20}
            className=" text-white transition-all hover:rotate-45"
          />
        </div>
        {!isLoading && data && (
          <Table
            dataSource={[...dataS]}
            scroll={{ y: 500 }}
            columns={columns}
            className="  rounded-xl bg-white p-1"
          />
        )}
        {isLoading && (
          <div className=" flex h-full w-full items-center justify-center">
            <Spin size="large" />
          </div>
        )}
      </Card>
      ;
    </div>
  );
};

export default OrderTable;
