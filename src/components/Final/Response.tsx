import React from 'react';

interface ResponseProps {
  title: string;
  answer: string;
}

export const Response: React.FC<ResponseProps> = ({title, answer}) => {
  return (
    <li key={title}>
      <p className="mb-2 text-xl font-semibold">{title}</p>
      {answer && <p className="font-medium">Selected: {answer}</p>}
    </li>
  );
};
