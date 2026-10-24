export const QUESTION_TYPES = [
  'MULTIPLE_CHOICE',
  'CODE_OUTPUT',
  'TRUE_FALSE',
  'TEXT_INPUT',
] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export const CODE_LANGUAGES = [
  'html',
  'css',
  'javascript',
  'typescript',
  'python',
  'sql',
] as const;
export type CodeLanguage = (typeof CODE_LANGUAGES)[number];

/** Question as sent to players: never contains the correct answer. */
export interface PublicQuestion {
  id: string;
  index: number;
  total: number;
  type: QuestionType;
  prompt: string;
  code?: string;
  codeLanguage?: CodeLanguage;
  /** Empty for TEXT_INPUT. */
  options: string[];
  timeLimitSec: number;
}

/** Option index for choice questions, free text for TEXT_INPUT. */
export type AnswerValue = number | string;
