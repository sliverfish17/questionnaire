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
  previousQuestionIds: number[];
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
  previousQuestionIds: [],
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

      if (state.currentQuestionId === null) {
        state.currentQuestionId = state.firstQuestionId;
      }

      if (state.currentQuestionId !== null) {
        state.previousQuestionIds.push(state.currentQuestionId);
      }

      state.currentQuestionId = nextQuestionId;
    },

    resetQuestionnaire: state => {
      state.responses = {};
      state.currentQuestionId = state.firstQuestionId;
      state.previousQuestionIds = [];
    },
    setCurrentAndPrevQuestionId: (
      state,
      action: PayloadAction<SetQuestionIdsPayload>
    ) => {
      const {currentQuestionId, prevQuestionId} = action.payload;

      state.currentQuestionId = currentQuestionId;

      if (prevQuestionId !== null) {
        state.previousQuestionIds.push(prevQuestionId);
      }
    },
    setBackNavigation: state => {
      const prevQuestionIds = [...state.previousQuestionIds];

      const prevQuestionId = prevQuestionIds.pop();

      if (prevQuestionId !== undefined) {
        state.currentQuestionId = prevQuestionId;
      }

      state.previousQuestionIds = prevQuestionIds;
    },
  },
});

export const {
  answerQuestion,
  resetQuestionnaire,
  setFirstQuestionId,
  setCurrentAndPrevQuestionId,
  setBackNavigation,
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
