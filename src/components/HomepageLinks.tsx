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
  const isArabic = i18n.language === "ar";

  // Use conditional array based on language
  const projects = isArabic ? projectsAr : projectsEn;

  return (
    <div className="mx-auto">
      <HoverEffect items={projects} />
    </div>
  );
}

// English projects array
export const projectsEn = [
  {
    title: <IoIosPersonAdd />,
    description: "Add a new Service Provider",
    link: "/login",
  },
  {
    title: <IoIosPeople />,
    description: "Service Providers",
    link: "/service-providers",
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
    description: "Service Providers Requests:  Service",
    link: "https://amazon.com",
  },
  {
    title: <RiUserSettingsFill />,
    description: "Service Providers Requests:  Profile",
    link: "https://microsoft.com",
  },
];

// Arabic projects array
export const projectsAr = [
  {
    title: <IoIosPersonAdd />,
    description: "إضافة مقدم خدمة جديد",
    link: "/login",
  },
  {
    title: <IoIosPeople />,
    description: "مقدمي الخدمات",
    link: "/service-providers",
  },
  {
    title: <RiDiscountPercentFill />,
    description: "إضافة خصم جديد",
    link: "https://google.com",
  },
  {
    title: <MdChecklistRtl />,
    description: "طلبات العملاء",
    link: "https://meta.com",
  },
  {
    title: <MdChecklist />,
    description: "طلبات مقدمي الخدمات: خدمة جديدة",
    link: "https://amazon.com",
  },
  {
    title: <RiUserSettingsFill />,
    description: "طلبات مقدمي الخدمات: الملف الشخصي",
    link: "https://microsoft.com",
  },
];
