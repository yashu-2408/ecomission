
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BarChart3, Settings, ShieldCheck, Upload, Award } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout title="Admin Dashboard">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-eco-50 border border-eco-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="waste">Waste Management</TabsTrigger>
          <TabsTrigger value="approvals">Content Approvals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-eco-800 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-eco-600" />
                  Total Users
                </CardTitle>
                <CardDescription>Active platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-eco-600">1,245</p>
                <p className="text-sm text-gray-500">+8% this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-eco-800 flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5 text-eco-600" />
                  Staff Members
                </CardTitle>
                <CardDescription>Active collection agents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-eco-600">42</p>
                <p className="text-sm text-gray-500">3 pending applications</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-eco-800 flex items-center">
                  <Upload className="mr-2 h-5 w-5 text-eco-600" />
                  Total Waste
                </CardTitle>
                <CardDescription>Collected this month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-eco-600">2.4t</p>
                <p className="text-sm text-gray-500">Across all categories</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-eco-800 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-eco-600" />
                  Eco-Points
                </CardTitle>
                <CardDescription>Total awarded</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-eco-600">45.2k</p>
                <p className="text-sm text-gray-500">₹22.6k cashback value</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-eco-800">Waste Collection Trends</CardTitle>
                <CardDescription>Monthly collection by category</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Charts and analytics coming soon...</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-eco-800">User Activity</CardTitle>
                <CardDescription>Platform engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">User activity data coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">User & Staff Management</CardTitle>
              <CardDescription>Manage accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Approve staff applications and monitor user activities.</p>
              <p className="text-center py-8 text-muted-foreground">User management feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="waste">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Waste Collection Oversight</CardTitle>
              <CardDescription>Monitor waste collection and processing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Track real-time waste collection and verification.</p>
              <p className="text-center py-8 text-muted-foreground">Waste management feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Content Approvals</CardTitle>
              <CardDescription>Review and approve user-generated content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Manage reels and cleanliness drive submissions.</p>
              <p className="text-center py-8 text-muted-foreground">Content approval feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">System Analytics</CardTitle>
              <CardDescription>Detailed platform metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Generate insights on waste collection, user participation, and reward distribution.</p>
              <p className="text-center py-8 text-muted-foreground">Analytics feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">System Settings</CardTitle>
              <CardDescription>Configure platform parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Adjust eco-point calculations and other system settings.</p>
              <p className="text-center py-8 text-muted-foreground">System settings feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminDashboard;
