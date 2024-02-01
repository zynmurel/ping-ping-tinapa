import { api } from "~/utils/api";
import { DatePicker, Select, Table } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const columns = [
  {
    title: "Order Date",
    dataIndex: "date",
    key: "date",
    render: (date: any) => {
      return <>{`${dayjs(date).format("MMM DD YYYY")}`}</>;
    },
  },
  {
    title: "Product Name",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Price per Product",
    dataIndex: "productPrice",
    key: "productPrice",
    render: (price: any) => {
      return <>{`₱ ${price}`}</>;
    },
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (price: any) => {
      return <>{`₱ ${price}`}</>;
    },
  },
];

const ProductReports = () => {
  const [dates, setDates] = useState<any>([
    dayjs().subtract(1, "day"),
    dayjs(),
  ]);
  const [selected, setSelected] = useState("ALL");
  const { data: orders } = api.orders.getOrders.useQuery({
    category: selected,
    dateStart: dayjs(dates[0]).toDate(),
    dateEnd: dayjs(dates[1]).toDate(),
  });

  const _onChangeDate = (value: any) => {
    setDates(value);
  };
  const _handleSelect = (value: string) => {
    setSelected(value);
  };
  return (
    <div className=" flex w-full flex-col justify-start gap-5">
      <span className=" w-full text-start text-5xl font-bold">
        Order Reports
      </span>
      <div className=" flex flex-row gap-5">
        <RangePicker
          size="large"
          onChange={_onChangeDate}
          value={dates}
          format={"MMM DD YYYY"}
        />
        <Select
          size="large"
          style={{ width: 150 }}
          value={selected}
          onChange={_handleSelect}
          options={[
            { value: "ALL", label: "ALL" },
            { value: "TINAPA", label: "TINAPA" },
            { value: "PASALUBONG", label: "PASALUBONG" },
          ]}
        />
      </div>
      <Table dataSource={orders} columns={columns} scroll={{ y: 500 }} />;
    </div>
  );
};

export default ProductReports;
