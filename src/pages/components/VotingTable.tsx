import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VotingCard } from './VotingCard';

type VotingTableProps = {
  voters: Array<{ id: string; name: string; vote: string | null }>;
  votingNumbers: string[];
  isVisible: boolean;
};

export const VotingTable: React.FC<VotingTableProps> = ({ voters, votingNumbers, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        
          className="relative w-4/5 h-96 mx-auto bg-green-200 rounded-full overflow-hidden"
        >
          {/* Table */}
          <div className="absolute inset-4 bg-green-300 rounded-full"></div>
          
          {/* Cards */}
          {votingNumbers.map((number, index) => {
            const angle = (index / votingNumbers.length) * 2 * Math.PI;
            const x = 45 + 30 * Math.cos(angle);
            const y = 30 + 40 * Math.sin(angle);
            
            return (
              <motion.div
                key={number}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 0.45 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.05
                }}
              >
                <VotingCard
                  id={number}
                  title={number}
                  isSelected={false}
                  onClick={() => {}}
                />
              </motion.div>
            );
          })}
          
          {/* Voters */}
          {voters.map((voter, index) => {
            const angle = (index / votingNumbers.length) * 2 * Math.PI;
            const x = 50 + 25 * Math.cos(angle);
            const y = 50 + 23 * Math.sin(angle);
            
            return (
              <motion.div
                key={voter.id}
                className="absolute w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {voter.name[0]}
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};