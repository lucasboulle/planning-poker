import { useState, useEffect, useCallback } from "react";
import { tasksMock, votingNumbersMock, votersMock } from "../constants";
import { Task, TaskCard } from "./components/TaskCard";
import { VotingCard } from "./components/VotingCard";
import { VotingTable } from "./components/VotingTable";
import { P2PService } from "../services/P2PService";
import { Voter } from "../types/interfaces";

export const PlanningPoker = () => {
  const tasks: Task[] = tasksMock;
  const votingNumbers: string[] = votingNumbersMock;
  const [votingTask, setVotingTask] = useState<Task | null>(tasks[0] || null);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [voters, setVoters] = useState<Voter[]>(votersMock);
  const [showVoters, setShowVoters] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [backState, setBackState] = useState<'question' | 'check'>('question');
  const [p2pService, setP2PService] = useState<P2PService | null>(null);
  const [peerId, setPeerId] = useState<string>('');

  const handleVotersUpdate = useCallback((updatedVoters: Voter[]) => {
    setVoters(updatedVoters);
  }, []);

  useEffect(() => {
    const service = new P2PService(handleVotersUpdate);
    setP2PService(service);
    setPeerId(service.getPeerId());

    return () => {
      service.disconnect();
    };
  }, [handleVotersUpdate]);

  const handleConnect = (targetPeerId: string) => {
    console.log('🚀 ~ handleConnect ~ p2pService:', p2pService)
    p2pService?.connect(targetPeerId);
  };

  const handleTaskSelect = (task: Task) => {
    setVotingTask(task);
    setSelectedNumber(null);
    p2pService?.broadcastMessage({ type: 'resetVotes', taskId: task.id });
    setAnimateCards(true);
  };

  const handleNumberSelect = (number: string) => {
    setSelectedNumber(number);
    if (p2pService) {
      p2pService.broadcastMessage({ 
        type: 'vote', 
        taskId: votingTask?.id, 
        vote: number,
        voterId: p2pService.getPeerId() // Use the P2PService method to get the peerId
      });
    }
  };

  const toggleVoters = () => {
    setShowVoters(!showVoters);
  };

  const toggleBackState = () => {
    const newBackState = backState === 'question' ? 'check' : 'question';
    setBackState(newBackState);
    p2pService?.broadcastMessage({ type: 'toggleBackState', backState: newBackState });
  };

  useEffect(() => {
    if (animateCards) {
      const timer = setTimeout(() => setAnimateCards(false), 300);
      return () => clearTimeout(timer);
    }
  }, [animateCards]);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Planning Poker</h1>
      <div>Your Peer ID: {peerId}</div>
      <input 
        type="text" 
        placeholder="Enter peer ID to connect" 
        onChange={(e) => handleConnect(e.target.value)}
      />
      <div className="flex flex-row flex-grow">
        <div className="basis-3/4 pr-8 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {votingTask?.title || "Select a task"}
          </h2>
          <div className="flex-grow flex flex-col justify-center">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 justify-items-center content-center mb-8">
              {votingNumbers.map((number) => (
                <VotingCard
                  key={number}
                  id={number}
                  title={number}
                  isSelected={selectedNumber === number}
                  onClick={() => handleNumberSelect(number)}
                  animate={animateCards}
                  backState={backState}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={toggleVoters}
              className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {showVoters ? "Hide Voting Table" : "Show Voting Table"}
            </button>

            <button
              onClick={toggleBackState}
              className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Toggle Card Back
            </button>
          </div>

          {showVoters && (
            <VotingTable
              voters={voters}
              votingNumbers={votingNumbers}
              isVisible={showVoters}
              backState={backState}
            />
          )}
        </div>
        <div className="basis-1/4 bg-white p-6 overflow-y-auto shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Story Cards</h2>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              isSelected={votingTask?.id === task.id}
              onClick={() => handleTaskSelect(task)}
            />
          ))}
        </div>
      </div>
    </div>
  )
};