import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { endpoints } from "@/constants/endPoints";
import { toast } from "react-toastify";
import UserCard from "@/components/UserCard";
import { FreelancerData } from "@/interfaces/interfaces";

const ServiceProviders: React.FC = () => {
  const { t } = useTranslation();
  const [activeUsers, setActiveUsers] = useState<FreelancerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inactiveUsers, setInactiveUsers] = useState<FreelancerData[]>([]);
  const token = sessionStorage.getItem("accessToken");
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");

  const handleUserActivation = async (userId: number) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        toast.error(t("unauthorizedError"));
        return;
      }

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
        // Refresh both active and inactive lists
        await handleInactiveUsersCall();
        await handleActiveUsersCall();
      } else {
        toast.error(response.data.messageEn || t("unknownError"));
      }
    } catch (error) {
      console.error("Activation error:", error);
      toast.error(t("Activation Failed"));
    }
  };

  const handleUserDeactivation = async (userId: number) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        toast.error(t("unauthorizedError"));
        return;
      }

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
        // Refresh both active and inactive lists
        await handleInactiveUsersCall();
        await handleActiveUsersCall();
      } else {
        toast.error(response.data.messageEn || t("unknownError"));
      }
    } catch (error) {
      console.error("Deactivation error:", error);
      toast.error(t("Deactivation Failed"));
    }
  };

  useEffect(() => {
    if (activeTab === "active") {
      handleActiveUsersCall();
    } else if (activeTab === "inactive") {
      handleInactiveUsersCall();
    }
  }, [activeTab]);

  useEffect(() => {
    handleActiveUsersCall();
  }, []);

  const handleActiveUsersCall = async () => {
    setIsLoading(true);

    if (!token) {
      console.error("No access token found in session storage.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.get(endpoints.activeServiceProviders, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      if (data.success) {
        setActiveUsers(data.content.data);
      } else {
        toast.error(data.messageEn);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const messageEn = error.response?.data?.messageEn;
        if (messageEn === "unauthorized request") {
          toast.error("Unauthorized Request");
        } else {
          toast.error(messageEn || "An error occurred.");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Network error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInactiveUsersCall = async () => {
    setIsLoading(true);

    if (!token) {
      console.error("No access token found in session storage.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.get(endpoints.inactiveServiceProviders, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const data = response.data;
      if (data.success) {
        setInactiveUsers(data.content.data);
      } else {
        toast.error(data.messageEn);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const messageEn = error.response?.data?.messageEn;
        if (messageEn === "unauthorized request") {
          toast.error("Unauthorized Request");
        } else {
          toast.error(messageEn || "An error occurred.");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Network error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-[calc(100vh-210px)]">
      <div className="pt-10 mb-5">
        <h1 className="text-3xl text-blue-900 font-bold">
          {t("navbar.serviceProviders")}
        </h1>
      </div>
      <div className="w-full flex justify-center md:min-w-96 min-w-60">
        <Tabs
          defaultValue="active"
          className="w-full max-w-6xl md:min-w-96 min-w-60 flex flex-col items-center"
          onValueChange={(value) =>
            setActiveTab(value as "active" | "inactive")
          }
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
              <div className="flex justify-center items-center ">
                <span className="loader"></span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ServiceProviders;
