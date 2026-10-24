import type { GameModeId } from './modes';
import type { AnswerValue, PublicQuestion } from './questions';

export interface LobbyPlayer {
  id: string;
  nickname: string;
}

export interface LeaderboardEntry {
  playerId: string;
  nickname: string;
  score: number;
}

export interface ErrorPayload {
  code: string;
  message: string;
}

/** Socket.io events sent from client to server (namespace `/game`). */
export interface ClientToServerEvents {
  'host:create': (
    payload: { sessionId: string },
    ack: (res: { pin: string } | ErrorPayload) => void,
  ) => void;
  'host:start': () => void;
  'host:next': () => void;
  'host:end': () => void;
  'player:join': (
    payload: { pin: string; nickname: string; reconnectToken?: string },
    ack: (
      res:
        | { playerId: string; reconnectToken: string; mode: GameModeId }
        | ErrorPayload,
    ) => void,
  ) => void;
  'player:answer': (payload: {
    questionId: string;
    answer: AnswerValue;
  }) => void;
  /** Mode-specific action, e.g. choosing a reward or hacking a player. */
  'player:action': (payload: { type: string; data?: unknown }) => void;
}

/** Socket.io events sent from server to client. */
export interface ServerToClientEvents {
  'lobby:update': (payload: { players: LobbyPlayer[] }) => void;
  'game:started': (payload: { mode: GameModeId }) => void;
  'question:show': (payload: PublicQuestion) => void;
  'answer:result': (payload: {
    questionId: string;
    correct: boolean;
    correctAnswer: AnswerValue | AnswerValue[];
  }) => void;
  /** Mode-specific event, e.g. "you were hacked". */
  'mode:event': (payload: { type: string; data?: unknown }) => void;
  'state:host': (payload: unknown) => void;
  'state:player': (payload: unknown) => void;
  leaderboard: (payload: { entries: LeaderboardEntry[] }) => void;
  'game:ended': (payload: { entries: LeaderboardEntry[] }) => void;
  error: (payload: ErrorPayload) => void;
}
