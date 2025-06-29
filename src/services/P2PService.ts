import Peer, { DataConnection } from 'peerjs';
import { Voter } from "../types/interfaces";

export class P2PService {
  private peer: Peer;
  private connections: { [id: string]: DataConnection } = {};
  private onVotersUpdate: (voters: Voter[]) => void;
  private voters: Voter[] = [];

  constructor(onVotersUpdate: (voters: Voter[]) => void) {
    this.onVotersUpdate = onVotersUpdate;
    this.peer = new Peer({
      debug: 3, // Set debug level to get more detailed logs
    });

    this.peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      // Initialize the voters array with the current user
      this.voters = [{ id, name: 'You', vote: null }];
      this.onVotersUpdate(this.voters);
    });

    this.peer.on('connection', (conn) => {
      this.handleConnection(conn);
    });

    this.peer.on('error', (err) => {
      console.error('PeerJS error:', err);
      // You might want to add some error handling logic here
    });
  }

  connect(peerId: string) {
    if (!this.connections[peerId]) {
      console.log(`Attempting to connect to peer: ${peerId}`);
      const conn = this.peer.connect(peerId);
      conn.on('open', () => {
        console.log(`Connection to ${peerId} opened successfully`);
        this.handleConnection(conn);
        // Send current user information to the new peer
        conn.send({ type: 'votersUpdate', voters: [this.voters[0]] });
      });
      conn.on('error', (err) => {
        console.error(`Error connecting to ${peerId}:`, err);
      });
    } else {
      console.log(`Already connected to peer: ${peerId}`);
    }
  }

  private handleConnection(conn: DataConnection) {
    this.connections[conn.peer] = conn;

    conn.on('data', (data) => {
      console.log(`Received data from ${conn.peer}:`, data);
      this.handleMessage(data);
    });

    conn.on('open', () => {
      // Send current voters state to the new peer
      conn.send({ type: 'votersUpdate', voters: this.voters });
    });

    conn.on('close', () => {
      console.log(`Connection to ${conn.peer} closed`);
      delete this.connections[conn.peer];
      // Remove the disconnected voter
      this.voters = this.voters.filter(v => v.id !== conn.peer);
      this.onVotersUpdate(this.voters);
    });
  }

  broadcastMessage(message: any) {
    console.log('Broadcasting message:', message);
    Object.values(this.connections).forEach((conn) => {
      conn.send(message);
    });
  }

  private handleMessage(message: any) {
    console.log('Handling message:', message);
    
    if (!message || typeof message !== 'object') {
      console.error('Invalid message received');
      return;
    }

    switch (message.type) {
      case 'vote':
        if (message.voterId && message.vote) {
          let voterExists = false;
          const updatedVoters = this.voters.map(voter => {
            if (voter.id === message.voterId) {
              voterExists = true;
              return { ...voter, vote: message.vote };
            }
            return voter;
          });
          
          if (!voterExists) {
            updatedVoters.push({ id: message.voterId, name: `Voter ${this.voters.length + 1}`, vote: message.vote });
          }
          
          this.voters = updatedVoters;
          this.onVotersUpdate(updatedVoters);
        } else {
          console.error('Invalid vote message:', message);
        }
        break;

      case 'resetVotes':
        if (message.taskId) {
          console.log('Resetting votes for task:', message.taskId);
          // Implement reset votes logic here
          // For example: this.onVotersUpdate(this.resetVotes(message.taskId));
        } else {
          console.error('Invalid resetVotes message:', message);
        }
        break;

      case 'toggleBackState':
        if (message.backState) {
          console.log('Toggling back state to:', message.backState);
          // Implement toggle back state logic here
          // For example: this.onVotersUpdate(this.toggleBackState(message.backState));
        } else {
          console.error('Invalid toggleBackState message:', message);
        }
        break;

      case 'votersUpdate':
        if (Array.isArray(message.voters)) {
          console.log('Updating voters:', message.voters);
          // Merge the received voters with the existing ones
          const mergedVoters = [...this.voters];
          message.voters.forEach((newVoter: Voter) => {
            if (!mergedVoters.some(v => v.id === newVoter.id)) {
              mergedVoters.push(newVoter);
            }
          });
          this.voters = mergedVoters;
          this.onVotersUpdate(mergedVoters);
        } else {
          console.error('Invalid votersUpdate message:', message);
        }
        break;

      default:
        console.warn('Unknown message type:', message.type);
    }
  }

  disconnect() {
    Object.values(this.connections).forEach((conn) => conn.close());
    this.peer.destroy();
  }

  getPeerId(): string {
    return this.peer.id;
  }
}