import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { BsCart3 } from "react-icons/bs";
import type { MenuProps, MenuTheme } from "antd";
import { Menu, Typography } from "antd";
import { PiBowlFood } from "react-icons/pi";
import { TbReport } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/router";

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  type?: string;
}
const { Text } = Typography;

const SiderMenu: React.FC = () => {
  const router = useRouter();
  const path = router.pathname;
  const items: MenuItem[] = [
    {
      key: "/user/admin",
      icon: <BsCart3 size={20} />,
      label: "Orders",
    },
    {
      key: "/user/admin/products",
      icon: <PiBowlFood size={20} />,
      label: "Products",
    },
    {
      key: "/user/reports",
      icon: <TbReport size={20} />,
      label: "Reports",
    },
    {
      key: "/user/settings",
      icon: <LuSettings size={20} />,
      label: "Settings",
    },
  ];
  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [current, setCurrent] = useState(path);

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    console.log(e.key);
  };

  return (
    <>
      <Menu
        theme={theme}
        onClick={onClick}
        defaultOpenKeys={["/user/admin"]}
        selectedKeys={[current]}
        mode="inline"
        style={{ height: "100%", paddingTop: 10 }}
      >
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link href={item.key}>
              <Text className=" text-white">{item.label}</Text>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

export default SiderMenu;
