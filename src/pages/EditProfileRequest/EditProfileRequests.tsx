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
import WaitingEditCard from "@/components/WaitingEditCard";
import WaitingEditModal from "@/components/WaitingEditModal";

const EditProfileRequests: React.FC = () => {
  const { t } = useTranslation();
  const [openedRequests, setOpenedRequests] = useState<any[]>([]);
  const [closedRequests, setClosedRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"opened" | "closed">("opened");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const token = sessionStorage.getItem("accessToken");

  const pageSize = 8;

  const fetchOpenedRequests = async (page: number, size: number = pageSize) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        endpoints.getWaitingBrandRequest(page - 1, size),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const requests = response.data.content.data || [];
        const pages =
          Math.ceil(response.data.content.totalElements / size) || 1;

        setOpenedRequests(requests);
        setTotalPages(pages);
      } else {
        toast.error(response.data.messageEn || t("errorFetchingData"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t("errorFetchingData"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClosedRequests = async (page: number, size: number = pageSize) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        endpoints.getClosedBrandRequest(page - 1, size),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const requests = response.data.content.data || [];
        const pages =
          Math.ceil(response.data.content.totalElements / size) || 1;

        setClosedRequests(requests);
        setTotalPages(pages);
      } else {
        toast.error(response.data.messageEn || t("errorFetchingData"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t("errorFetchingData"));
      }
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
        fetchOpenedRequests(currentPage, pageSize);
      } else {
        toast.error(response.data.messageEn || t("unknownError"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t("acceptFailed"));
      }
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
        fetchOpenedRequests(currentPage, pageSize);
      } else {
        toast.error(response.data.messageEn || t("unknownError"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t("rejectFailed"));
      }
    }
  };

  useEffect(() => {
    if (activeTab === "opened") {
      fetchOpenedRequests(currentPage, pageSize);
    } else {
      fetchClosedRequests(currentPage, pageSize);
    }
  }, [activeTab, currentPage]);

  return (
    <main className="flex flex-col items-center justify-start min-h-[calc(100vh-210px)]">
      <div className="pt-10 mb-5">
        <h1 className="text-3xl text-blue-900 font-bold">
          {t("editProfileRequests")}
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <Tabs
          defaultValue="opened"
          className="w-full max-w-6xl"
          onValueChange={(value) => {
            setActiveTab(value as "opened" | "closed");
            setCurrentPage(1);
          }}
        >
          <TabsList className="flex mb-5 text-blue-900">
            <TabsTrigger value="opened" className="w-1/2">
              {t("openedRequests")}
            </TabsTrigger>
            <TabsTrigger value="closed" className="w-1/2">
              {t("closedRequests")}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {openedRequests.map((request) => (
                  <WaitingEditCard
                    key={request.brandId}
                    request={request}
                    onAccept={handleAcceptRequest}
                    onReject={handleRejectRequest}
                  />
                ))}
              </div>
            )}
            <Pagination className="py-5 text-sm">
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
                  <WaitingEditCard key={request.brandId} request={request} />
                ))}
              </div>
            )}
            <Pagination className="py-5 text-sm">
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

      {selectedRequest && (
        <WaitingEditModal
          isOpen={!!selectedRequest}
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      )}
    </main>
  );
};

export default EditProfileRequests;
