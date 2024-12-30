import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  FaUser,
  FaCalendarAlt,
  FaMoneyBill,
  FaReceipt,
  FaBarcode,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { endpoints } from "@/constants/endPoints";
import { toast } from "react-toastify";
import { Order } from "@/interfaces/interfaces";

const ClientsOrders = () => {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([
    {
      invoiceId: 132,
      brandId: 50,
      brandNameAr: "ناديا",
      brandNameEn: "Nadia",
      userNameAr: "Abdelwahab",
      userNameEn: "Abdelwahab",
      userPhoneNumber: "0549976777",
      latitude: null,
      longitude: null,
      status: "PAID",
      totalAmount: 500.0,
      discountAmount: 0.0,
      dueAmount: 500.0,
      reviewed: false,
      fromTime: "15:35:00",
      timeTo: "16:35:00",
      reservationDate: "2024-12-03",
      request: {
        id: 242,
        requestCodeId: 6,
        createdOn: "2024-12-02T19:43:50.700+00:00",
        waitingProcessId: 1,
        status: 100,
        statusName: "WAITING",
        requestTypeNameAr: "طلب خدمة",
        requestTypeNameEn: "REQUEST_SERVICE",
        cancellation: false,
      },
      itemDto: {
        invoiceItemId: 150,
        invoiceId: 132,
        itemNameAr: "قص شعر",
        itemNameEn: "Hair cut",
        serviceTypeAr: "خدمة شعر",
        serviceTypeEn: "Hair Service",
        itemPrice: 500.0,
        itemExtraDtos: null,
      },
    },
    {
      invoiceId: 131,
      brandId: 67,
      brandNameAr: "فاطمة",
      brandNameEn: "Fatma",
      userNameAr: "حميده",
      userNameEn: "حميده",
      userPhoneNumber: "0549098986",
      latitude: null,
      longitude: null,
      status: "PAID",
      totalAmount: 5000.0,
      discountAmount: 0.0,
      dueAmount: 5000.0,
      reviewed: false,
      fromTime: "19:40:30",
      timeTo: "20:40:30",
      reservationDate: "2024-11-28",
      request: {
        id: 225,
        requestCodeId: 6,
        createdOn: "2024-11-27T16:47:43.853+00:00",
        waitingProcessId: 1,
        status: 100,
        statusName: "WAITING",
        requestTypeNameAr: "طلب خدمة",
        requestTypeNameEn: "REQUEST_SERVICE",
        cancellation: false,
      },
      itemDto: {
        invoiceItemId: 149,
        invoiceId: 131,
        itemNameAr: "قص شعر",
        itemNameEn: "Hair cut",
        serviceTypeAr: "خدمة شعر",
        serviceTypeEn: "Hair Service",
        itemPrice: 5000.0,
        itemExtraDtos: null,
      },
    },
    {
      invoiceId: 130,
      brandId: 55,
      brandNameAr: "اربينا",
      brandNameEn: "Arbeena",
      userNameAr: "Abdelwahab",
      userNameEn: "Abdelwahab",
      userPhoneNumber: "0549976777",
      latitude: null,
      longitude: null,
      status: "PAID",
      totalAmount: 100.0,
      discountAmount: 10.0,
      dueAmount: 90.0,
      reviewed: false,
      fromTime: "19:35:50",
      timeTo: "22:35:50",
      reservationDate: "2024-11-27",
      request: {
        id: 222,
        requestCodeId: 6,
        createdOn: "2024-11-26T19:19:10.912+00:00",
        waitingProcessId: 1,
        status: 100,
        statusName: "WAITING",
        requestTypeNameAr: "طلب خدمة",
        requestTypeNameEn: "REQUEST_SERVICE",
        cancellation: false,
      },
      itemDto: {
        invoiceItemId: 148,
        invoiceId: 130,
        itemNameAr: "خدمة شعر",
        itemNameEn: "Hair Cut",
        serviceTypeAr: "خدمة شعر",
        serviceTypeEn: "Hair Service",
        itemPrice: 100.0,
        itemExtraDtos: null,
      },
    },
    {
      invoiceId: 127,
      brandId: 68,
      brandNameAr: "النود",
      brandNameEn: "Alnod",
      userNameAr: "Abdelwahab",
      userNameEn: "Abdelwahab",
      userPhoneNumber: "0549976777",
      latitude: null,
      longitude: null,
      status: "PAID",
      totalAmount: 5000.0,
      discountAmount: 0.0,
      dueAmount: 5000.0,
      reviewed: false,
      fromTime: "22:35:55",
      timeTo: "23:35:55",
      reservationDate: "2024-11-30",
      request: {
        id: 217,
        requestCodeId: 6,
        createdOn: "2024-11-25T18:38:36.209+00:00",
        waitingProcessId: 1,
        status: 100,
        statusName: "WAITING",
        requestTypeNameAr: "طلب خدمة",
        requestTypeNameEn: "REQUEST_SERVICE",
        cancellation: false,
      },
      itemDto: {
        invoiceItemId: 145,
        invoiceId: 127,
        itemNameAr: "قص شعر",
        itemNameEn: "Hair cut",
        serviceTypeAr: "خدمة شعر",
        serviceTypeEn: "Hair Service",
        itemPrice: 5000.0,
        itemExtraDtos: null,
      },
    },
    {
      invoiceId: 125,
      brandId: 67,
      brandNameAr: "فاطمة",
      brandNameEn: "Fatma",
      userNameAr: "Abdelwahab",
      userNameEn: "Abdelwahab",
      userPhoneNumber: "0549976777",
      latitude: null,
      longitude: null,
      status: "PAID",
      totalAmount: 5300.0,
      discountAmount: 0.0,
      dueAmount: 5300.0,
      reviewed: false,
      fromTime: "23:00:05",
      timeTo: "23:55:05",
      reservationDate: "2024-11-26",
      request: {
        id: 213,
        requestCodeId: 6,
        createdOn: "2024-11-25T17:58:06.242+00:00",
        waitingProcessId: 2,
        status: 100,
        statusName: "ACCEPTED",
        requestTypeNameAr: "طلب خدمة",
        requestTypeNameEn: "REQUEST_SERVICE",
        cancellation: false,
      },
      itemDto: {
        invoiceItemId: 143,
        invoiceId: 125,
        itemNameAr: "قص شعر",
        itemNameEn: "Hair cut",
        serviceTypeAr: "خدمة شعر",
        serviceTypeEn: "Hair Service",
        itemPrice: 5000.0,
        itemExtraDtos: [
          {
            itemExtraId: 26,
            itemExtraNameAr: "خدمة قص صغر ",
            itemExtraNameEn: "Short hair cut",
            invoiceItemId: 143,
            itemExtraPrice: 300.0,
          },
        ],
      },
    },
    {
      invoiceId: 124,
      brandId: 60,
      brandNameAr: "مواهب",
      brandNameEn: "Mawahib",
      userNameAr: "Ahmed Hussein",
      userNameEn: "Ahmed Hussein",
      userPhoneNumber: "0582906777",
      latitude: null,
      longitude: null,
      status: "PAID",
      totalAmount: 4150.0,
      discountAmount: 0.0,
      dueAmount: 4150.0,
      reviewed: false,
      fromTime: "22:20:25",
      timeTo: "23:55:25",
      reservationDate: "2024-11-26",
      request: {
        id: 201,
        requestCodeId: 6,
        createdOn: "2024-11-25T17:22:01.793+00:00",
        waitingProcessId: 1,
        status: 100,
        statusName: "WAITING",
        requestTypeNameAr: "طلب خدمة",
        requestTypeNameEn: "REQUEST_SERVICE",
        cancellation: false,
      },
      itemDto: {
        invoiceItemId: 142,
        invoiceId: 124,
        itemNameAr: "قص شعر",
        itemNameEn: "Hair Cut",
        serviceTypeAr: "خدمة شعر",
        serviceTypeEn: "Hair Service",
        itemPrice: 4000.0,
        itemExtraDtos: [
          {
            itemExtraId: 25,
            itemExtraNameAr: "خدمة قص صغر ",
            itemExtraNameEn: "Short hair cut",
            invoiceItemId: 142,
            itemExtraPrice: 150.0,
          },
        ],
      },
    },
    {
      invoiceId: 123,
      brandId: 55,
      brandNameAr: "اربينا",
      brandNameEn: "Arbeena",
      userNameAr: "Abdelwahab",
      userNameEn: "Abdelwahab",
      userPhoneNumber: "0549976777",
      latitude: null,
      longitude: null,
      status: "PAID",
      totalAmount: 100.0,
      discountAmount: 0.0,
      dueAmount: 100.0,
      reviewed: false,
      fromTime: "04:50:40",
      timeTo: "07:50:40",
      reservationDate: "2024-11-24",
      request: {
        id: 197,
        requestCodeId: 6,
        createdOn: "2024-11-21T06:25:05.762+00:00",
        waitingProcessId: 2,
        status: 100,
        statusName: "ACCEPTED",
        requestTypeNameAr: "طلب خدمة",
        requestTypeNameEn: "REQUEST_SERVICE",
        cancellation: false,
      },
      itemDto: {
        invoiceItemId: 141,
        invoiceId: 123,
        itemNameAr: "خدمة شعر",
        itemNameEn: "Hair Cut",
        serviceTypeAr: "خدمة شعر",
        serviceTypeEn: "Hair Service",
        itemPrice: 100.0,
        itemExtraDtos: null,
      },
    },
    {
      invoiceId: 120,
      brandId: 50,
      brandNameAr: "ناديا",
      brandNameEn: "Nadia",
      userNameAr: "Abdelwahab",
      userNameEn: "Abdelwahab",
      userPhoneNumber: "0549976777",
      latitude: null,
      longitude: null,
      status: "PAID",
      totalAmount: 650.0,
      discountAmount: 0.0,
      dueAmount: 650.0,
      reviewed: false,
      fromTime: "16:35:20",
      timeTo: "17:35:20",
      reservationDate: "2024-11-19",
      request: {
        id: 185,
        requestCodeId: 6,
        createdOn: "2024-11-19T08:40:31.052+00:00",
        waitingProcessId: 1,
        status: 100,
        statusName: "WAITING",
        requestTypeNameAr: "طلب خدمة",
        requestTypeNameEn: "REQUEST_SERVICE",
        cancellation: false,
      },
      itemDto: {
        invoiceItemId: 138,
        invoiceId: 120,
        itemNameAr: "قص شعر",
        itemNameEn: "Hair cut",
        serviceTypeAr: "خدمة شعر",
        serviceTypeEn: "Hair Service",
        itemPrice: 500.0,
        itemExtraDtos: [
          {
            itemExtraId: 23,
            itemExtraNameAr: "خدمة قص صغر ",
            itemExtraNameEn: "Short hair cut",
            invoiceItemId: 138,
            itemExtraPrice: 150.0,
          },
        ],
      },
    },
    {
      invoiceId: 117,
      brandId: 50,
      brandNameAr: "ناديا",
      brandNameEn: "Nadia",
      userNameAr: "Abdelwahab",
      userNameEn: "Abdelwahab",
      userPhoneNumber: "0549976777",
      latitude: null,
      longitude: null,
      status: "PAID",
      totalAmount: 500.0,
      discountAmount: 0.0,
      dueAmount: 500.0,
      reviewed: false,
      fromTime: "10:55:15",
      timeTo: "11:55:15",
      reservationDate: "2024-11-19",
      request: {
        id: 183,
        requestCodeId: 6,
        createdOn: "2024-11-18T17:34:33.060+00:00",
        waitingProcessId: 2,
        status: 100,
        statusName: "ACCEPTED",
        requestTypeNameAr: "طلب خدمة",
        requestTypeNameEn: "REQUEST_SERVICE",
        cancellation: false,
      },
      itemDto: {
        invoiceItemId: 135,
        invoiceId: 117,
        itemNameAr: "قص شعر",
        itemNameEn: "Hair cut",
        serviceTypeAr: "خدمة شعر",
        serviceTypeEn: "Hair Service",
        itemPrice: 500.0,
        itemExtraDtos: null,
      },
    },
    {
      invoiceId: 112,
      brandId: 55,
      brandNameAr: "اربينا",
      brandNameEn: "Arbeena",
      userNameAr: "Ahmed Hussein",
      userNameEn: "Ahmed Hussein",
      userPhoneNumber: "0582906777",
      latitude: null,
      longitude: null,
      status: "PAID",
      totalAmount: 100.0,
      discountAmount: 0.0,
      dueAmount: 100.0,
      reviewed: false,
      fromTime: "21:25:10",
      timeTo: "22:25:10",
      reservationDate: "2024-11-15",
      request: {
        id: 173,
        requestCodeId: 6,
        createdOn: "2024-11-13T16:16:32.284+00:00",
        waitingProcessId: 1,
        status: 100,
        statusName: "WAITING",
        requestTypeNameAr: "طلب خدمة",
        requestTypeNameEn: "REQUEST_SERVICE",
        cancellation: false,
      },
      itemDto: {
        invoiceItemId: 130,
        invoiceId: 112,
        itemNameAr: "خدمة شعر",
        itemNameEn: "Hair Cut",
        serviceTypeAr: "خدمة شعر",
        serviceTypeEn: "Hair Service",
        itemPrice: 100.0,
        itemExtraDtos: null,
      },
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // const fetchOrders = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(endpoints.getOrders, {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.data.success) {
  //       setOrders(response.data.content.data);
  //     } else {
  //       toast.error(t("errorFetchingOrders"));
  //     }
  //   } catch (error) {
  //     toast.error(t("errorFetchingOrders"));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  const handleCancelOrder = (invoiceId: number) => {
    // Logic for canceling the order
    toast.info(t("cancelOrderFeatureComingSoon"));
  };

  const handleShowDetails = (invoiceId: number) => {
    // Logic for showing order details
    toast.info(t("showDetailsFeatureComingSoon"));
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 py-3">
        {t("clientOrders")}
      </h1>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {orders.map((order) => (
            <Card key={order.invoiceId} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-blue-900 text-lg font-bold flex gap-3 items-center border-b pb-3 border-stone-800">
                  <FaReceipt className="inline-block mr-2 text-blue-800" />
                  <span>
                    {t("invoiceId")}: {order.invoiceId}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  <FaUser className="text-blue-800 mr-2" />
                  <span className="font-medium">{t("serviceProvider")}:</span>
                  <span className="mx-2 place-items-end">
                    {i18n.language === "ar"
                      ? order.brandNameAr
                      : order.brandNameEn}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaUser className="text-blue-800 mr-2" />
                  <span className="font-medium">{t("clientName")}:</span>
                  <span className="mx-2">
                    {i18n.language === "ar"
                      ? order.userNameAr
                      : order.userNameEn}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaMoneyBill className="text-green-500 mr-2" />
                  <span className="font-medium">{t("totalAmount")}:</span>
                  <span className="mx-2">{order.totalAmount} SAR</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-blue-800 mr-2" />
                  <span className="font-medium">{t("reservationDate")}:</span>
                  <span className="mx-2">{order.reservationDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaBarcode className="text-blue-800 mr-2" />
                  <span className="font-medium">{t("orderNumber")}:</span>
                  <span className="mx-2">{order.request.id}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-3">
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                  onClick={() => handleShowDetails(order.invoiceId)}
                >
                  {t("showDetails")}
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700 transition duration-300"
                  onClick={() => handleCancelOrder(order.invoiceId)}
                >
                  {t("cancelOrder")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientsOrders;
