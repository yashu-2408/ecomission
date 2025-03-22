
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Leaf, Award, Car, Wind, Wallet } from 'lucide-react';

const UserDashboard: React.FC = () => {
  return (
    <DashboardLayout title="User Dashboard">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-eco-50 border border-eco-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="waste">Waste Collection</TabsTrigger>
          <TabsTrigger value="reels">Eco Reels</TabsTrigger>
          <TabsTrigger value="events">Cleanliness Drives</TabsTrigger>
          <TabsTrigger value="transport">Sustainable Transport</TabsTrigger>
          <TabsTrigger value="wallet">Eco Wallet</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-eco-800 flex items-center">
                  <Leaf className="mr-2 h-5 w-5 text-eco-600" />
                  Eco Points
                </CardTitle>
                <CardDescription>Your sustainability rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-eco-600">250</p>
                <p className="text-sm text-gray-500">+15 points this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-eco-800 flex items-center">
                  <Upload className="mr-2 h-5 w-5 text-eco-600" />
                  Waste Submitted
                </CardTitle>
                <CardDescription>Total recyclables processed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-eco-600">12 kg</p>
                <p className="text-sm text-gray-500">Across 5 categories</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-eco-800 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-eco-600" />
                  Achievements
                </CardTitle>
                <CardDescription>Eco milestones reached</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-eco-600">3</p>
                <p className="text-sm text-gray-500">Recycling Novice badge earned</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Recent Activity</CardTitle>
              <CardDescription>Your latest sustainability actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg bg-eco-50">
                  <Upload className="h-6 w-6 text-eco-600 mt-1" />
                  <div>
                    <p className="font-medium text-eco-800">Plastic waste submitted</p>
                    <p className="text-sm text-gray-500">2.5kg of plastic bottles - Yesterday</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-eco-50">
                  <Car className="h-6 w-6 text-eco-600 mt-1" />
                  <div>
                    <p className="font-medium text-eco-800">Sustainable commute logged</p>
                    <p className="text-sm text-gray-500">Public transport used - 3 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-eco-50">
                  <Wind className="h-6 w-6 text-eco-600 mt-1" />
                  <div>
                    <p className="font-medium text-eco-800">Air quality check</p>
                    <p className="text-sm text-gray-500">AQI: Good (45) - 4 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="waste">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Waste Collection</CardTitle>
              <CardDescription>Submit and track your recyclable waste</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">This feature will allow you to upload images of your waste for categorization and collection.</p>
              <p className="text-center py-8 text-muted-foreground">Waste collection feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reels">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Eco Reels</CardTitle>
              <CardDescription>Share environmental awareness videos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Upload short environmental videos to earn eco-points.</p>
              <p className="text-center py-8 text-muted-foreground">Eco Reels feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Cleanliness Drives</CardTitle>
              <CardDescription>Organize or participate in cleanup events</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Upload before and after images of cleaned areas to earn eco-points.</p>
              <p className="text-center py-8 text-muted-foreground">Cleanliness Drives feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transport">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800">Sustainable Transport</CardTitle>
              <CardDescription>Log your eco-friendly commutes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Upload proof of public transport usage to earn eco-points.</p>
              <p className="text-center py-8 text-muted-foreground">Sustainable Transport feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wallet">
          <Card>
            <CardHeader>
              <CardTitle className="text-eco-800 flex items-center">
                <Wallet className="mr-2 h-5 w-5 text-eco-600" />
                Eco Wallet
              </CardTitle>
              <CardDescription>Manage your eco-points and rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-eco-50 p-6 rounded-lg mb-6">
                <p className="text-lg font-medium text-eco-800 mb-2">Available Balance</p>
                <p className="text-4xl font-bold text-eco-600 mb-4">250 points</p>
                <p className="text-sm text-gray-500">≈ ₹125 cashback available</p>
              </div>
              <p className="text-center py-4 text-muted-foreground">Cashback redemption feature coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UserDashboard;
