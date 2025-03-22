
import React, { useState } from 'react';
import { Video, Upload, AlertCircle, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const ReelsUploadForm: React.FC = () => {
  const { toast } = useToast();
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (limit to 50MB for example)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a video smaller than 50MB",
          variant: "destructive",
        });
        return;
      }
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!video) {
      toast({
        title: "Video required",
        description: "Please upload a video to continue",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload delay - in a real app this would upload to Supabase Storage
      // and then process with Google Cloud Video Intelligence API
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Reel submitted for review!",
        description: "Your environmental reel has been submitted and is pending approval.",
      });

      // Reset form
      form.reset();
      setVideo(null);
      setVideoPreview(null);
    } catch (error) {
      console.error('Error uploading reel:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Environmental Reel</CardTitle>
        <CardDescription>
          Share your environmental activities and earn rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Upload short videos (15-60 seconds) showcasing environmental activities like tree planting, 
            waste segregation, or sustainable practices. Approved videos earn eco-points!
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Video Upload */}
            <div className="space-y-2">
              <FormLabel>Video Upload</FormLabel>
              {videoPreview ? (
                <div className="relative w-full">
                  <video 
                    src={videoPreview} 
                    controls 
                    className="w-full rounded-lg aspect-video object-cover" 
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setVideo(null);
                      setVideoPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <label htmlFor="video-upload" className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-eco-500">
                  <div className="flex flex-col items-center gap-2">
                    <Video className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload your environmental reel</p>
                    <p className="text-xs text-gray-400">MP4, MOV or WEBM, max 50MB, 15-60s</p>
                  </div>
                  <Input 
                    id="video-upload" 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    onChange={handleVideoChange}
                  />
                </label>
              )}
            </div>

            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title for your reel" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive title helps viewers understand your environmental activity
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your environmental activity and its impact" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Explain what you're doing in the video and how it helps the environment
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="eco-button w-full"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Uploading Reel...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Reel
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReelsUploadForm;
