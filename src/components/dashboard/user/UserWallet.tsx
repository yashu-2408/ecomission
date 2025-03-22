
import React, { useState } from 'react';
import { Wallet, CreditCard, DollarSign, ArrowDownToLine, Loader } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Mock transaction data
const transactions = [
  { id: 1, type: 'Waste Collection', points: 45, date: '2023-05-12' },
  { id: 2, type: 'Public Transport', points: 12, date: '2023-05-11' },
  { id: 3, type: 'Eco Reel Approved', points: 30, date: '2023-05-09' },
  { id: 4, type: 'Cleanliness Drive', points: 100, date: '2023-05-05' },
  { id: 5, type: 'Cashback Redeemed', points: -200, date: '2023-05-01' },
];

const UserWallet: React.FC = () => {
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState<number>(100);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock user wallet data
  const wallet = {
    totalPoints: 450,
    availableCashback: 250,
    conversionRate: 0.5, // ₹0.5 per point
    pendingPoints: 75,
  };

  const handleWithdraw = async () => {
    if (withdrawAmount > wallet.availableCashback) {
      toast({
        title: "Invalid amount",
        description: "You cannot withdraw more than your available cashback.",
        variant: "destructive",
      });
      return;
    }
    
    setIsWithdrawing(true);
    
    try {
      // Simulate API call - in a real app, this would call Razorpay/UPI API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Withdrawal initiated!",
        description: `₹${withdrawAmount} will be credited to your account within 24 hours.`,
      });
      
      setDialogOpen(false);
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      toast({
        title: "Withdrawal failed",
        description: "There was an error processing your withdrawal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wallet className="mr-2 h-5 w-5" />
          Eco-Wallet
        </CardTitle>
        <CardDescription>
          Manage your eco-points and redeem cashback
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="bg-eco-50 rounded-lg p-6 mb-6 border border-eco-100">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-eco-800">{wallet.totalPoints}</h3>
            <p className="text-eco-600 font-medium">Total Eco-Points</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Available Cashback</p>
              <p className="text-xl font-bold">₹{wallet.availableCashback}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Pending Points</p>
              <p className="text-xl font-bold">{wallet.pendingPoints}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="eco-button w-full">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Withdraw Cashback
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Cashback</DialogTitle>
                  <DialogDescription>
                    Convert your eco-points to real cash. Minimum withdrawal: ₹50
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Withdrawal Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="50"
                      max={wallet.availableCashback}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      className="col-span-2 h-10"
                    />
                    <p className="text-xs text-muted-foreground">
                      Available balance: ₹{wallet.availableCashback}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="upi">UPI ID</Label>
                    <Input
                      id="upi"
                      placeholder="yourname@upi"
                      className="col-span-2 h-10"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter your UPI ID to receive the payment
                    </p>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="eco-button" 
                    onClick={handleWithdraw}
                    disabled={isWithdrawing}
                  >
                    {isWithdrawing ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ArrowDownToLine className="mr-2 h-4 w-4" />
                        Confirm Withdrawal
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <p className="text-xs text-center mt-4 text-muted-foreground">
            Conversion rate: 1 Eco-Point = ₹{wallet.conversionRate}
          </p>
        </div>
        
        <div className="mt-auto">
          <h4 className="font-medium mb-3">Recent Activities</h4>
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex justify-between items-center p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm">{transaction.type}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
                <p className={cn(
                  "font-semibold",
                  transaction.points > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {transaction.points > 0 ? '+' : ''}{transaction.points}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function since cn from utils doesn't seem to be working correctly
const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export default UserWallet;
