import React, { useState } from "react";
import { motion } from "framer-motion";

type VotingCardProps = {
  id: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
  animate: boolean;
};

export const VotingCard = ({ id, title, isSelected, onClick, animate }: VotingCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onClick();
  };

  return (
    <div className="m-2 w-24 h-36 perspective">
      <motion.div
        className="w-full h-full relative transform-style-3d cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleClick}
      >
        {/* Front of the card */}
        <motion.div
          className={`absolute w-full h-full backface-hidden bg-white rounded-xl overflow-hidden shadow-lg flex items-center justify-center ${
            isSelected ? "border-4 border-blue-500" : "border border-gray-200"
          }`}
          style={{ backfaceVisibility: "hidden" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={animate ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-5xl font-bold text-gray-800">{title}</h1>
        </motion.div>

        {/* Back of the card */}
        <motion.div
          className="absolute w-full h-full backface-hidden bg-blue-500 rounded-xl overflow-hidden shadow-lg flex items-center justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        />
      </motion.div>
    </div>
  );
};