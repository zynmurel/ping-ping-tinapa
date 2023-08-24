import { useContext } from "react";
import { UserContext } from "../../context/contextProvider";
import { Card } from "antd";
import ProviderLayout from "../../context/ProviderLayout";
import Confirmation from "./Confirmation";

const ConfirmationPage = () => {
  return (
    <ProviderLayout>
      <Confirmation />
    </ProviderLayout>
  );
};

export default ConfirmationPage;
