import { IoMdArrowRoundBack } from "react-icons/io";
import PingPingIcon from "./pingping";
import { useRouter } from "next/router";

const ClerkComponentLayout = ({ children }: { children: any }) => {
  const router = useRouter();
  return (
    <div className=" flex min-h-screen flex-col items-center justify-center font-sans">
      <PingPingIcon
        classStyle={
          "z-10 flex flex-col font-cavean text-7xl font-black text-white drop-shadow-lg -mb-4 -mt-10 sm:-mt-20"
        }
      />
      {children}
      <span
        onClick={() => router.push("/")}
        className=" item-center mt-5 flex cursor-pointer flex-row justify-center gap-1 rounded p-1 px-3 text-sm font-medium text-[#023047] hover:bg-[#0230472a]"
      >
        <IoMdArrowRoundBack size={20} /> Back to Home
      </span>
    </div>
  );
};

export default ClerkComponentLayout;
