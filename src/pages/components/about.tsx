import { BsFillTelephonePlusFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const About = () => {
  return (
    <div className=" relative overflow-scroll">
      <span className=" w-1/2 text-lg text-[#023047] sm:text-2xl">
        Ping's Smoked Fish Tinapa offers the finest selection of tinapa
        available in Calbayog. Our delectable tinapa products stand as a
        testament to our commitment to quality. While we currently cater to
        orders within the Calbayog area exclusively, we warmly welcome walk-in
        customers as well. You can find us situated at Rono Street, Purok 4,
        Barangay Matobato, Calbayog, Samar, Philippines.
      </span>
      <div className=" mt-4 flex flex-col gap-3 text-[#313131] sm:gap-1">
        <div className=" flex flex-row items-center gap-4">
          <BsFillTelephonePlusFill /> <span>+639162619929</span>
        </div>
        <div className=" flex flex-row items-center gap-4">
          <MdEmail /> <span>pingpingstinapa@yahoo.com</span>
        </div>
        <div className=" flex flex-row items-center gap-4">
          <FaLocationDot />
          <span>Rono Street, Purok 4, Barangay Matobato, Calbayog, Samar</span>
        </div>
      </div>
    </div>
  );
};

export default About;
