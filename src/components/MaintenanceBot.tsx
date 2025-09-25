import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Wrench
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "reminder" | "question" | "response";
}

const MaintenanceBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your maintenance assistant. I can help you track service schedules and remind you about upcoming maintenance. Try asking me 'What's my next service?'",
      sender: "bot",
      timestamp: new Date(),
      type: "response"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Mock vehicle data - will be replaced with real data
  const vehicleData = {
    currentMileage: 45280,
    lastServices: {
      "Oil Change": { mileage: 42500, date: "2024-01-15" },
      "Tire Rotation": { mileage: 40000, date: "2023-11-20" },
      "Brake Inspection": { mileage: 38500, date: "2023-09-10" }
    },
    serviceIntervals: {
      "Oil Change": 5000,
      "Tire Rotation": 10000,
      "Brake Inspection": 20000,
      "Air Filter": 15000,
      "Transmission Service": 30000
    }
  };

  const quickActions = [
    { label: "What's my next service?", icon: Clock },
    { label: "Show overdue services", icon: AlertTriangle },
    { label: "When was my last oil change?", icon: Wrench },
    { label: "Service history summary", icon: CheckCircle }
  ];

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("next service") || message.includes("upcoming")) {
      // Calculate next services
      const nextServices = Object.entries(vehicleData.serviceIntervals)
        .map(([service, interval]) => {
          const lastService = vehicleData.lastServices[service as keyof typeof vehicleData.lastServices];
          const lastMileage = lastService?.mileage || 0;
          const nextDue = lastMileage + interval;
          const milesUntilDue = nextDue - vehicleData.currentMileage;
          
          return {
            service,
            nextDue,
            milesUntilDue,
            isOverdue: milesUntilDue < 0
          };
        })
        .sort((a, b) => a.milesUntilDue - b.milesUntilDue);

      const nextService = nextServices[0];
      if (nextService.isOverdue) {
        return `⚠️ Your ${nextService.service} is overdue! It was due at ${nextService.nextDue.toLocaleString()} miles. You're currently ${Math.abs(nextService.milesUntilDue)} miles past due.`;
      } else {
        return `🔧 Your next service is ${nextService.service}, due at ${nextService.nextDue.toLocaleString()} miles. You have ${nextService.milesUntilDue} miles remaining.`;
      }
    }
    
    if (message.includes("overdue")) {
      const overdueServices = Object.entries(vehicleData.serviceIntervals)
        .map(([service, interval]) => {
          const lastService = vehicleData.lastServices[service as keyof typeof vehicleData.lastServices];
          const lastMileage = lastService?.mileage || 0;
          const nextDue = lastMileage + interval;
          const milesOverdue = vehicleData.currentMileage - nextDue;
          
          return {
            service,
            milesOverdue,
            isOverdue: milesOverdue > 0
          };
        })
        .filter(item => item.isOverdue);

      if (overdueServices.length === 0) {
        return "🎉 Great news! You don't have any overdue services. Keep up the good maintenance!";
      } else {
        const overdueList = overdueServices
          .map(item => `• ${item.service} (${item.milesOverdue} miles overdue)`)
          .join('\n');
        return `⚠️ You have ${overdueServices.length} overdue service(s):\n${overdueList}\n\nI recommend scheduling these services soon to keep your vehicle running smoothly.`;
      }
    }
    
    if (message.includes("oil change") && message.includes("last")) {
      const lastOilChange = vehicleData.lastServices["Oil Change"];
      return `🛢️ Your last oil change was on ${lastOilChange.date} at ${lastOilChange.mileage.toLocaleString()} miles. That was ${vehicleData.currentMileage - lastOilChange.mileage} miles ago.`;
    }
    
    if (message.includes("history") || message.includes("summary")) {
      const serviceCount = Object.keys(vehicleData.lastServices).length;
      const recentServices = Object.entries(vehicleData.lastServices)
        .map(([service, data]) => `• ${service}: ${data.date}`)
        .join('\n');
      return `📋 Service History Summary:\nYou have ${serviceCount} recorded services:\n${recentServices}\n\nCurrent mileage: ${vehicleData.currentMileage.toLocaleString()} miles`;
    }
    
    // Default responses
    const defaultResponses = [
      "I can help you with maintenance reminders and service history. Try asking about your next service or overdue items!",
      "I'm here to help track your vehicle maintenance. You can ask me about service schedules, history, or upcoming reminders.",
      "Feel free to ask me about your vehicle's maintenance needs. I can tell you about upcoming services, overdue items, or your service history."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "question"
    };

    const botResponse: Message = {
      id: messages.length + 2,
      content: generateBotResponse(inputMessage),
      sender: "bot",
      timestamp: new Date(),
      type: "response"
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputMessage("");
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary" />
          Maintenance Bot
        </h2>
        <p className="text-muted-foreground">Your AI assistant for vehicle maintenance reminders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleQuickAction(action.label)}
                >
                  <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Chat with Maintenance Bot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <ScrollArea className="h-96 w-full border border-border rounded-lg p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg whitespace-pre-line ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask me about your vehicle maintenance..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceBot;