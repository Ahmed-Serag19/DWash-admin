import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";
import { endpoints } from "@/constants/endPoints";
import { toast } from "react-toastify";
import UserCard from "@/components/UserCard";
import { FreelancerData } from "@/interfaces/interfaces";
import { useDebounce } from "use-debounce";
import i18n from "@/i18n";

const ServiceProviders: React.FC = () => {
  const { t } = useTranslation();
  const [activeUsers, setActiveUsers] = useState<FreelancerData[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<FreelancerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounced search term
  const token = sessionStorage.getItem("accessToken");

  const pageSize = 6; // Default page size for active users

  // const fetchUsers = async (
  //   type: "active" | "inactive",
  //   page: number,
  //   size: number = pageSize
  // ) => {
  //   setIsLoading(true);
  //   try {
  //     const pageSizeToUse = type === "inactive" ? 3 : size;
  //     const url =
  //       type === "active"
  //         ? endpoints.activeServiceProviders(page - 1, pageSizeToUse)
  //         : endpoints.inactiveServiceProviders(page - 1, pageSizeToUse);

  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.data.success) {
  //       const users = response.data.content.data;
  //       const pages = Math.ceil(
  //         response.data.content.totalElements / pageSizeToUse
  //       );
  //       if (type === "active") {
  //         setActiveUsers(users);
  //       } else {
  //         setInactiveUsers(users);
  //       }
  //       setTotalPages(pages);
  //     } else {
  //       toast.error(response.data.messageEn || t("errorFetchingData"));
  //     }
  //   } catch (error: unknown) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       toast.error(t("errorFetchingData"));
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const fetchUsers = async (
    type: "active" | "inactive",
    page: number,
    size: number = pageSize,
    name?: string // Optional name parameter
  ) => {
    setIsLoading(true);
    try {
      const pageSizeToUse = type === "inactive" ? 3 : size;
      let url =
        type === "active"
          ? endpoints.activeServiceProviders(page - 1, pageSizeToUse)
          : endpoints.inactiveServiceProviders(page - 1, pageSizeToUse);

      // If search term exists, append it to the URL
      if (name) {
        url = `${url}&name=${name}`;
      }

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

  useEffect(() => {
    fetchUsers(
      activeTab,
      currentPage,
      activeTab === "inactive" ? 3 : pageSize,
      debouncedSearchTerm
    );
  }, [activeTab, currentPage, debouncedSearchTerm]); // Trigger fetch on search term change

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update search term
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
        toast.success(t("activationSuccess"));
        fetchUsers("inactive", currentPage, 3);
      } else {
        toast.error(response.data.messageEn || t("unknownError"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t("activationFailed"));
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
        toast.success(t("deactivationSuccess"));
        fetchUsers("active", currentPage, pageSize); // Pass size explicitly for active users
      } else {
        toast.error(response.data.messageEn || t("unknownError"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(t("deactivationFailed"));
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-[calc(100vh-210px)]">
      <div className="pt-10 mb-5">
        <h1 className="text-3xl text-blue-900 font-bold">
          {t("serviceProviders")}
        </h1>
      </div>
      {/* Search Input */}
      <div className="mb-5">
        <input
          type="text"
          placeholder={t("searchByName")}
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded focus:border-blue-950"
        />
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
              {t("active")}
            </TabsTrigger>
            <TabsTrigger value="inactive" className="w-1/2">
              {t("inactive")}
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
                {activeUsers.length > 0 && (
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
                            title={i18n.language === "en" ? "Next" : "التالي"}
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
                )}
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
                {inactiveUsers.length > 0 && (
                  <Pagination className="py-5">
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
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ServiceProviders;
