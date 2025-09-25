import { useState } from "react";
import NavHeader from "@/components/NavHeader";
import Dashboard from "@/components/Dashboard";
import ServiceRecords from "@/components/ServiceRecords";
import MaintenanceBot from "@/components/MaintenanceBot";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "services":
        return <ServiceRecords />;
      case "chatbot":
        return <MaintenanceBot />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pb-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
