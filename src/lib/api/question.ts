import {Question} from '@/types/Question';

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const questions = await import('../../../public/questions.json').then(
      mod => mod.default as Question[]
    );
    return questions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findQuestionById = async (
  id: string | string[] | undefined
): Promise<Question | undefined> => {
  try {
    const questions = await fetchQuestions();
    if (!id) {
      return undefined;
    }
    const question = questions.find(q => q.id.toString() === id);
    return question;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
