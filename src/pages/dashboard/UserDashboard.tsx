
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Leaf, Upload, Camera, MapPin, TrendingUp, History, Wallet, Award, Video, Car, Wind
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import WasteSubmissionForm from '@/components/dashboard/user/WasteSubmissionForm';
import ReelsUploadForm from '@/components/dashboard/user/ReelsUploadForm';
import CleanlinessForm from '@/components/dashboard/user/CleanlinessForm';
import TransportProofForm from '@/components/dashboard/user/TransportProofForm';
import AirQualityMonitor from '@/components/dashboard/user/AirQualityMonitor';
import UserWallet from '@/components/dashboard/user/UserWallet';
import WasteHistory from '@/components/dashboard/user/WasteHistory';

const UserDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('waste');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Dashboard stats - in a real app, these would come from your Supabase database
  const dashboardStats = {
    totalPoints: 450,
    wasteCollected: 35,
    activeTasks: 2,
    availableCashback: 250,
  };

  return (
    <DashboardLayout title="User Dashboard">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Eco-Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Leaf className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">{dashboardStats.totalPoints}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Waste Collected (kg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">{dashboardStats.wasteCollected}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <History className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">{dashboardStats.activeTasks}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Cashback (₹)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wallet className="mr-2 h-4 w-4 text-eco-600" />
              <div className="text-2xl font-bold">₹{dashboardStats.availableCashback}</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="waste" value={activeTab} onValueChange={handleTabChange} className="mb-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <TabsTrigger value="waste" className="flex items-center">
            <Upload className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Waste Submission</span>
            <span className="md:hidden">Waste</span>
          </TabsTrigger>
          <TabsTrigger value="reels" className="flex items-center">
            <Video className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Eco Reels</span>
            <span className="md:hidden">Reels</span>
          </TabsTrigger>
          <TabsTrigger value="cleanliness" className="flex items-center">
            <Camera className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Cleanliness Drives</span>
            <span className="md:hidden">Clean</span>
          </TabsTrigger>
          <TabsTrigger value="transport" className="flex items-center">
            <Car className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Transport Proof</span>
            <span className="md:hidden">Transport</span>
          </TabsTrigger>
          <TabsTrigger value="airquality" className="flex items-center">
            <Wind className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Air Quality</span>
            <span className="md:hidden">AQI</span>
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center">
            <Wallet className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Wallet & History</span>
            <span className="md:hidden">Wallet</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="waste" className="mt-6">
          <WasteSubmissionForm />
        </TabsContent>
        
        <TabsContent value="reels" className="mt-6">
          <ReelsUploadForm />
        </TabsContent>
        
        <TabsContent value="cleanliness" className="mt-6">
          <CleanlinessForm />
        </TabsContent>
        
        <TabsContent value="transport" className="mt-6">
          <TransportProofForm />
        </TabsContent>
        
        <TabsContent value="airquality" className="mt-6">
          <AirQualityMonitor />
        </TabsContent>
        
        <TabsContent value="wallet" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UserWallet />
            <WasteHistory />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UserDashboard;
