import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaUserCircle } from "react-icons/fa";
import { endpoints } from "@/constants/endPoints";

interface UserDto {
  id: number;
  nameEn: string;
  email: string;
  mobile: string;
  identificationNumber: string;
  userType: string;
  agreementAccept: number;
  createdOn: string;
}

interface BrandWalletDto {
  deductionPrs: number | null;
}

interface FreelancerData {
  brandId: number;
  userDto: UserDto;
  brandWalletDto: BrandWalletDto;
}

const ServiceProviders: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeUsers, setActiveUsers] = useState<FreelancerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem("accessToken");

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
          console.error("Failed to fetch users:", data.messageEn);
        }
      } catch (error) {
        console.error("Error fetching active users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="py-10">
        <h1 className="text-3xl text-blue-900 font-bold">
          {t("navbar.serviceProviders")}
        </h1>
      </div>
      <div className="w-full flex justify-center min-w-96">
        <Tabs
          defaultValue="active"
          className="w-full max-w-6xl min-w-96 flex flex-col items-center"
        >
          <TabsList className="min-w-[400px] flex mb-5 text-blue-900">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {activeUsers.map((user) => (
                  <Card
                    key={user.brandId}
                    dir={i18n.language === "ar" ? "rtl" : "ltr"}
                    className="w-full border border-gray-200 shadow-sm rounded-lg"
                  >
                    <CardHeader className="flex items-center space-x-4  border-b border-solid border-stone-300">
                      <div className="w-12 h-12  rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                        <span className="w-full h-full text-5xl text-blue-900">
                          <FaUserCircle />
                        </span>
                      </div>

                      {/* User Details */}
                      <div className="py-1 text-center">
                        <CardTitle className="text-lg font-semibold text-blue-950">
                          {user.userDto.nameEn}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          {user.userDto.email}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent
                      className={`space-y-2 text-gray-700 flex flex-col mt-5 ${
                        i18n.language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      <dl className="space-y-2">
                        <div>
                          <dt className="font-semibold text-blue-900">
                            {t("mobile")}:
                          </dt>
                          <dd>{user.userDto.mobile}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-blue-900">
                            {t("id")}:
                          </dt>
                          <dd>{user.userDto.identificationNumber}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-blue-900">
                            {t("createdOn")}:
                          </dt>
                          <dd>{user.userDto.createdOn}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-blue-900">
                            {t("deductionPercentage")}:
                          </dt>
                          <dd>
                            {user.brandWalletDto.deductionPrs ?? t("n/a")}%
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                    <CardFooter className="flex justify-center gap-3">
                      <Button
                        variant="outline"
                        className="text-blue-600 border-blue-600 hover:bg-blue-100"
                      >
                        {t("edit")}
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-100"
                      >
                        {t("deactivate")}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="inactive"
            className="transition-all duration-300 p-5 min-h-[400px]"
          >
            <p>Inactive users will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ServiceProviders;
