import { useTranslation } from "react-i18next";
import { HoverEffect } from "./ui/card-hover-effect";
import { IoIosPersonAdd } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdChecklist } from "react-icons/md";
import { MdChecklistRtl } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";

export default function HomepageLinks() {
  const { i18n } = useTranslation();
  return (
    <div className="mx-auto ">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: <IoIosPersonAdd />,
    description: "Add a new Service Provider",
    link: "/login",
  },
  {
    title: <IoIosPeople />,
    description: "Service Providers",
    link: "https://netflix.com",
  },
  {
    title: <RiDiscountPercentFill />,
    description: "Add a new discount",
    link: "https://google.com",
  },
  {
    title: <MdChecklistRtl />,
    description: "Clients Orders",
    link: "https://meta.com",
  },
  {
    title: <MdChecklist />,
    description: "Service Providers Requests: Services",
    link: "https://amazon.com",
  },
  {
    title: <RiUserSettingsFill />,
    description: "Service Providers Requests: Personal Profile",
    link: "https://microsoft.com",
  },
];
