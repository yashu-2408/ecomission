
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Truck, ClipboardCheck, Wallet, Users, BarChart } from 'lucide-react';

const StaffDashboard: React.FC = () => {
  return (
    <DashboardLayout title="Staff Dashboard">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-eco-50 border border-eco-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="collections">Waste Collections</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-eco-800 flex items-center">
                  <Package className="mr-2 h-5 w-5 text-eco-600" />
                  Pending Pickups
                </CardTitle>
                <CardDescription>Waste collection requests</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-eco-600">3</p>
                <p className="text-sm text-gray-500">Within your service area</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-eco-800 flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-eco-600" />
                  Completed Today
                </CardTitle>
                <CardDescription>Successful collections</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-eco-600">5</p>
                <p className="text-sm text-gray-500">17.5 kg total collected</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-eco-800 flex items-center">
                  <Wallet className="mr-2 h-5 w-5 text-eco-600" />
                  Today's Earnings
                </CardTitle>
                <CardDescription>Collection incentives</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-eco-600">₹250</p>
                <p className="text-sm text-gray-500">+₹50 bonus for efficiency</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Recent Collections</CardTitle>
              <CardDescription>Your latest waste pickup activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg bg-eco-50">
                  <ClipboardCheck className="h-6 w-6 text-eco-600 mt-1" />
                  <div>
                    <p className="font-medium text-eco-800">E-waste collection completed</p>
                    <p className="text-sm text-gray-500">3.5kg - 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-eco-50">
                  <ClipboardCheck className="h-6 w-6 text-eco-600 mt-1" />
                  <div>
                    <p className="font-medium text-eco-800">Plastic waste collection completed</p>
                    <p className="text-sm text-gray-500">5.2kg - 4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-eco-50">
                  <ClipboardCheck className="h-6 w-6 text-eco-600 mt-1" />
                  <div>
                    <p className="font-medium text-eco-800">Paper waste collection completed</p>
                    <p className="text-sm text-gray-500">8.8kg - 6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="collections">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Waste Collections</CardTitle>
              <CardDescription>Manage your pickup schedule and tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">View assigned pickup requests and manage collections.</p>
              <p className="text-center py-8 text-muted-foreground">Waste collections management feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Waste Verification</CardTitle>
              <CardDescription>Verify and sort collected waste</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Confirm waste categories and submit at sorting centers.</p>
              <p className="text-center py-8 text-muted-foreground">Waste verification feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Earnings & Salary</CardTitle>
              <CardDescription>Track your income and performance bonuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-eco-50 p-6 rounded-lg mb-6">
                <p className="text-lg font-medium text-eco-800 mb-2">Monthly Earnings</p>
                <p className="text-4xl font-bold text-eco-600 mb-4">₹12,500</p>
                <p className="text-sm text-gray-500">Base salary + collection incentives</p>
              </div>
              <p className="text-center py-4 text-muted-foreground">Detailed earnings breakdown coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default StaffDashboard;
