import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { api } from "~/utils/api";
ChartJS.register(ArcElement, Tooltip);
const ProductPieGraph = () => {
  const { data: productData, isLoading } =
    api.queries.getProductsForChart.useQuery();
  const productNames = productData?.map((data) => data.name);
  const productQuantity = productData?.map((data) => {
    if (data.Order.length === 0) {
      return 0;
    } else {
      const datas = data.Order.map((data) =>
        data.quantity === undefined ? 0 : data.quantity
      );
      // console.log(datas);
      return datas.reduce((a, b) => a + b);
    }
  });
  console.log(productQuantity);
  const bgColors = [
    "#fd5901",
    "#249ea0",
    "#f78104",
    "#008083",
    "#faab36",
    "#005f60",
  ];
  const data = {
    labels: productNames,
    datasets: [
      {
        data: productQuantity,
        backgroundColor: bgColors,
      },
    ],
  };
  const options = {};
  return (
    <div>
      <div className=" flex w-full flex-row items-center justify-center gap-20">
        <div className=" w-3/6">
          <Pie data={data} options={options} />
        </div>
        <div className=" justify-betweenfont-semibold flex h-full w-3/6 flex-col items-start">
          <span className=" mx-auto text-5xl font-bold">Order By Products</span>
          <div className=" mt-5 flex w-full flex-col items-start gap-2 rounded-lg bg-slate-100 p-5">
            <span className="mb-2 text-xl font-semibold">Products :</span>
            {productData?.map((data, index) => {
              return (
                <div className=" flex flex-row gap-3 text-base">
                  <div
                    className={`w-10 flex-none rounded`}
                    style={{ backgroundColor: bgColors[index] }}
                  ></div>
                  {data.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPieGraph;
