
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, Mail, KeyRound, ArrowRight, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const AdminAuth: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Authentication Required",
      description: "Please connect to Supabase for authentication functionality.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full eco-glass border-0">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-full bg-eco-100">
              <Shield className="h-6 w-6 text-eco-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-display">Admin Portal</CardTitle>
          <CardDescription>
            Sign in to manage system configuration and operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              This portal is restricted to authorized administrators only. Unauthorized access attempts will be logged and reported.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" placeholder="admin@example.com" type="email" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="securityCode">Two-Factor Code</Label>
              <Input id="securityCode" placeholder="Enter 6-digit code" />
              <p className="text-xs text-gray-500 mt-1">
                Enter the verification code from your authenticator app
              </p>
            </div>
            
            <Button type="submit" className="w-full bg-eco-600 hover:bg-eco-700">
              Secure Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminAuth;
