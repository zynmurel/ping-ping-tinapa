import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Select } from "antd";
import dayjs from "dayjs";
import { api } from "~/utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function ProductLineGraph() {
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const { data: transactionData, isLoading } =
    api.queries.getAllDoneTransaction.useQuery();
  const [transactionThisYear, setTransactionThisYear] = useState(
    transactionData?.filter((data) => {
      return dayjs(data.createdAt).format("YYYY") === dayjs().format("YYYY");
    })
  );
  useEffect(() => {
    setTransactionThisYear(
      transactionData?.filter((data) => {
        return dayjs(data.createdAt).format("YYYY") === year;
      })
    );
  }, [year, transactionData]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const transactionSales = labels.map((label) => {
    let sales = 0;
    transactionThisYear?.map((data) => {
      if (dayjs(data.createdAt).format("MMMM") === label) {
        sales = sales + (data.totalPrice || 0);
      }
    });
    return sales;
  });
  const total = transactionSales.reduce((a, b) => a + b);
  console.log(total);
  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: transactionSales,
        borderColor: "#fd5901",
        backgroundColor: "#fd5901",
      },
    ],
  };
  return (
    <div className=" flex w-full flex-row items-center justify-between gap-10">
      <div className=" justify-betweenfont-semibold flex  w-2/6 flex-col items-start">
        <span className=" mx-auto text-5xl font-bold">Product Sales</span>
        <div className=" mt-2 flex w-full items-center justify-center gap-3 rounded-md p-1 py-3">
          {/* <span className=" text-2xl font-bold ">Year </span> */}
          <Select
            size="large"
            className=" w-full"
            defaultValue={year}
            options={[
              { value: "2022", label: "2022" },
              { value: "2023", label: "2023" },
            ]}
            onChange={(e) => {
              setYear(e);
            }}
          />
        </div>
        <div className=" mt-5 flex w-full flex-col items-center gap-5 rounded-lg bg-slate-100 p-5">
          {/* <div className=" flex flex-row gap-3 text-xl font-semibold">
            <div
              className={`w-10 flex-none rounded`}
              style={{ backgroundColor: "#fd5901" }}
            ></div>
            {"Sales"}
          </div> */}
          {/* <div className=" flex flex-row gap-3 text-xl font-semibold">
            <div className={`w-10 flex-none rounded`}>Y</div>
            {"Sale in Peso"}
          </div>
          <div className=" flex flex-row gap-3 text-xl font-semibold">
            <div className={`w-10 flex-none rounded`}>X</div>
            {"Month of Sale"}
          </div> */}
          <div className=" flex flex-col items-center justify-center gap-3 text-lg font-semibold">
            <div className={`flex-none rounded`}>TOTAL SALES YEAR {year}</div>
            <div className=" text-3xl text-green-800">{`₱ ${total}`}</div>
          </div>
        </div>
      </div>
      <div className=" w-4/6">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
