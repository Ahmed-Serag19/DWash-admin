import { useTranslation } from "react-i18next";
import { HoverEffect } from "./ui/card-hover-effect";
import { IoIosPersonAdd, IoIosPeople } from "react-icons/io";
import { RiDiscountPercentFill, RiUserSettingsFill } from "react-icons/ri";
import { MdChecklist, MdChecklistRtl } from "react-icons/md";

// English projects array
const projectsEn = [
  {
    title: <IoIosPersonAdd />,
    description: "Add a new Service Provider",
    link: "/service-provider-form",
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
    link: "/service-requests",
  },
  {
    title: <MdChecklist />,
    description: "Add a new Service requests",
    link: "https://amazon.com",
  },
  {
    title: <RiUserSettingsFill />,
    description: "Edit Profiles Requests",
    link: "https://microsoft.com",
  },
];

// Arabic projects array
const projectsAr = [
  {
    title: <IoIosPersonAdd />,
    description: "إضافة مقدم خدمة جديد",
    link: "/service-provider-form",
  },
  {
    title: <IoIosPeople />,
    description: "مقدمي الخدمات",
    link: "/service-providers",
  },
  {
    title: <RiDiscountPercentFill />,
    description: "إضافة خصم جديد",
    link: "/coupons",
  },
  {
    title: <MdChecklistRtl />,
    description: "طلبات العملاء",
    link: "/clients-orders",
  },
  {
    title: <MdChecklist />,
    description: "طلبات اضافة خدمة جديدة",
    link: "/service-requests",
  },
  {
    title: <RiUserSettingsFill />,
    description: "طلبات تعديل الملف الشخصي",
    link: "https://microsoft.com",
  },
];
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
