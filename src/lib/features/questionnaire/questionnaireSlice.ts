import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  AnswerPayload,
  QuestionnaireState,
  SetQuestionIdsPayload,
} from '@/types/Store';
import {THEME} from '@/types/Theme';

const initialState: QuestionnaireState = {
  firstQuestionId: null,
  currentQuestionId: null,
  previousQuestionIds: [],
  responses: {},
  theme: THEME.QUESTION,
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
      if (
        state.currentQuestionId !== null &&
        !state.previousQuestionIds.includes(state.currentQuestionId)
      ) {
        state.previousQuestionIds.push(state.currentQuestionId);
      }
      state.currentQuestionId = nextQuestionId;
    },
    setTheme: (state, action: PayloadAction<THEME>) => {
      state.theme = action.payload;
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
      const {currentQuestionId, previousQuestionIds} = action.payload;
      if (state.currentQuestionId !== currentQuestionId) {
        state.currentQuestionId = currentQuestionId;
      }
      if (
        state.previousQuestionIds.length !== previousQuestionIds.length ||
        !previousQuestionIds.every(
          (id, index) => id === state.previousQuestionIds[index]
        )
      ) {
        state.previousQuestionIds = previousQuestionIds;
      }
    },
    setBackNavigation: state => {
      const prevQuestionIdList = [...state.previousQuestionIds];

      const prevQuestionId = prevQuestionIdList.pop();

      if (prevQuestionId !== undefined) {
        state.currentQuestionId = prevQuestionId;
      }

      state.previousQuestionIds = prevQuestionIdList;
    },
    resetQuiz: state => {
      state.currentQuestionId = null;
      state.previousQuestionIds = [];
      state.responses = {};
    },
  },
});

export const {
  answerQuestion,
  resetQuestionnaire,
  setFirstQuestionId,
  setCurrentAndPrevQuestionId,
  setBackNavigation,
  resetQuiz,
  setTheme,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
