import { motion } from "framer-motion";

type VotingCardProps = {
  id: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
  animate: boolean;
};

export const VotingCard = ({ id, title, isSelected, onClick, animate }: VotingCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={animate ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`m-2 w-24 h-36 bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-colors duration-300 ${
        isSelected ? "border-4 border-blue-500" : "border border-gray-200"
      } flex items-center justify-center`}
    >
      <h1 className="text-5xl font-bold text-gray-800">{title}</h1>
    </motion.div>
  );
};