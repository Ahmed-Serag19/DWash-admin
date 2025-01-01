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
import UserCard from "@/components/UserCard";
import { FreelancerData } from "@/interfaces/interfaces";

const ServiceProviders: React.FC = () => {
  const { t } = useTranslation();
  const [activeUsers, setActiveUsers] = useState<FreelancerData[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<FreelancerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = sessionStorage.getItem("accessToken");

  const pageSize = 6; // Default page size for active users

  const fetchUsers = async (
    type: "active" | "inactive",
    page: number,
    size: number = pageSize
  ) => {
    setIsLoading(true);
    try {
      const pageSizeToUse = type === "inactive" ? 3 : size;
      const url =
        type === "active"
          ? endpoints.activeServiceProviders(page - 1, pageSizeToUse)
          : endpoints.inactiveServiceProviders(page - 1, pageSizeToUse);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        const users = response.data.content.data;
        const pages = Math.ceil(
          response.data.content.totalElements / pageSizeToUse
        );
        if (type === "active") {
          setActiveUsers(users);
        } else {
          setInactiveUsers(users);
        }
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

  const handleUserActivation = async (userId: number) => {
    try {
      const response = await axios.put(
        endpoints.activateServiceProvider(userId),
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(t("Activation Success"));
        fetchUsers("inactive", currentPage, 3);
      } else {
        toast.error(response.data.messageEn || t("unknownError"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t("Activation Failed"));
      }
    }
  };

  const handleUserDeactivation = async (userId: number) => {
    try {
      const response = await axios.put(
        endpoints.deactivateServiceProvider(userId),
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(t("Deactivation Success"));
        fetchUsers("active", currentPage, pageSize); // Pass size explicitly for active users
      } else {
        toast.error(response.data.messageEn || t("unknownError"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t("Deactivation Failed"));
      }
    }
  };

  useEffect(() => {
    fetchUsers(activeTab, currentPage, activeTab === "inactive" ? 3 : pageSize);
  }, [activeTab, currentPage]);

  return (
    <main className="flex flex-col items-center justify-start min-h-[calc(100vh-210px)]">
      <div className="pt-10 mb-5">
        <h1 className="text-3xl text-blue-900 font-bold">
          {t("serviceProviders")}
        </h1>
      </div>
      <div className="w-full flex justify-center md:min-w-96 min-w-60">
        <Tabs
          defaultValue="active"
          className="w-full max-w-6xl md:min-w-96 min-w-60 flex flex-col items-center"
          onValueChange={(value) => {
            setActiveTab(value as "active" | "inactive");
            setCurrentPage(1);
          }}
        >
          <TabsList className="md:min-w-[400px] flex mb-5 text-blue-900">
            <TabsTrigger value="active" className="w-1/2">
              Active
            </TabsTrigger>
            <TabsTrigger value="inactive" className="w-1/2">
              Inactive
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="active"
            className="transition-all duration-300 p-5 min-h-[400px]"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <span className="loader"></span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {activeUsers.map((user) => (
                    <UserCard
                      key={user.brandId}
                      user={user}
                      isInactive={false}
                      onDeactivate={handleUserDeactivation}
                      onActivate={handleUserActivation}
                    />
                  ))}
                </div>
                <div className="overflow-x-auto">
                  <Pagination className="py-5 ">
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
                          href="#"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent
            value="inactive"
            className="transition-all duration-300 p-5 min-h-[400px]"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <span className="loader"></span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {inactiveUsers.map((user) => (
                    <UserCard
                      key={user.brandId}
                      user={user}
                      isInactive={true}
                      onDeactivate={handleUserDeactivation}
                      onActivate={handleUserActivation}
                    />
                  ))}
                </div>
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
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ServiceProviders;
