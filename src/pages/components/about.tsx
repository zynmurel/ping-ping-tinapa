import { BsFillTelephonePlusFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { api } from "~/utils/api";

const About = () => {
  const { data, isLoading } = api.queries.getSettings.useQuery();
  console.log(data, "settings");
  return (
    <div className=" relative overflow-scroll">
      {data && !isLoading && (
        <>
          <span className=" w-1/2 text-lg text-[#023047] sm:text-2xl">
            {data?.about}
          </span>
          <div className=" mt-4 flex flex-col gap-3 text-[#313131] sm:gap-1">
            <div className=" flex flex-row items-center gap-4">
              <BsFillTelephonePlusFill /> <span>{data?.contact}</span>
            </div>
            <div className=" flex flex-row items-center gap-4">
              <MdEmail /> <span>{data?.email}</span>
            </div>
            <div className=" flex flex-row items-center gap-4">
              <FaLocationDot />
              <span>{data?.address}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default About;
