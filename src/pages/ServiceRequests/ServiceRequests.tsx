import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";
import { endpoints } from "@/constants/endPoints";
import { toast } from "react-toastify";
import WaitingServiceCard from "@/components/WaitingServiceCard";
import { ServiceRequest } from "@/interfaces/interfaces";

const ServiceRequests: React.FC = () => {
  const { t } = useTranslation();
  const [openedRequests, setOpenedRequests] = useState<ServiceRequest[]>([]);
  const [closedRequests, setClosedRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"opened" | "closed">("opened");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = sessionStorage.getItem("accessToken");

  const pageSize = 6;

  const fetchOpenedRequests = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(endpoints.getWaitingServices, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const requests = response.data || [];
        setOpenedRequests(requests);
      } else {
        toast.error(response.data?.messageEn || t("errorFetchingData"));
      }
    } catch (error) {
      toast.error(t("errorFetchingData"));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClosedRequests = async (page: number, size: number = pageSize) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        endpoints.getClosedServices(page - 1, size),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        const requests = response.data.content.data || [];
        const pages =
          Math.ceil(response.data.content.totalElements / size) || 1;

        setClosedRequests(requests);
        setTotalPages(pages);
      } else {
        toast.error(response.data?.messageEn || t("errorFetchingData"));
      }
    } catch (error) {
      toast.error(t("errorFetchingData"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async (id: number) => {
    try {
      const response = await axios.put(endpoints.acceptRequest(id), null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        toast.success(t("acceptSuccess"));
        fetchOpenedRequests();
      } else {
        toast.error(response.data.messageEn || t("unknownError"));
      }
    } catch (error) {
      toast.error(t("acceptFailed"));
    }
  };

  const handleRejectRequest = async (id: number) => {
    try {
      const response = await axios.put(endpoints.rejectRequest(id), null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        toast.success(t("rejectSuccess"));
        fetchOpenedRequests();
      } else {
        toast.error(response.data.messageEn || t("unknownError"));
      }
    } catch (error) {
      toast.error(t("rejectFailed"));
    }
  };

  const handleViewDetails = (request: ServiceRequest) => {
    console.log(request);
  };

  useEffect(() => {
    if (activeTab === "opened") {
      fetchOpenedRequests();
    } else {
      fetchClosedRequests(currentPage, pageSize);
    }
  }, [activeTab, currentPage]);
  return (
    <main className="flex flex-col items-center justify-start min-h-[calc(100vh-210px)]">
      <div className="pt-10 mb-5">
        <h1 className="text-3xl text-blue-900 font-bold">
          {t("serviceRequests")}
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <Tabs
          defaultValue="opened"
          className="w-full max-w-6xl flex flex-col items-center"
          onValueChange={(value) => {
            setActiveTab(value as "opened" | "closed");
            setCurrentPage(1);
          }}
        >
          <TabsList className="md:min-w-[400px] flex mb-5 text-blue-900">
            <TabsTrigger value="opened" className="w-1/2">
              Opened Requests
            </TabsTrigger>
            <TabsTrigger value="closed" className="w-1/2">
              Closed Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="opened"
            className="transition-all duration-300 p-5 min-h-[400px]"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <span className="loader"></span>
              </div>
            ) : (
              <div className="grid min-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {openedRequests.map((request) => (
                  <WaitingServiceCard
                    key={request.id}
                    request={request}
                    onAccept={handleAcceptRequest}
                    onReject={handleRejectRequest}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="closed"
            className="transition-all duration-300 p-5 min-h-[400px]"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <span className="loader"></span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {closedRequests.map((request) => (
                  <WaitingServiceCard
                    key={request.request.id}
                    request={request}
                    onAccept={handleAcceptRequest}
                    onReject={handleRejectRequest}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
            <Pagination className="py-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>
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
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ServiceRequests;