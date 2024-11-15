import {configureStore} from '@reduxjs/toolkit';

import questionnaireReducer from '@/lib/features/questionnaire/questionnaireSlice';

export const store = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
