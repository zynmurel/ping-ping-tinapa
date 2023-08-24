const MenuCard = ({ menu, setMenuActive, menuActive }: any) => {
  return (
    <div className=" mt-4 flex w-full flex-1 justify-between gap-1 rounded-full  bg-[#ffffffbf] shadow-md sm:mt-0 sm:justify-start sm:p-1 ">
      {menu.map(({ key, title }: any) => (
        <a
          key={key}
          href={`#${key}`}
          className={` m-0.5 w-1/4 cursor-pointer rounded-full p-1 px-10  text-center text-sm font-medium no-underline transition-all sm:m-0 sm:p-3 sm:text-lg ${
            menuActive === key
              ? "bg-[#ffa72c]  text-white"
              : " bg-[#ffda3351] text-slate-600"
          }`}
          onClick={() => setMenuActive(key)}
        >
          {title}
        </a>
      ))}
    </div>
  );
};

export default MenuCard;
