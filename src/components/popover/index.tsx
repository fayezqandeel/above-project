import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { type PopoverProps } from '../../types/components';

const Index = ({ trigger, children, open, onOpenChange }: PopoverProps): JSX.Element => {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger>
        {trigger}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="pt-4 px-4 pb-0 border-cyan-800 border-4 rounded shadow-lg bg-white grid grid-cols-1 gap-4"
        >
          {children}
          <Popover.Close />
          <Popover.Arrow className="fill-cyan-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Index;
