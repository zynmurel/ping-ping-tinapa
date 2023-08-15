import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConfigProvider } from "antd";
import { theme } from "~/utils/providerprops";

const MyApp: AppType = ({ Component, pageProps }) => {
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
        <div className="min-w-screen min-h-screen bg-black bg-gradient-to-l from-[#fff4da] to-[#ecbf76] font-sans">
          <Component {...pageProps} />
        </div>
      </ClerkProvider>
    </ConfigProvider>
  );
};

export default api.withTRPC(MyApp);
