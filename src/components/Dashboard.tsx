import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Gauge, 
  Plus,
  Clock,
  Wrench
} from "lucide-react";

const Dashboard = () => {
  // Mock data - will be replaced with real data from backend
  const vehicleInfo = {
    make: "Toyota",
    model: "Camry",
    year: 2020,
    currentMileage: 45280,
    lastService: "2024-01-15",
    nextService: "2024-04-15"
  };

  const upcomingServices = [
    { type: "Oil Change", dueAt: 50000, priority: "high" },
    { type: "Tire Rotation", dueAt: 55000, priority: "medium" },
    { type: "Brake Inspection", dueAt: 65000, priority: "low" }
  ];

  const recentServices = [
    { type: "Oil Change", date: "2024-01-15", mileage: 42500, cost: 45 },
    { type: "Tire Rotation", date: "2023-11-20", mileage: 40000, cost: 25 },
    { type: "Brake Pads", date: "2023-09-10", mileage: 38500, cost: 120 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Vehicle Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              Vehicle Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
                  </h3>
                  <p className="text-muted-foreground">Your primary vehicle</p>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Up to Date
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Gauge className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Mileage</p>
                    <p className="text-lg font-semibold">{vehicleInfo.currentMileage.toLocaleString()} mi</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="w-8 h-8 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Service</p>
                    <p className="text-lg font-semibold">{vehicleInfo.lastService}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Services Due Soon</div>
            </div>
            
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">$190</div>
              <div className="text-sm text-muted-foreground">Spent This Year</div>
            </div>
            
            <Button className="w-full" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Service Record
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            Upcoming Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingServices.map((service, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{service.type}</h4>
                  <Badge variant={getPriorityColor(service.priority) as any}>
                    {service.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Due at {service.dueAt.toLocaleString()} miles
                </p>
                <p className="text-sm text-accent font-medium">
                  {service.dueAt - vehicleInfo.currentMileage} miles remaining
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-success" />
            Recent Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{service.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {service.date} • {service.mileage.toLocaleString()} miles
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${service.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;