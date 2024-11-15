import {Question} from '@/types/Question';

export const fetchQuestions = async (): Promise<Question[]> => {
  const questions = await import('../../../public/questions.json').then(
    mod => mod.default as Question[]
  );
  return questions;
};

export const findQuestionById = async (
  id: string | string[] | undefined
): Promise<Question | undefined> => {
  const questions = await fetchQuestions();
  return questions.find(q => q.id.toString() === id);
};
