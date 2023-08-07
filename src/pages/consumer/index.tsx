import { UserButton } from "@clerk/nextjs";

const ConsumerPage = () => {
  return (
    <>
      Consumer
      <UserButton afterSignOutUrl="/" />
    </>
  );
};

export default ConsumerPage;
