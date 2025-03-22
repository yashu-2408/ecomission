
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import PortalCard from "../ui-components/PortalCard";
import { Users, UserRound, Shield } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-nature">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Leaf className="h-10 w-10 text-eco-600" />
            <h1 className="text-5xl md:text-6xl font-display font-bold text-eco-800">
              EcoSystem
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto eco-glass px-6 py-3 rounded-full"
          >
            Sustainable Management System - Powering a greener future through efficient resource management
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          <PortalCard
            icon={UserRound}
            title="User Portal"
            description="Access your eco-friendly dashboard and track your sustainability metrics."
            link="/auth/user"
            delay={1}
          />
          
          <PortalCard
            icon={Users}
            title="Staff Portal"
            description="Manage resources and monitor environmental impact metrics."
            link="/auth/staff"
            delay={2}
          />
          
          <PortalCard
            icon={Shield}
            title="Admin Portal"
            description="Configure system-wide sustainability policies and analyze impact data."
            link="/auth/admin"
            delay={3}
          />
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center text-white/80 backdrop-blur-sm py-2"
      >
        <p className="text-sm">© 2023 EcoSystem. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
