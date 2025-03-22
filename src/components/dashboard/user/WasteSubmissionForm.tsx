
import React, { useState } from 'react';
import { Camera, Upload, Check, Loader, MapPin } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { wasteCategories, WasteCategory } from '@/lib/wasteUtils';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  wasteType: z.string(),
  quantity: z.coerce.number().min(0.1, { message: "Quantity must be at least 0.1 kg" }),
  location: z.string().min(5, { message: "Please provide a valid pickup location" }),
  description: z.string().optional(),
});

const WasteSubmissionForm: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wasteType: "",
      quantity: 1,
      location: "",
      description: "",
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
        description: "Please upload an image of your waste.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit waste collection requests.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // First upload the image to Supabase Storage
      const fileExt = image.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload image to waste_images bucket
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from('waste_images')
        .upload(filePath, image);

      if (storageError) {
        throw new Error(storageError.message);
      }

      // Get public URL for the uploaded image
      const { data: publicUrlData } = supabase
        .storage
        .from('waste_images')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      // Calculate points based on waste type and quantity
      const selectedCategory = wasteCategories.find(cat => cat.id === values.wasteType);
      const points = selectedCategory ? Math.round(selectedCategory.points * values.quantity) : 0;

      // Insert waste submission to database
      const { data: submissionData, error: submissionError } = await supabase
        .from('waste_submissions')
        .insert({
          user_id: user.id,
          waste_type: values.wasteType,
          quantity: values.quantity,
          location: values.location,
          description: values.description || '',
          image_url: imageUrl,
          points: points,
          status: 'pending'
        })
        .select();

      if (submissionError) {
        throw new Error(submissionError.message);
      }

      // Success notification
      toast({
        title: "Waste collection request submitted!",
        description: `You've earned ${points} eco-points. A staff member will contact you soon for pickup.`,
      });

      // Reset form
      form.reset();
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting waste:', error);
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Waste for Collection</CardTitle>
        <CardDescription>
          Upload a photo of your recyclable waste and provide details for collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Image Upload Section */}
              <div className="grid w-full items-center gap-1.5">
                <FormLabel>Waste Image</FormLabel>
                <div className="flex flex-col items-center justify-center gap-4">
                  {imagePreview ? (
                    <div className="relative w-full max-w-md">
                      <img 
                        src={imagePreview} 
                        alt="Waste preview" 
                        className="w-full h-auto rounded-lg object-cover aspect-video" 
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
                    <label 
                      htmlFor="waste-image" 
                      className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-eco-500"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Camera className="h-10 w-10 text-gray-400" />
                        <p className="text-sm text-gray-600 text-center">
                          Click to upload an image of your waste
                        </p>
                        <p className="text-xs text-gray-400">
                          Supported formats: JPG, PNG, WEBP
                        </p>
                      </div>
                      <Input 
                        id="waste-image" 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Waste Type Selection */}
              <FormField
                control={form.control}
                name="wasteType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waste Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select waste type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {wasteCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                              <span>{category.name}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                ({category.points} points/kg)
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The type of waste determines the eco-points you'll earn
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity Input */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" min="0.1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Estimate the weight of your waste in kilograms
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pickup Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input placeholder="Enter your address for pickup" {...field} />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(
                                (position) => {
                                  const loc = `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)}`;
                                  field.onChange(loc);
                                  toast({
                                    title: "Location detected",
                                    description: "Your current location will be used for pickup."
                                  });
                                },
                                () => {
                                  toast({
                                    title: "Location detection failed",
                                    description: "Please enter your address manually.",
                                    variant: "destructive"
                                  });
                                }
                              );
                            }
                          }}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Current
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Where should our staff collect your waste?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Additional Notes */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional details about your waste or pickup instructions"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="eco-button w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Waste Collection Request
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WasteSubmissionForm;
