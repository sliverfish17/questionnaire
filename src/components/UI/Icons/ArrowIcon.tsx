import React from 'react';

interface ArrowIconProps {
  fill?: string;
  width?: number;
  height?: number;
}

export const ArrowIcon = ({
  fill = '#333333',
  width = 24,
  height = 24,
}: ArrowIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 12L15 4.5L16.05 5.55L9.6 12L16.05 18.45L15 19.5L7.5 12Z"
        fill={fill}
      />
    </svg>
  );
};
