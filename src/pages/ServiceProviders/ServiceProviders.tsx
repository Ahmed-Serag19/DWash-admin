import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

const ServiceProviders = () => {
  const { t } = useTranslation();
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
          {/* Tabs List */}
          <TabsList className="min-w-[400px] flex mb-5 text-blue-900">
            <TabsTrigger value="active" className="w-1/2">
              Active
            </TabsTrigger>
            <TabsTrigger value="inactive" className="w-1/2">
              Inactive
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <div className="w-full">
            <TabsContent
              value="active"
              className="transition-all duration-300 p-5    min-h-[400px]"
            >
              <p>
                Make changes to your account here. Make changes to your account
                here. Make changes to your account here.
              </p>
            </TabsContent>
            <TabsContent
              value="inactive"
              className="transition-all duration-300 p-5     min-h-[400px]"
            >
              <p>Change your password here.</p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
};

export default ServiceProviders;
