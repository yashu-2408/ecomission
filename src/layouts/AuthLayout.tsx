
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-nature relative flex flex-col">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center px-4 py-6"
      >
        <Link 
          to="/" 
          className="flex items-center gap-2 text-eco-800 hover:text-eco-600 transition-colors eco-glass py-2 px-4 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back Home</span>
        </Link>
      </motion.div>
      
      <div className="flex-1 relative z-10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
