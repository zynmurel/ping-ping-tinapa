import AdminLayout from "./layout";
import ProviderLayout from "../context/ProviderLayout";
import OrderTable from "./components/orderTable";

const AdminPage = () => {
  return (
    <ProviderLayout>
      <AdminLayout>
        <div className=" h-full bg-gradient-to-l from-[#fff4da] to-[#ecbf76] p-2">
          <OrderTable />
        </div>
      </AdminLayout>
    </ProviderLayout>
  );
};

export default AdminPage;
