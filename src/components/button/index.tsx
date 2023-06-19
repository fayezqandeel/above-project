import React from 'react';
import classNames from 'classnames';
import { type ButtonProps } from '../../types/components';

const Index = (
  {
    children, type = 'button', className, block, variant, onClick, size, rounded, wide, border, link
  }: ButtonProps
): JSX.Element => {
  const buttonClasses = classNames(
    'flex p-2 flex-row gap-1 items-center justify-center',
    {
      rounded: rounded === true,
      'text-md font-thin': typeof size === 'undefined',
      'text-lg font-thin': size === 'lg',
      'text-sm font-thin': size === 'sm',
      'text-xs font-thin': size === 'xs',
      'text-gray-600 hover:bg-slate-50': typeof variant === 'undefined',
      'hover:bg-slate-50': link,
      'bg-cyan-900 hover:bg-cyan-800 text-white': variant === 'primary',
      block: block === true,
      'text-red-600': link === true && variant === 'danger',
      'text-white hover:bg-red-700 bg-red-500': typeof link === 'undefined' && variant === 'danger',
      'py-4 px-8': wide,
      'border-slate-500 border hover:bg-slate-100': border
    },
    className
  );

  if (!(link ?? false)) {
    return (
      <button type={type} onClick={onClick} className={buttonClasses}>
        {children}
      </button>
    );
  } else {
    return (
      <span onClick={onClick} className={buttonClasses}>{children}</span>
    );
  }
};

export default Index;
