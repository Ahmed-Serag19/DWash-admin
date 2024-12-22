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
  const { t } = useTranslation();
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
        console.log("Access Token:", sessionStorage.getItem("accessToken"));

        const response = await axios.get(
          "http://164.90.156.55:9090/api/admin/getFreelancers?page=0&size=15&type=0",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Axios automatically parses JSON
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
              <p>Loading active users...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeUsers.map((user) => (
                  <Card key={user.brandId} className="w-full">
                    <CardHeader>
                      <CardTitle>{user.userDto.nameEn}</CardTitle>
                      <CardDescription>{user.userDto.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <strong>Mobile:</strong> {user.userDto.mobile}
                      </p>
                      <p>
                        <strong>ID:</strong> {user.userDto.identificationNumber}
                      </p>
                      <p>
                        <strong>Type:</strong> {user.userDto.userType}
                      </p>
                      <p>
                        <strong>Agreement Accepted:</strong>{" "}
                        {user.userDto.agreementAccept ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Created On:</strong> {user.userDto.createdOn}
                      </p>
                      <p>
                        <strong>Deduction Percentage:</strong>{" "}
                        {user.brandWalletDto.deductionPrs ?? "N/A"}%
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">View Details</Button>
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
