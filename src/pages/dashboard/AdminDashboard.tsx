
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, BarChart, Users, UserCheck, Video, 
  FileCheck, Settings, Filter, Download, Loader
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart as RechartsRadialChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { wasteCategories } from '@/lib/wasteUtils';

// Mock data for the admin dashboard
const adminStats = {
  totalUsers: 1245,
  totalStaff: 48,
  totalWaste: 3560,
  pendingApprovals: 12,
};

// Mock data for waste collection by type
const wasteCollectionData = wasteCategories.map(category => ({
  name: category.name,
  value: Math.floor(Math.random() * 500) + 100, // Random value between 100 and 600
  color: category.id === 'e-waste' ? '#3B82F6' :
         category.id === 'metal' ? '#10B981' :
         category.id === 'plastic' ? '#F59E0B' :
         category.id === 'paper' ? '#6366F1' :
         category.id === 'glass' ? '#EC4899' :
         '#8B5CF6', // organic
}));

// Mock data for pending approvals
const pendingReels = [
  { id: 1, userId: 'USER-123', username: 'Rahul Mehta', title: 'Beach Cleanup Drive', date: '2023-05-22' },
  { id: 2, userId: 'USER-456', username: 'Ananya Sharma', title: 'Tree Planting Initiative', date: '2023-05-21' },
  { id: 3, userId: 'USER-789', username: 'Vikram Patel', title: 'Recycling Workshop', date: '2023-05-20' },
];

const pendingDrives = [
  { id: 1, userId: 'USER-234', username: 'Sneha Gupta', location: 'Juhu Beach, Mumbai', date: '2023-05-22' },
  { id: 2, userId: 'USER-567', username: 'Deepak Kumar', location: 'Lodhi Gardens, Delhi', date: '2023-05-21' },
];

