import React from 'react';
import classNames from 'classnames';
import { type BadgeProps } from '../../types/components';

const Index = ({ children, className, block, variant }: BadgeProps): JSX.Element => {
  const badgeClasses = classNames(
    'px-2 rounded-lg text-sm font-thin',
    {
      block: block === true,
      'bg-red-600 text-white': typeof variant === 'string' && variant === 'danger',
      'bg-orange-200 text-orange-900': typeof variant === 'string' && variant === 'warning',
      'bg-cyan-200 text-cyan-900': typeof variant === 'string' && variant === 'info'
    },
    className
  );

  return (
    <span className={badgeClasses}>{children}</span>
  );
};

export default Index;
