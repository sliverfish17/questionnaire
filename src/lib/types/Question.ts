export interface Answer {
  id: number;
  text: string;
  nextQuestionId: number | null;
}

export interface Question {
  id: number;
  screenType: 'question' | 'info';
  title: string;
  answers?: Answer[];
  content?: string;
  nextQuestionId: number | null;
  previousQuestionId: number | null;
}

export interface QuestionPageProps {
  question: Question;
}
