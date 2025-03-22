
import { Leaf } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-nature flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center eco-glass p-10 rounded-2xl max-w-md mx-auto"
      >
        <Leaf className="h-16 w-16 text-eco-600 mx-auto mb-4" />
        <h1 className="text-5xl font-display font-bold text-eco-800 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          Oops! This page seems to have gone back to nature.
        </p>
        <Button 
          className="bg-eco-600 hover:bg-eco-700"
          onClick={() => window.location.href = "/"}
        >
          Return to the Ecosystem
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
