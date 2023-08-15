import { SignedIn, UserButton } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { setCookie } from "cookies-next";
import SpinFishLoading from "./components/spinLoadingFish";

const RouteProtection = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { data, isLoading, isError } = api.queries.getUser.useQuery({
    id: user ? user.id : "",
  });
  const router = useRouter();
  useEffect(() => {
    if (user && data) {
      setCookie("user", data.userType);
      console.log(data?.userType, "User");
      router.reload();
    }
    if (!data && !isLoading && user) {
      setCookie("user", "not-registered");
      router.reload();
    }
  });
  console.log(user && data);
  return (
    <SignedIn>
      <SpinFishLoading />
    </SignedIn>
  );
};

export default RouteProtection;
