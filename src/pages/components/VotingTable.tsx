import React from 'react';
import { motion } from 'framer-motion';
import { VotingCard } from './VotingCard';

type VotingTableProps = {
  voters: Array<{ id: string; name: string; vote: string | null }>;
  votingNumbers: string[];
};

export const VotingTable: React.FC<VotingTableProps> = ({ voters, votingNumbers }) => {
  return (
    <div className="relative w-4/5 h-96 mx-auto bg-green-200 rounded-full overflow-hidden">
      {/* Table */}
      <div className="absolute inset-4 bg-green-300 rounded-full"></div>
      
      {/* Cards */}
      {votingNumbers.map((number, index) => {
        const angle = (index / votingNumbers.length) * 2 * Math.PI;
        const x = 50 + 30 * Math.cos(angle);
        const y = 50 + 40 * Math.sin(angle);
        
        return (
          <div
            key={number}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%) scale(0.45)', // Scale down to 45%
            }}
          >
            <VotingCard
              id={number}
              title={number}
              isSelected={false}
              onClick={() => {}}
            />
          </div>
        );
      })}
      
      {/* Voters */}
      {voters.map((voter, index) => {
        const angle = (index / voters.length) * 2 * Math.PI;
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
    </div>
  );
};