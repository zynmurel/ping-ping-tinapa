const MenuCard = ({ menu, setMenuActive, menuActive }: any) => {
  return (
    <div className=" flex w-full flex-1 gap-1 rounded-full  bg-[#ffffffbf] p-1 shadow-md ">
      {menu.map(({ key, title }: any) => (
        <a
          key={key}
          href={`#${key}`}
          className={` w-1/4 cursor-pointer rounded-full  p-3 px-10 text-center text-lg font-medium no-underline transition-all ${
            menuActive === key
              ? "bg-[#ffa72c]  text-white"
              : " bg-[#ffc23351] text-slate-600"
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
