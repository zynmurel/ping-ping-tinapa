import CustomerRegisterForm from "./CustomerRegisterForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Register = () => {
  const router = useRouter();
  console.log("Register is Called");
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        // Will run when leaving the current page; on back/forward actions
        // Add your logic here, like toggling the modal state
      }
      console.log(as);
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);
  return (
    <main className=" relative flex min-h-screen flex-1 items-center justify-center font-sans">
      <CustomerRegisterForm />
    </main>
  );
};

export default Register;
