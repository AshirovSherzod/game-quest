/**
 * Game mode ids. Adding a mode: add its id here, then implement it in
 * server/src/game-engine/modes/<id>/ and client/src/modes/<id>/ and register
 * it in both registries.
 */
export const GAME_MODES = ['classic', 'crypto-hack'] as const;
export type GameModeId = (typeof GAME_MODES)[number];

export type GamePacing = 'synchronized' | 'self-paced';
