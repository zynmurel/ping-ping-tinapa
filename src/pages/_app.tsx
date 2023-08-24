import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConfigProvider, notification } from "antd";
import { theme } from "~/utils/providerprops";
import { NotificationContext } from "./user/context/contextProvider";

type NotificationType = "success" | "info" | "warning" | "error";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  return (
    <ConfigProvider theme={theme}>
      <ClerkProvider
        {...pageProps}
        appearance={{
          layout: {
            helpPageUrl: "",
            logoPlacement: "inside",
            privacyPageUrl: "",
            showOptionalFields: true,
            socialButtonsPlacement: "bottom",
            termsPageUrl: "",
          },
          variables: {
            colorPrimary: "#023047",
            colorText: "#023047",
            colorBackground: "#fff5dc",
            colorInputBackground: "white",
          },
        }}
      >
        <div className="min-w-screen min-h-screen overflow-hidden bg-black bg-gradient-to-l from-[#fff4da] to-[#ecbf76] font-sans">
          <NotificationContext.Provider value={{ openNotificationWithIcon }}>
            {contextHolder}
            <Component {...pageProps} />
          </NotificationContext.Provider>
        </div>
      </ClerkProvider>
    </ConfigProvider>
  );
};

export default api.withTRPC(MyApp);
