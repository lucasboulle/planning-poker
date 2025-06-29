import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VotingCard } from './VotingCard';
import { VoterAvatar } from './VoterAvatar';

type VotingTableProps = {
  voters: Array<{ id: string; name: string; vote: string | null }>;
  votingNumbers: string[];
  isVisible: boolean;
  backState: 'question' | 'check';
};

export const VotingTable: React.FC<VotingTableProps> = ({ voters, votingNumbers, isVisible, backState }) => {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Initialize all cards as flipped
    const initialFlippedState = voters.reduce((acc, voter) => {
      acc[voter.id] = true;  // Set to true to start flipped
      return acc;
    }, {} as { [key: string]: boolean });
    setFlippedCards(initialFlippedState);
  }, [voters]);

  const handleCardClick = (voterId: string) => {
    setFlippedCards(prev => ({ ...prev, [voterId]: !prev[voterId] }));
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="voting-table"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-4/5 h-96 mx-auto bg-green-200 rounded-full overflow-hidden"
        >
          {/* Table */}
          <div className="absolute inset-4 bg-green-300 rounded-full"></div>
          
          {/* Voter Cards */}
          {voters.map((voter, index) => {
            const angle = (index / voters.length) * 2 * Math.PI;
            const x = 47 + 30 * Math.cos(angle);
            const y = 30 + 40 * Math.sin(angle);
            
            return (
              <motion.div
                key={voter.id}
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
                  id={voter.id}
                  title={voter.vote ?? '?'}
                  isSelected={false}
                  isFlipped={flippedCards[voter.id]}
                  onClick={() => handleCardClick(voter.id)}
                  animate={false}
                  backState={backState}
                />
              </motion.div>
            );
          })}
          
          {/* Voter Avatars */}
          {voters.map((voter, index) => (
            <VoterAvatar
              key={`avatar-${voter.id}`}
              voter={voter}
              index={index}
              totalVoters={voters.length}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};