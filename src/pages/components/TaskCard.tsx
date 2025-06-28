import { motion } from "framer-motion";

export type Task = {
  id: string;
  title: string;
  description: string;
};

type TaskCardProps = Task & {
  isSelected: boolean;
  onClick: () => void;
};

export const TaskCard = ({ id, title, description, isSelected, onClick }: TaskCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`mb-4 bg-white rounded-xl overflow-hidden shadow-md p-4 cursor-pointer transition-all duration-300 ${
        isSelected ? "border-4 border-blue-500" : "border border-gray-200"
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
};
