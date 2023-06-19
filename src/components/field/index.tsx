import React from 'react';
import classNames from 'classnames';
import { type FieldProps } from '../../types/components';

const Index = ({ children, error, className, label, placeholder }: FieldProps): JSX.Element => {
  const inputClasses = classNames(
    'outline-0 border rounded px-4 py-2 placeholder:font-thin',
    {
      'border-red-500': error === true,
      'border-cyan-600 focus:border-cyan-900': error === false
    },
    className
  );

  const labelClasses = classNames(
    'font-thin',
    {
      'text-red-500': error === true
    }
  );

  return (
    <div className="flex flex-col gap-1 relative mb-4">
      <label className={labelClasses} htmlFor={label}>{label}</label>
      {
        React.Children.map(children, child => {
          return React.cloneElement(child as React.ReactElement, {
            className: `${inputClasses}`,
            id: label,
            placeholder: placeholder
          });
        })
      }
      {
        (Boolean(error)) && (
          <div className="absolute rounded-bl rounded-br text-sm top-full text-red-600 w-full bg-red-50 px-2">
            {error}
          </div>
        )
      }
    </div>
  );
};

export default Index;
