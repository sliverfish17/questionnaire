import {THEME} from './Theme';

export interface AnswerPayload {
  questionId: number;
  answerId: number | null;
  answerValue: string;
  nextQuestionId: number | null;
}

export interface SetQuestionIdsPayload {
  currentQuestionId: number | null;
  previousQuestionIds: number[];
}

export interface QuestionnaireState {
  currentQuestionId: number | null;
  previousQuestionIds: number[];
  responses: {
    [questionId: number]: {
      answerId: number | null;
      answerValue: string;
      nextQuestionId: number | null;
    };
  };
  firstQuestionId: number | null;
  theme: THEME;
}
