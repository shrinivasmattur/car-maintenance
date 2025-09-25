import { Car, Settings, MessageCircle, FileText, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavHeader = ({ activeTab, onTabChange }: NavHeaderProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "services", label: "Service Records", icon: FileText },
    { id: "chatbot", label: "Maintenance Bot", icon: MessageCircle },
  ];

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CarCare Pro</h1>
              <p className="text-sm text-muted-foreground">Maintenance Tracking</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
            
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavHeader;