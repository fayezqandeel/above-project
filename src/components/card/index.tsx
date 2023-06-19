import React from 'react';
import { type CardProps } from '../../types/components';

const Index = ({ children, footer, onClick }: CardProps): JSX.Element => {
  return (
    <div
      className={`
        rounded-tl relative rounded-tr flex flex-col
        hover:shadow hover:border-opacity-100
        cursor-pointer bg-white border shadow-sm
      border-cyan-800 border-opacity-40
      `}
    >
      <div onClick={onClick} className="p-4 flex-grow flex flex-col gap-2">
        {children}
      </div>
      {(Boolean(footer)) && <div className="border-t">{footer}</div>}
    </div>
  );
};

export default Index;
