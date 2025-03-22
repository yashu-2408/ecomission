
import React from 'react';
import { History, Package, CheckCircle, AlertCircle, Clock, Truck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock waste collection data
const wasteHistory = [
  {
    id: 1,
    wasteType: 'E-Waste',
    quantity: 2.5,
    points: 75,
    date: '2023-05-12',
    status: 'completed',
    staffName: 'Amit Kumar',
    staffId: 'STAFF-001',
  },
  {
    id: 2,
    wasteType: 'Plastic',
    quantity: 3,
    points: 45,
    date: '2023-05-08',
    status: 'completed',
    staffName: 'Priya Singh',
    staffId: 'STAFF-003',
  },
  {
    id: 3,
    wasteType: 'Paper',
    quantity: 4,
    points: 40,
    date: '2023-05-05',
    status: 'completed',
    staffName: 'Raj Sharma',
    staffId: 'STAFF-002',
  },
  {
    id: 4,
    wasteType: 'Metal',
    quantity: 1.5,
    points: 35,
    date: '2023-05-20',
    status: 'in-progress',
    staffName: 'Priya Singh',
    staffId: 'STAFF-003',
  },
  {
    id: 5,
    wasteType: 'Glass',
    quantity: 2,
    points: 16,
    date: '2023-05-22',
    status: 'pending',
    staffName: null,
    staffId: null,
  },
];

const WasteHistory: React.FC = () => {
  // Function to render status badge with appropriate color and icon
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center">
            <Truck className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="mr-2 h-5 w-5" />
          Waste Collection History
        </CardTitle>
        <CardDescription>
          Track your waste submissions and collections
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {wasteHistory.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden"
              >
                <div className="flex justify-between items-center p-4 border-b bg-muted/50">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-eco-600" />
                    <div>
                      <p className="font-medium">{item.wasteType}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+{item.points} points</p>
                    <p className="text-xs">{item.quantity} kg</p>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div>
                    {renderStatusBadge(item.status)}
                    
                    {item.staffName && (
                      <p className="text-xs mt-2 text-muted-foreground">
                        Collection Agent: {item.staffName}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-eco-700 hover:text-eco-800 hover:bg-eco-50"
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Import Button
import { Button } from '@/components/ui/button';

export default WasteHistory;
