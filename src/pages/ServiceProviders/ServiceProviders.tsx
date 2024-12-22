import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServiceProviders = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl text-blue-950 font-bold">Service Providers</h1>
      </div>
      <div>
        <Tabs
          defaultValue="account"
          className="w-full flex justify-center items-center flex-col"
        >
          <TabsList>
            <TabsTrigger value="account">Active</TabsTrigger>
            <TabsTrigger value="password">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ServiceProviders;
