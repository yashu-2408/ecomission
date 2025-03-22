import React, { useEffect, useState } from 'react';
import { History, Package, CheckCircle, AlertCircle, Clock, Truck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface WasteSubmission {
  id: string;
  waste_type: string;
  quantity: number;
  points: number;
  created_at: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  assigned_staff_id: string | null;
  staff_name?: string;
  staff_id?: string;
}

const WasteHistory: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [wasteHistory, setWasteHistory] = useState<WasteSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWasteHistory();
    }
  }, [user]);

  const fetchWasteHistory = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('waste_submissions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      // For now, we don't have staff profiles linked, so we'll keep the mock staff data
      const formattedData = data.map(item => ({
        ...item,
        staff_name: item.assigned_staff_id ? 'Assigned Staff' : null,
        staff_id: item.assigned_staff_id
      }));

      setWasteHistory(formattedData);
    } catch (error) {
      console.error('Error fetching waste history:', error);
      toast({
        title: "Failed to load waste history",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-eco-600"></div>
          </div>
        ) : wasteHistory.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No waste submissions yet.</p>
            <p className="text-sm mt-2">Submit your first waste collection request to see it here.</p>
          </div>
        ) : (
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
                        <p className="font-medium">{item.waste_type}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(item.created_at)}</p>
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
                      
                      {item.staff_name && (
                        <p className="text-xs mt-2 text-muted-foreground">
                          Collection Agent: {item.staff_name}
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
        )}
      </CardContent>
    </Card>
  );
};

export default WasteHistory;
