import ProviderLayout from "../../context/ProviderLayout";
import AdminLayout from "../layout";
import { useState } from "react";
import { Card, Divider } from "antd";
import ProductPieGraph from "./components/pieGraph";
import ProductLineGraph from "./components/lineGraph";
import ProductReports from "./components/productReports";

const AdminProducts = () => {
  const [activeStatus, setactiveStatus] = useState<string>("Charts");
  const tabListNoTitle = [
    {
      key: "Charts",
      label: "Report",
    },
    // {
    //   key: "Reports",
    //   label: "Report List",
    // },
  ];
  const onTab2Change = (key: string) => {
    setactiveStatus(key);
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
                Reports
              </div>
              <div className="relative flex h-full w-full flex-col items-center rounded-xl bg-[#ffff] p-1 px-20 ">
                <Card
                  style={{ width: "100%", height: "90%", border: "none" }}
                  activeTabKey={activeStatus}
                  onTabChange={onTab2Change}
                  bodyStyle={{
                    height: 780,
                    padding: 50,
                    overflow: "scroll",
                  }}
                >
                  {activeStatus === "Charts" && (
                    <div className=" flex flex-col gap-20">
                      <ProductReports />
                      <ProductLineGraph />
                      <Divider className=" -mb-5 -mt-5" />
                      <ProductPieGraph />
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProviderLayout>
  );
};

export default AdminProducts;
