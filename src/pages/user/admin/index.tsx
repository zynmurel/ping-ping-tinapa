import { SignOutButton, UserButton } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

const AdminPage = () => {
  const router = useRouter();
  return (
    <>
      <SignOutButton>
        <button
          onClick={() => {
            deleteCookie("user");
            router.push("/");
          }}
        >
          sign out
        </button>
      </SignOutButton>
    </>
  );
};

export default AdminPage;
