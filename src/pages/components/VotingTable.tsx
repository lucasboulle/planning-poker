import React from 'react';
import { motion } from 'framer-motion';

type VotingTableProps = {
  voters: Array<{ id: string; name: string; vote: string | null }>;
  votingNumbers: string[];
};

export const VotingTable: React.FC<VotingTableProps> = ({ voters, votingNumbers }) => {
  return (
    <div className="relative w-full h-96 bg-green-200 rounded-full overflow-hidden">
      {/* Table */}
      <div className="absolute inset-4 bg-green-300 rounded-full"></div>
      
      {/* Cards */}
      {votingNumbers.map((number, index) => {
        const angle = (index / votingNumbers.length) * 2 * Math.PI;
        const x = 50 + 40 * Math.cos(angle);
        const y = 50 + 40 * Math.sin(angle);
        
        return (
          <motion.div
            key={number}
            className="absolute w-12 h-16 bg-white rounded-lg shadow-md flex items-center justify-center text-xl font-bold"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            // whileHover={{ scale: 1.1 }}
          >
            {number}
          </motion.div>
        );
      })}
      
      {/* Voters */}
      {voters.map((voter, index) => {
        const angle = (index / voters.length) * 2 * Math.PI;
        const x = 50 + 47 * Math.cos(angle);
        const y = 50 + 47 * Math.sin(angle);
        
        return (
          <motion.div
            key={voter.id}
            className="absolute w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            // whileHover={{ scale: 1.1 }}
          >
            {voter.name[0]}
          </motion.div>
        );
      })}
    </div>
  );
};