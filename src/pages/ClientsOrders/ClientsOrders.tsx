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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

const ClientsOrders = () => {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;
  const accessToken = sessionStorage.getItem("accessToken");

  const fetchOrders = async (page: number, size: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(endpoints.getOrders(page - 1, size), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        setOrders(response.data.content.data);
        const pages = Math.ceil(response.data.content.totalElements / size);
        setTotalPages(pages);
      } else {
        toast.error(t("errorFetchingOrders"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t("errorFetchingOrders"));
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders(currentPage, pageSize);
  }, []);
  useEffect(() => {
    fetchOrders(currentPage, pageSize);
  }, [currentPage]);

  const handleCancelOrder = async (invoiceId: number) => {
    setIsLoading(true);
    try {
      const response = await axios.put(endpoints.cancelOrder(invoiceId), null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        toast.success(t("orderDeletedSuccess"));
        fetchOrders(currentPage, pageSize);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          t("errorDeletingOrder") || error.response.data?.messageEn;

        toast.error(errorMessage);
      }
    }
  };
  const handleCompleteOrder = async (invoiceId: number) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        endpoints.completeOrder(invoiceId),
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(t("orderCompletedSuccess"));
        fetchOrders(currentPage, pageSize);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          t("errorCompletingOrder") || error.response.data?.messageEn;

        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="p-2 sm:p-4 flex flex-col items-center min-h-[calc(100vh-250px)]">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 py-3">
        {t("clientOrders")}
      </h1>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {orders.map((order) => (
              <Card
                key={order.invoiceId}
                className="shadow-md md:min-w-[330px]"
              >
                <CardHeader>
                  <CardTitle className="text-blue-900 text-lg font-bold flex gap-3  items-center border-b pb-3 border-stone-800">
                    <FaReceipt className="inline-block mr-2 text-blue-800" />
                    <span>
                      {t("invoiceId")}: {order.invoiceId}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-2 sm:p-4">
                  <div className="flex items-center gap-0.5">
                    <FaUser className="text-blue-800 mr-2" />
                    <span className="font-medium">{t("serviceProvider")}:</span>
                    <span className="mx-0.5 place-items-end">
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
                    <span className="font-medium">{t("creationDate")}:</span>
                    <span className="mx-1">
                      {order.request.createdOn.slice(0, 10)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-blue-800 mr-2" />
                    <span className="font-medium">{t("reservationDate")}:</span>
                    <span className="mx-2">{order.reservationDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-blue-800 mr-2" />
                    <span className="font-medium">{t("from")}:</span>
                    <span className="mx-2">{order.fromTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-blue-800 mr-2" />
                    <span className="font-medium">{t("to")}:</span>
                    <span className="mx-2">{order.timeTo}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBarcode className="text-blue-800 mr-2" />
                    <span className="font-medium">{t("orderNumber")}:</span>
                    <span className="mx-2">{order.request.id}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-3 my-2 sm:my-5">
                  <Button
                    className="bg-green-600 text-white hover:bg-green-700 transition duration-300"
                    onClick={() => handleCompleteOrder(order.request.id)}
                  >
                    {t("completeOrder")}
                  </Button>
                  <Button
                    className="bg-red-600 text-white hover:bg-red-700 transition duration-300"
                    onClick={() => handleCancelOrder(order.request.id)}
                  >
                    {t("cancelOrder")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {orders.length > 0 && (
            <Pagination className="pt-16 pb-1" dir="ltr">
              <PaginationContent>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    title={i18n.language === "en" ? "Next" : "التالي"}
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default ClientsOrders;
