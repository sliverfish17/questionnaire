export const parseTitle = (
  title: string,
  responses: {
    [questionId: number]: {answerId: number | null; answerValue: string};
  }
) => {
  return title.replace(
    /\{(\d+)(?::(\d+):([^}]+))?\}/g,
    (_, questionId, conditionAnswerId, conditionalText) => {
      const id = parseInt(questionId, 10);
      const response = responses[id];

      if (conditionAnswerId && conditionalText) {
        const conditionId = parseInt(conditionAnswerId, 10);
        return response?.answerId === conditionId ? conditionalText : '';
      }

      return response?.answerValue || `{${questionId}}`;
    }
  );
};
