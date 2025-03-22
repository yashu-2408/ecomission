
import React, { useState } from 'react';
import { Camera, Upload, Loader, Bus, Train } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  transportType: z.enum(["metro", "bus", "train"], {
    required_error: "Please select a transport type",
  }),
  journeyDistance: z.coerce.number().min(1, "Distance must be at least 1 km"),
});

const TransportProofForm: React.FC = () => {
  const { toast } = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transportType: "metro",
      journeyDistance: 5,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!image) {
      toast({
        title: "Image required",
        description: "Please upload proof of your public transport journey",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - in a real app, this would use Google Vision API
      // to verify the transport proof and award eco-points
      await new Promise(resolve => setTimeout(resolve, 1500));

      const transportPoints = values.transportType === "metro" ? 10 : 
                             values.transportType === "train" ? 12 : 8;
      const totalPoints = Math.floor(transportPoints * (values.journeyDistance / 5));

      toast({
        title: "Transport proof verified!",
        description: `You've earned ${totalPoints} eco-points for using sustainable transport.`,
      });

      // Reset form
      form.reset();
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting transport proof:', error);
      toast({
        title: "Verification failed",
        description: "There was an error verifying your transport proof. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainable Transport Proof</CardTitle>
        <CardDescription>
          Upload proof of public transport usage to earn eco-points
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <FormLabel>Transport Proof</FormLabel>
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Transport proof" 
                    className="w-full h-auto rounded-lg object-cover max-h-60" 
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <label htmlFor="transport-proof" className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-eco-500">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-600 text-center">
                      Upload an image of your ticket, metro card, or bus pass
                    </p>
                    <p className="text-xs text-gray-400">
                      JPG, PNG, WEBP formats accepted
                    </p>
                  </div>
                  <Input 
                    id="transport-proof" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* Transport Type */}
            <FormField
              control={form.control}
              name="transportType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Transport Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
                          <RadioGroupItem value="metro" id="metro" />
                          <label htmlFor="metro" className="flex items-center cursor-pointer">
                            <Train className="h-5 w-5 mr-2 text-purple-500" />
                            <div>
                              <p className="font-medium">Metro</p>
                              <p className="text-xs text-muted-foreground">10 points per 5km</p>
                            </div>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
                          <RadioGroupItem value="bus" id="bus" />
                          <label htmlFor="bus" className="flex items-center cursor-pointer">
                            <Bus className="h-5 w-5 mr-2 text-blue-500" />
                            <div>
                              <p className="font-medium">Bus</p>
                              <p className="text-xs text-muted-foreground">8 points per 5km</p>
                            </div>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
                          <RadioGroupItem value="train" id="train" />
                          <label htmlFor="train" className="flex items-center cursor-pointer">
                            <Train className="h-5 w-5 mr-2 text-green-500" />
                            <div>
                              <p className="font-medium">Train</p>
                              <p className="text-xs text-muted-foreground">12 points per 5km</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Journey Distance */}
            <FormField
              control={form.control}
              name="journeyDistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journey Distance (km)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Estimate the total distance of your journey in kilometers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="eco-button w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Transport Proof
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TransportProofForm;
