
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, DollarSign, Loader } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Mock collection requests data
const collectionRequests = [
  {
    id: 'REQ-001',
    userId: 'USER-123',
    userName: 'Rahul Mehta',
    wasteType: 'Plastic',
    quantity: 2.5,
    location: '123 Green Park, Delhi',
    date: '2023-05-22',
    status: 'pending',
    distance: '1.2 km',
  },
  {
    id: 'REQ-002',
    userId: 'USER-456',
    userName: 'Ananya Sharma',
    wasteType: 'E-Waste',
    quantity: 1.8,
    location: '45 Lajpat Nagar, Delhi',
    date: '2023-05-22',
    status: 'pending',
    distance: '2.5 km',
  },
  {
    id: 'REQ-003',
    userId: 'USER-789',
    userName: 'Vikram Patel',
    wasteType: 'Paper',
    quantity: 3.0,
    location: '78 Rajouri Garden, Delhi',
    date: '2023-05-22',
    status: 'pending',
    distance: '3.7 km',
  },
];

// Mock in-progress collections
const inProgressCollections = [
  {
    id: 'REQ-004',
    userId: 'USER-234',
    userName: 'Sneha Gupta',
    wasteType: 'Metal',
    quantity: 1.5,
    location: '22 Model Town, Delhi',
    date: '2023-05-21',
    status: 'in-progress',
    otp: '4582',
  },
];

// Mock completed collections
const completedCollections = [
  {
    id: 'REQ-005',
    userId: 'USER-345',
    userName: 'Arjun Singh',
    wasteType: 'Glass',
    quantity: 2.2,
    location: '56 Dwarka, Delhi',
    date: '2023-05-20',
    status: 'completed',
    pointsEarned: 15,
  },
  {
    id: 'REQ-006',
    userId: 'USER-567',
    userName: 'Priya Reddy',
    wasteType: 'Plastic',
    quantity: 3.5,
    location: '89 Rohini, Delhi',
    date: '2023-05-19',
    status: 'completed',
    pointsEarned: 20,
  },
  {
    id: 'REQ-007',
    userId: 'USER-678',
    userName: 'Deepak Kumar',
    wasteType: 'E-Waste',
    quantity: 1.2,
    location: '34 Pitampura, Delhi',
    date: '2023-05-18',
    status: 'completed',
    pointsEarned: 25,
  },
];

// Mock earnings data
const earningsData = {
  currentMonth: 12500,
  bonus: 2500,
  collections: 45,
  rating: 4.8,
};

const StaffDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('pending');
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAcceptRequest = (request: any) => {
    toast({
      title: "Request accepted",
      description: `You've accepted the waste collection request from ${request.userName}.`,
    });
    // In a real app, this would update the database
  };
  
  const handleOtpVerification = (request: any) => {
    setSelectedRequest(request);
    setOtpDialogOpen(true);
  };
  
  const verifyOtp = async () => {
    if (otpValue !== selectedRequest?.otp) {
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "OTP verified!",
        description: "The waste has been successfully collected.",
      });
      
      setOtpDialogOpen(false);
      setOtpValue('');
      // In a real app, this would update the database
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Verification failed",
        description: "There was an error verifying the OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleSubmitWaste = (request: any) => {
    setSelectedRequest(request);
    setSubmitDialogOpen(true);
  };
  
  const submitWasteToCenter = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Waste submitted!",
        description: "The waste has been successfully submitted to the sorting center.",
      });
      
      setSubmitDialogOpen(false);
      // In a real app, this would update the database
    } catch (error) {
      console.error('Error submitting waste:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting the waste. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Staff Dashboard">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">₹{earningsData.currentMonth}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Including ₹{earningsData.bonus} bonus
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Collections This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Package className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">{earningsData.collections}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">{collectionRequests.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">{earningsData.rating}/5</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="pending" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex items-center">
            <Truck className="mr-2 h-4 w-4" />
            In Progress
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            Completed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Collection Requests</CardTitle>
              <CardDescription>
                Nearby waste collection requests that need your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {collectionRequests.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No pending collection requests at the moment.
                    </div>
                  ) : (
                    collectionRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg overflow-hidden">
                        <div className="p-4 border-b bg-muted/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{request.userName}</h4>
                              <p className="text-sm text-muted-foreground">{request.location}</p>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {request.distance} away
                                </Badge>
                                <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                                  {request.wasteType} • {request.quantity} kg
                                </Badge>
                              </div>
                            </div>
                            <Button 
                              className="eco-button" 
                              size="sm"
                              onClick={() => handleAcceptRequest(request)}
                            >
                              Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="in-progress">
          <Card>
            <CardHeader>
              <CardTitle>In-Progress Collections</CardTitle>
              <CardDescription>
                Waste collections that you have accepted and are in progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {inProgressCollections.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No in-progress collections at the moment.
                    </div>
                  ) : (
                    inProgressCollections.map((request) => (
                      <div key={request.id} className="border rounded-lg overflow-hidden">
                        <div className="p-4 border-b bg-muted/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{request.userName}</h4>
                              <p className="text-sm text-muted-foreground">{request.location}</p>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  {request.wasteType} • {request.quantity} kg
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                            onClick={() => handleOtpVerification(request)}
                          >
                            Verify OTP
                          </Button>
                          <Button 
                            className="eco-button flex-1" 
                            size="sm"
                            onClick={() => handleSubmitWaste(request)}
                          >
                            Submit to Center
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Collections</CardTitle>
              <CardDescription>
                Your successfully completed waste collections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {completedCollections.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No completed collections yet.
                    </div>
                  ) : (
                    completedCollections.map((request) => (
                      <div key={request.id} className="border rounded-lg overflow-hidden">
                        <div className="p-4 border-b bg-muted/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{request.userName}</h4>
                              <p className="text-sm text-muted-foreground">{request.location}</p>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {request.wasteType} • {request.quantity} kg
                                </Badge>
                                <Badge variant="outline" className="ml-2 bg-eco-50 text-eco-700 border-eco-200">
                                  +{request.pointsEarned} points
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{request.date}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* OTP Verification Dialog */}
      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Collection OTP</DialogTitle>
            <DialogDescription>
              Ask the user for the OTP to verify the waste collection
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">Enter OTP</label>
              <Input
                id="otp"
                placeholder="4-digit OTP"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                className="text-center text-xl tracking-widest"
                maxLength={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOtpDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="eco-button" 
              onClick={verifyOtp}
              disabled={isVerifying || otpValue.length !== 4}
            >
              {isVerifying ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Submit Waste Dialog */}
      <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Waste to Sorting Center</DialogTitle>
            <DialogDescription>
              Confirm that you are submitting the collected waste to the sorting center
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">Collection Details</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <p className="text-muted-foreground">User:</p>
                <p>{selectedRequest?.userName}</p>
                <p className="text-muted-foreground">Waste Type:</p>
                <p>{selectedRequest?.wasteType}</p>
                <p className="text-muted-foreground">Quantity:</p>
                <p>{selectedRequest?.quantity} kg</p>
                <p className="text-muted-foreground">Collection ID:</p>
                <p>{selectedRequest?.id}</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubmitDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="eco-button" 
              onClick={submitWasteToCenter}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Confirm Submission'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default StaffDashboard;
