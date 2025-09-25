import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, FileText, Calendar, DollarSign, Gauge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ServiceRecords = () => {
  const { toast } = useToast();
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [newService, setNewService] = useState({
    type: "",
    date: "",
    mileage: "",
    cost: "",
    notes: "",
    provider: ""
  });

  // Mock service records - will be replaced with real data
  const services = [
    {
      id: 1,
      type: "Oil Change",
      date: "2024-01-15",
      mileage: 42500,
      cost: 45,
      provider: "Quick Lube Plus",
      notes: "Full synthetic oil, new filter",
      status: "completed"
    },
    {
      id: 2,
      type: "Tire Rotation",
      date: "2023-11-20", 
      mileage: 40000,
      cost: 25,
      provider: "Tire World",
      notes: "All tires rotated, pressure checked",
      status: "completed"
    },
    {
      id: 3,
      type: "Brake Inspection",
      date: "2023-09-10",
      mileage: 38500,
      cost: 0,
      provider: "Main Street Auto",
      notes: "Brake pads at 60%, rotors good",
      status: "completed"
    },
    {
      id: 4,
      type: "Brake Pads Replacement",
      date: "2023-09-10",
      mileage: 38500,
      cost: 120,
      provider: "Main Street Auto",
      notes: "Front brake pads replaced",
      status: "completed"
    }
  ];

  const serviceTypes = [
    "Oil Change",
    "Tire Rotation",
    "Brake Inspection",
    "Brake Pads Replacement",
    "Air Filter Replacement",
    "Transmission Service",
    "Coolant Flush",
    "Battery Replacement",
    "Other"
  ];

  const handleAddService = () => {
    // Validation
    if (!newService.type || !newService.date || !newService.mileage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally save to backend
    toast({
      title: "Service Record Added",
      description: `${newService.type} record has been saved successfully`,
    });

    // Reset form
    setNewService({
      type: "",
      date: "",
      mileage: "",
      cost: "",
      notes: "",
      provider: ""
    });
    setIsAddServiceOpen(false);
  };

  const getServiceTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      "Oil Change": "bg-primary/10 text-primary",
      "Tire Rotation": "bg-accent/10 text-accent",
      "Brake Inspection": "bg-warning/10 text-warning",
      "Brake Pads Replacement": "bg-destructive/10 text-destructive",
      "Air Filter Replacement": "bg-success/10 text-success",
      "default": "bg-muted/10 text-muted-foreground"
    };
    return colorMap[type] || colorMap.default;
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Service Records</h2>
          <p className="text-muted-foreground">Track and manage your vehicle maintenance history</p>
        </div>
        
        <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Service Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Service Record</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service-type">Service Type *</Label>
                <Select value={newService.type} onValueChange={(value) => setNewService({...newService, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-date">Date *</Label>
                  <Input
                    id="service-date"
                    type="date"
                    value={newService.date}
                    onChange={(e) => setNewService({...newService, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-mileage">Mileage *</Label>
                  <Input
                    id="service-mileage"
                    type="number"
                    placeholder="42500"
                    value={newService.mileage}
                    onChange={(e) => setNewService({...newService, mileage: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-cost">Cost ($)</Label>
                  <Input
                    id="service-cost"
                    type="number"
                    step="0.01"
                    placeholder="45.00"
                    value={newService.cost}
                    onChange={(e) => setNewService({...newService, cost: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-provider">Service Provider</Label>
                  <Input
                    id="service-provider"
                    placeholder="Quick Lube Plus"
                    value={newService.provider}
                    onChange={(e) => setNewService({...newService, provider: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-notes">Notes</Label>
                <Textarea
                  id="service-notes"
                  placeholder="Additional details about the service..."
                  value={newService.notes}
                  onChange={(e) => setNewService({...newService, notes: e.target.value})}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddService} className="flex-1">
                  Add Service Record
                </Button>
                <Button variant="outline" onClick={() => setIsAddServiceOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Service Records List */}
      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{service.type}</h3>
                    <p className="text-sm text-muted-foreground">{service.provider}</p>
                  </div>
                </div>
                <Badge className={getServiceTypeColor(service.type)}>
                  {service.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{service.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{service.mileage.toLocaleString()} mi</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">${service.cost}</span>
                </div>
              </div>
              
              {service.notes && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{service.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceRecords;