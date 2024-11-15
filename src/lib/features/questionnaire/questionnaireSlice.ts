import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AnswerPayload {
  questionId: number;
  answerId: number | null;
  answerValue: string;
  nextQuestionId: number | null;
}

interface SetQuestionIdsPayload {
  currentQuestionId: number | null;
  prevQuestionId: number | null;
}

interface QuestionnaireState {
  currentQuestionId: number | null;
  prevQuestionId: number | null;
  responses: {
    [questionId: number]: {
      answerId: number | null;
      answerValue: string;
      nextQuestionId: number | null;
    };
  };
  firstQuestionId: number | null;
}

const initialState: QuestionnaireState = {
  firstQuestionId: null,
  currentQuestionId: null,
  prevQuestionId: null,
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

      state.responses[questionId] = {
        answerId,
        answerValue,
        nextQuestionId,
      };

      state.prevQuestionId = questionId;
      state.currentQuestionId = nextQuestionId;
    },
    resetQuestionnaire: state => {
      state.responses = {};
      state.currentQuestionId = state.firstQuestionId;
      state.prevQuestionId = null;
    },
    setCurrentAndPrevQuestionId: (
      state,
      action: PayloadAction<SetQuestionIdsPayload>
    ) => {
      state.currentQuestionId = action.payload.currentQuestionId;
      state.prevQuestionId = action.payload.prevQuestionId;
    },
  },
});

export const {
  answerQuestion,
  resetQuestionnaire,
  setFirstQuestionId,
  setCurrentAndPrevQuestionId,
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
