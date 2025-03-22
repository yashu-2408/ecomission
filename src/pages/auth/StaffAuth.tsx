
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Mail, KeyRound, ArrowRight, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const StaffAuth: React.FC = () => {
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
              <Users className="h-6 w-6 text-eco-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-display">Staff Portal</CardTitle>
          <CardDescription>
            Sign in to manage waste collection operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Apply</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" placeholder="name@example.com" type="email" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-eco-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" className="pl-10" />
                  </div>
                </div>
                
                <div className="bg-eco-50 border border-eco-100 p-3 rounded-lg flex items-start gap-2">
                  <Info className="h-5 w-5 text-eco-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-eco-800">
                    Staff accounts require admin approval. Contact system administrators if you experience any issues.
                  </p>
                </div>
                
                <Button type="submit" className="w-full bg-eco-600 hover:bg-eco-700">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">First name</Label>
                    <Input id="firstname" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Last name</Label>
                    <Input id="lastname" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" placeholder="name@example.com" type="email" className="pl-10" />
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
                  <Label htmlFor="reason">Why do you want to join?</Label>
                  <textarea 
                    id="reason" 
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Tell us why you want to join our waste collection team"
                  />
                </div>
                
                <div className="bg-eco-50 border border-eco-100 p-3 rounded-lg flex items-start gap-2">
                  <Info className="h-5 w-5 text-eco-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-eco-800">
                    Staff applications are reviewed by administrators. You'll receive an email when your application is processed.
                  </p>
                </div>
                
                <Button type="submit" className="w-full bg-eco-600 hover:bg-eco-700">
                  Submit Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StaffAuth;
