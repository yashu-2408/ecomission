
import React, { useState, useEffect } from 'react';
import { Wind, MapPin, Loader, AlertTriangle, Leaf } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Simulated AQI data with recommendations
interface AQIData {
  aqi: number;
  level: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  color: string;
  recommendations: string[];
  ecoActions: string[];
  location: string;
}

// Mock API call function - in a real app, this would call Google Maps API
const fetchAQIData = async (latitude: number, longitude: number): Promise<AQIData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Random AQI between 20 and 250
  const aqi = Math.floor(Math.random() * 230) + 20;
  
  let level: AQIData['level'];
  let color: string;
  let recommendations: string[];
  let ecoActions: string[];
  
  if (aqi <= 50) {
    level = 'Good';
    color = 'bg-green-500';
    recommendations = ['Air quality is good', 'Enjoy outdoor activities'];
    ecoActions = ['Plant trees in your neighborhood', 'Organize a cleanup drive'];
  } else if (aqi <= 100) {
    level = 'Moderate';
    color = 'bg-yellow-500';
    recommendations = ['Sensitive individuals should limit prolonged outdoor exertion'];
    ecoActions = ['Use public transport today', 'Start a community garden'];
  } else if (aqi <= 150) {
    level = 'Unhealthy for Sensitive Groups';
    color = 'bg-orange-500';
    recommendations = ['People with respiratory issues should limit outdoor exposure'];
    ecoActions = ['Carpool to reduce emissions', 'Organize a tree planting event'];
  } else if (aqi <= 200) {
    level = 'Unhealthy';
    color = 'bg-red-500';
    recommendations = ['Everyone should limit outdoor activities', 'Wear a mask if going outside'];
    ecoActions = ['Use public transport instead of personal vehicles', 'Start a petition for clean air policies'];
  } else if (aqi <= 300) {
    level = 'Very Unhealthy';
    color = 'bg-purple-700';
    recommendations = ['Avoid outdoor activities', 'Keep windows closed'];
    ecoActions = ['Report industrial pollution', 'Participate in awareness campaigns'];
  } else {
    level = 'Hazardous';
    color = 'bg-red-900';
    recommendations = ['Stay indoors', 'Use air purifiers if available'];
    ecoActions = ['Report to environmental authorities', 'Organize community response'];
  }
  
  return {
    aqi,
    level,
    color,
    recommendations,
    ecoActions,
    location: 'Your Location'
  };
};

const AirQualityMonitor: React.FC = () => {
  const { toast } = useToast();
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAirQuality = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, we would get user's location using browser's geolocation API
      const position = {
        coords: {
          latitude: 28.6139, // Example coordinates (Delhi)
          longitude: 77.2090
        }
      };
      
      const data = await fetchAQIData(position.coords.latitude, position.coords.longitude);
      setAqiData(data);
      
      // Geolocation success message
      toast({
        title: "Location detected",
        description: "Showing air quality for your current location.",
      });
    } catch (err) {
      console.error('Error fetching air quality:', err);
      setError('Could not fetch air quality data. Please try again.');
      
      toast({
        title: "Error",
        description: "Could not get air quality data. Please check your location settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Optional: Auto-fetch AQI data on component mount
  useEffect(() => {
    getAirQuality();
  }, []);

  // Helper function to determine progress color
  const getProgressColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-700';
    return 'bg-red-900';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wind className="mr-2 h-5 w-5" />
          Air Quality Monitor
        </CardTitle>
        <CardDescription>
          Check real-time air quality in your area and find eco-friendly actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-10 w-10 animate-spin text-eco-600" />
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={getAirQuality}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {aqiData && !loading && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {aqiData.location}
                </p>
                <h3 className="text-2xl font-bold mt-1">AQI: {aqiData.aqi}</h3>
                <p className={cn(
                  "inline-block px-2 py-1 rounded text-white text-sm mt-2",
                  getProgressColor(aqiData.aqi)
                )}>
                  {aqiData.level}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={getAirQuality}
              >
                <Wind className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Air Quality Index</p>
              <Progress 
                value={(aqiData.aqi / 500) * 100} 
                className="h-3" 
                indicatorClassName={getProgressColor(aqiData.aqi)} 
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>Good</span>
                <span>Moderate</span>
                <span>Unhealthy</span>
                <span>500</span>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <p className="font-medium mb-2">Health Recommendations</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {aqiData.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="bg-eco-50 rounded-lg p-4 border border-eco-100">
              <p className="font-medium mb-2 flex items-center text-eco-800">
                <Leaf className="h-4 w-4 mr-2 text-eco-600" />
                Eco-Friendly Actions
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 text-eco-700">
                {aqiData.ecoActions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
              <Button className="eco-button mt-4 w-full">
                Take Action & Earn Points
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AirQualityMonitor;
