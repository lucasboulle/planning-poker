import React from 'react';
import { motion } from 'framer-motion';

type VoterAvatarProps = {
  voter: { id: string; name: string; vote: string | null };
  index: number;
  totalVoters: number;
};

export const VoterAvatar: React.FC<VoterAvatarProps> = ({ voter, index, totalVoters }) => {
  const angle = (index / totalVoters) * 2 * Math.PI;
  const x = 50 + 24 * Math.cos(angle);
  const y = 45 + 23 * Math.sin(angle);

  return (
    <motion.div
      key={`avatar-${voter.id}`}
      className="absolute w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.05
      }}
    >
      {voter.name[0]}
    </motion.div>
  );
};