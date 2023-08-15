import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <img src="/fishLoading.svg" width={45} className=" pl-2" />;

const SpinFishLoading: React.FC = () => (
  <div className=" flex min-h-screen w-full items-center justify-center">
    <img src="/fishLoading.svg" className=" w-14 animate-bounce pl-2" />
  </div>
);

export default SpinFishLoading;