// Mock data for staff performance
const staffPerformance = [
  { id: 'STAFF-001', name: 'Amit Kumar', collections: 120, rating: 4.8, efficiency: 95 },
  { id: 'STAFF-002', name: 'Raj Sharma', collections: 98, rating: 4.7, efficiency: 92 },
  { id: 'STAFF-003', name: 'Priya Singh', collections: 145, rating: 4.9, efficiency: 97 },
  { id: 'STAFF-004', name: 'Sanjay Patel', collections: 87, rating: 4.5, efficiency: 88 },
  { id: 'STAFF-005', name: 'Neha Gupta', collections: 134, rating: 4.6, efficiency: 90 },
];

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);
  
  const handleApproveReel = (id: number) => {
    toast({
      title: "Reel approved",
      description: "The eco reel has been approved and points awarded to the user.",
    });
    // In a real app, this would update the database
  };
  
  const handleRejectReel = (id: number) => {
    toast({
      title: "Reel rejected",
      description: "The eco reel has been rejected.",
    });
    // In a real app, this would update the database
  };
  
  const handleApproveDrive = (id: number) => {
    toast({
      title: "Drive approved",
      description: "The cleanliness drive has been approved and points awarded to the user.",
    });
    // In a real app, this would update the database
  };
  
  const handleRejectDrive = (id: number) => {
    toast({
      title: "Drive rejected",
      description: "The cleanliness drive has been rejected.",
    });
    // In a real app, this would update the database
  };
  
  const handleExportReport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Report exported",
        description: "The waste collection report has been exported successfully.",
      });
    } catch (error) {
      console.error('Error exporting report:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCheck className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">{adminStats.totalStaff}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Waste (kg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <PieChart className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">{adminStats.totalWaste}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileCheck className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">{adminStats.pendingApprovals}</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="approvals" className="flex items-center">
            <FileCheck className="mr-2 h-4 w-4" />
            Approvals
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex items-center">
            <UserCheck className="mr-2 h-4 w-4" />
            Staff
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Waste Collection Analytics</CardTitle>
                    <CardDescription>
                      Overview of waste collection by category
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="month">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleExportReport}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* This would be a proper bar or line chart in a real implementation */}
                  <div className="space-y-4">
                    {wasteCategories.map((category) => (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm font-medium">
                            {Math.floor(Math.random() * 500) + 100} kg
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full bg-eco-600" 
                            style={{ width: `${Math.floor(Math.random() * 90) + 10}%` }} 
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Waste Distribution</CardTitle>
                <CardDescription>
                  Percentage by waste category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsRadialChart>
                      <Pie
                        data={wasteCollectionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {wasteCollectionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsRadialChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="approvals">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  Pending Eco Reels
                </CardTitle>
                <CardDescription>
                  Review and approve user-submitted environmental videos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {pendingReels.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No pending reels to approve.
                      </div>
                    ) : (
                      pendingReels.map((reel) => (
                        <div key={reel.id} className="border rounded-lg overflow-hidden">
                          <div className="p-4 border-b bg-muted/50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{reel.title}</h4>
                                <p className="text-sm text-muted-foreground">By {reel.username}</p>
                                <p className="text-xs text-muted-foreground mt-1">{reel.date}</p>
                              </div>
                              <Badge>Reel</Badge>
                            </div>
                          </div>
                          <div className="p-4 flex flex-wrap gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                              onClick={() => handleRejectReel(reel.id)}
                            >
                              Reject
                            </Button>
                            <Button 
                              className="flex-1 bg-green-600 hover:bg-green-700" 
                              size="sm"
                              onClick={() => handleApproveReel(reel.id)}
                            >
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Pending Cleanliness Drives
                </CardTitle>
                <CardDescription>
                  Review and approve user-submitted cleanliness drives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {pendingDrives.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No pending cleanliness drives to approve.
                      </div>
                    ) : (
                      pendingDrives.map((drive) => (
                        <div key={drive.id} className="border rounded-lg overflow-hidden">
                          <div className="p-4 border-b bg-muted/50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{drive.location}</h4>
                                <p className="text-sm text-muted-foreground">By {drive.username}</p>
                                <p className="text-xs text-muted-foreground mt-1">{drive.date}</p>
                              </div>
                              <Badge>Drive</Badge>
                            </div>
                          </div>
                          <div className="p-4 flex flex-wrap gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                              onClick={() => handleRejectDrive(drive.id)}
                            >
                              Reject
                            </Button>
                            <Button 
                              className="flex-1 bg-green-600 hover:bg-green-700" 
                              size="sm"
                              onClick={() => handleApproveDrive(drive.id)}
                            >
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Staff Performance</CardTitle>
                  <CardDescription>
                    Monitor staff activity and efficiency
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Search staff..." 
                    className="w-[200px]"
                  />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-3 font-medium text-sm">
                  <div>Staff ID</div>
                  <div>Name</div>
                  <div>Collections</div>
                  <div>Efficiency</div>
                  <div>Actions</div>
                </div>
                <ScrollArea className="h-[350px]">
                  {staffPerformance.map((staff, index) => (
                    <div 
                      key={staff.id} 
                      className={`grid grid-cols-5 p-3 items-center text-sm ${
                        index % 2 === 0 ? "bg-white" : "bg-muted/20"
                      }`}
                    >
                      <div>{staff.id}</div>
                      <div>{staff.name}</div>
                      <div>{staff.collections}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                staff.efficiency >= 95 ? "bg-green-500" :
                                staff.efficiency >= 90 ? "bg-blue-500" :
                                "bg-amber-500"
                              }`}
                              style={{ width: `${staff.efficiency}%` }} 
                            ></div>
                          </div>
                          <span>{staff.efficiency}%</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure eco-point calculations and system parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Eco-Point Calculation</h3>
                  <div className="space-y-4">
                    {wasteCategories.map((category) => (
                      <div key={category.id} className="grid grid-cols-2 gap-4 items-center">
                        <label htmlFor={`points-${category.id}`} className="font-medium">
                          {category.name} (points per kg)
                        </label>
                        <Input
                          id={`points-${category.id}`}
                          type="number"
                          defaultValue={category.points}
                          min="1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Reward Settings</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="conversion-rate" className="font-medium">
                        Point to Cash Conversion Rate (₹)
                      </label>
                      <Input
                        id="conversion-rate"
                        type="number"
                        defaultValue="0.5"
                        step="0.1"
                        min="0.1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="min-withdrawal" className="font-medium">
                        Minimum Withdrawal Amount (₹)
                      </label>
                      <Input
                        id="min-withdrawal"
                        type="number"
                        defaultValue="50"
                        min="10"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="cleanliness-bonus" className="font-medium">
                        Cleanliness Drive Bonus Points
                      </label>
                      <Input
                        id="cleanliness-bonus"
                        type="number"
                        defaultValue="100"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
                
                <Button className="eco-button w-full">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminDashboard;
