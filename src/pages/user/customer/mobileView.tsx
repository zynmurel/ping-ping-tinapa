import { Modal } from "antd";
import Account from "./components/cards/accountCard";
import MenuCard from "./components/cards/menuCard";
import ProductsCard from "./components/cards/productsCard";
import { useState } from "react";
import TransactionType from "./components/cards/transactionTypeCard";
import OrderCard from "./components/cards/orderCard";

const MobileView = ({
  menu,
  setMenuActive,
  menuActive,
  menuProducts,
  products,
}: any) => {
  const [openSub, setOpenSub] = useState(false);
  const handleCancel = () => {
    setOpenSub(false);
  };
  return (
    <div className=" item-center flex flex-col sm:hidden">
      <Account />
      <div className=" m-2">
        <MenuCard
          menu={menu}
          setMenuActive={setMenuActive}
          menuActive={menuActive}
        />
        <ProductsCard
          menu={menu}
          menuProducts={menuProducts}
          products={products}
        />
        <button
          onClick={() => setOpenSub(true)}
          className={` mx-auto mt-4 flex w-5/6  cursor-pointer items-center justify-center rounded-full  border-none bg-[#ffa72c] p-3 text-lg font-bold text-[#1b4b62] transition-all hover:bg-[#ffaa33]  hover:drop-shadow-md`}
        >
          Place Order/s
          <img src="/cart.svg" className="w-5 pl-2 sm:w-8" />
        </button>
        <Modal
          open={openSub}
          onCancel={handleCancel}
          footer={[]}
          className=" -mt-12"
        >
          <TransactionType />
          <OrderCard />
        </Modal>
      </div>
    </div>
  );
};

export default MobileView;
