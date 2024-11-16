interface TestResultProps {
  title: string;
  answer: string;
}

export const TestResult = ({title, answer}: TestResultProps) => {
  return (
    <li key={title}>
      <p className="mb-2 text-xl font-semibold">{title}</p>
      {answer && <p className="font-medium">{answer}</p>}
    </li>
  );
};
