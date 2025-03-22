
import React, { useState } from 'react';
import { Camera, Upload, Loader, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  location: z.string().min(5, "Location must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.date({
    required_error: "Please select a date",
  }),
  participants: z.coerce.number().min(1, "Need at least 1 participant"),
});

const CleanlinessForm: React.FC = () => {
  const { toast } = useToast();
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [beforeImagePreview, setBeforeImagePreview] = useState<string | null>(null);
  const [afterImagePreview, setAfterImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      description: "",
      participants: 1,
      date: new Date(),
    },
  });

  const handleBeforeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBeforeImage(file);
      setBeforeImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAfterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAfterImage(file);
      setAfterImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!beforeImage || !afterImage) {
      toast({
        title: "Images required",
        description: "Please upload both before and after images",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - in a real app, this would upload to Supabase
      // and then submit to admin for verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Cleanliness drive submitted!",
        description: "Your submission is pending admin approval. You'll earn eco-points once approved.",
      });

      // Reset form
      form.reset();
      setBeforeImage(null);
      setAfterImage(null);
      setBeforeImagePreview(null);
      setAfterImagePreview(null);
    } catch (error) {
      console.error('Error submitting cleanliness drive:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your cleanliness drive. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cleanliness Drive Submission</CardTitle>
        <CardDescription>
          Submit your cleanliness drive details with before & after images
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Image */}
              <div className="space-y-2">
                <FormLabel>Before Image</FormLabel>
                {beforeImagePreview ? (
                  <div className="relative">
                    <img 
                      src={beforeImagePreview} 
                      alt="Before cleanup" 
                      className="w-full h-40 rounded-lg object-cover" 
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setBeforeImage(null);
                        setBeforeImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="before-image" className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-eco-500 h-40">
                    <div className="flex flex-col items-center gap-2">
                      <Camera className="h-8 w-8 text-gray-400" />
                      <p className="text-xs text-gray-600 text-center">Upload "Before" image</p>
                    </div>
                    <Input 
                      id="before-image" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleBeforeImageChange}
                    />
                  </label>
                )}
              </div>

              {/* After Image */}
              <div className="space-y-2">
                <FormLabel>After Image</FormLabel>
                {afterImagePreview ? (
                  <div className="relative">
                    <img 
                      src={afterImagePreview} 
                      alt="After cleanup" 
                      className="w-full h-40 rounded-lg object-cover" 
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAfterImage(null);
                        setAfterImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="after-image" className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-eco-500 h-40">
                    <div className="flex flex-col items-center gap-2">
                      <Camera className="h-8 w-8 text-gray-400" />
                      <p className="text-xs text-gray-600 text-center">Upload "After" image</p>
                    </div>
                    <Input 
                      id="after-image" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleAfterImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the cleanup location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Picker */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    When did the cleanliness drive take place?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Participants */}
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Participants</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormDescription>
                    How many people participated in the cleanup?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the cleanliness drive, what was cleaned, and its environmental impact"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
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
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Cleanliness Drive
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CleanlinessForm;
