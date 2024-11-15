export const parseTitle = (
  title: string,
  responses: {[questionId: number]: {answerValue: string}}
) => {
  return title.replace(
    /\{(\d+)(?::([^:}]+))?(?::([^}]+))?\}/g,
    (_, questionId, condition, conditionalText) => {
      const id = parseInt(questionId, 10);
      const answer = responses[id]?.answerValue;

      if (condition && conditionalText) {
        return answer === condition ? conditionalText : '';
      }

      return answer || `{${questionId}}`;
    }
  );
};
