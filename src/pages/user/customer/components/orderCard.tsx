import { Button, Divider } from "antd";

const OrderCard = () => {
  return (
    <div className=" flex flex-1 flex-col  rounded-xl  ">
      <div className="flex flex-1 flex-col items-center justify-between rounded-3xl bg-[#ffffffd3] p-2 px-6 drop-shadow-lg">
        <div className=" w-full">
          <Divider>
            <span className=" w-full py-2 text-3xl text-[#023047]">
              Your Order
            </span>
          </Divider>
        </div>
        <div className=" w-full flex-1 rounded-lg bg-[#00000007] p-3">Some</div>
        <button className=" m-3 flex w-2/3 cursor-pointer  items-center justify-center rounded-full border-none bg-[#ffc233] p-3 text-xl font-bold text-[#1b4b62] transition-all hover:bg-[#ffaa33] hover:drop-shadow-md">
          Submit Order
          <img src="/cart.svg" className="w-5 pl-2 sm:w-8" />
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
