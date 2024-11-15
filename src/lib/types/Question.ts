export interface Answer {
  id: number;
  text: string;
  nextQuestionId: number | null;
}

export const enum SCREEN_TYPE {
  'QUESTION' = 'question',
  'INFO' = 'info',
}

export interface Question {
  id: number;
  infoPageId?: number;
  screenType: SCREEN_TYPE;
  title: string;
  description?: string;
  answers?: Answer[];
  content?: string;
  referenceId?: number;
  nextQuestionId: number | null;
  previousQuestionId: number | null;
}

export interface QuestionPageProps {
  question: Question;
}
