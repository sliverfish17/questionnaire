import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AnswerPayload {
  questionId: number;
  answerId: number;
  answerValue: string;
  nextQuestionId: number | null;
}

interface QuestionnaireState {
  currentQuestionId: number | null;
  responses: {
    [questionId: number]: {
      answerId: number;
      answerValue: string;
      nextQuestionId: number | null;
    };
  };
  firstQuestionId: number | null;
}

const initialState: QuestionnaireState = {
  firstQuestionId: null,
  currentQuestionId: null,
  responses: {},
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setFirstQuestionId: (state, action: PayloadAction<number>) => {
      state.firstQuestionId = action.payload;
    },
    answerQuestion: (state, action: PayloadAction<AnswerPayload>) => {
      const {questionId, answerId, answerValue, nextQuestionId} =
        action.payload;
      state.responses[questionId] = {answerId, answerValue, nextQuestionId};
      state.currentQuestionId = nextQuestionId;
    },
    resetQuestionnaire: state => {
      state.responses = {};
      state.currentQuestionId = state.firstQuestionId;
    },
  },
});

export const {answerQuestion, resetQuestionnaire, setFirstQuestionId} =
  questionnaireSlice.actions;

export default questionnaireSlice.reducer;
