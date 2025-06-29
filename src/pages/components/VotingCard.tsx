import React, { useState } from "react";
import { motion } from "framer-motion";

type VotingCardProps = {
  id: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
  animate: boolean;
  flipOnClick?: boolean;
  backState?: 'question' | 'check';
};

export const VotingCard = ({ 
  id, 
  title, 
  isSelected, 
  onClick, 
  animate, 
  flipOnClick = false,
  backState = 'question'
}: VotingCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (flipOnClick) {
      setIsFlipped(!isFlipped);
    }
    onClick();
  };

  return (
    <div className="perspective w-20 h-28 sm:w-24 sm:h-36">
      <motion.div
        className="w-full h-full relative transform-style-3d cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleClick}
      >
        {/* Front of the card */}
        <motion.div
          className={`absolute w-full h-full backface-hidden bg-gradient-to-br from-white to-gray-100 rounded-xl overflow-hidden shadow-lg flex items-center justify-center`}
          style={{ backfaceVisibility: "hidden" }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          animate={
            isSelected
              ? { 
                  scale: animate ? [1, 1.1, 1] : 1,
                  borderColor: ["rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 1)"],
                  borderWidth: "4px",
                }
              : { 
                  scale: animate ? [1, 1.1, 1] : 1,
                  borderColor: "rgba(229, 231, 235, 1)",
                  borderWidth: "1px",
                }
          }
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 drop-shadow-md">{title}</h1>
        </motion.div>

        {/* Back of the card */}
        <motion.div
          className={`absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg flex items-center justify-center ${
            backState === 'check' ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-blue-400 to-blue-600'
          }`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center">
            {backState === 'check' ? (
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="text-4xl font-bold text-white">?</span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};