
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface PortalCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  delay?: number;
}

export const PortalCard: React.FC<PortalCardProps> = ({
  icon: Icon,
  title,
  description,
  link,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5 }}
      className="eco-card p-8 flex flex-col items-center justify-center h-full"
    >
      <div className="bg-eco-100 rounded-full p-5 w-24 h-24 flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-eco-600" />
      </div>
      <h3 className="text-2xl font-display font-bold text-eco-800 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-6">{description}</p>
      <Link
        to={link}
        className="eco-button w-full flex items-center justify-center"
      >
        Login Now
      </Link>
    </motion.div>
  );
};

export default PortalCard;
